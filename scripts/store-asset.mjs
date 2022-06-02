import { NFTStorage, File } from "nft.storage"
import fs from 'fs'
import dotenv from 'dotenv'
const { SELLER_FEE_ADRESS } = process.env;
dotenv.config()

const API_KEY = process.env.NFT_STORAGE_API_KEY

async function storeAsset() {
  // directory path
  const dir = './resimler/';
  var obj = [];
  const storeData = (data, path) => {
    try {
      fs.writeFileSync(path, JSON.stringify(data))
    } catch (err) {
      console.error(err)
    }
  }
  const loadData = (path) => {
    try {
      return fs.readFileSync(path, 'utf8')
    } catch (err) {
      console.error(err)
      return false
    }
  }
  const client = new NFTStorage({ token: API_KEY });
  const files = fs.readdirSync(dir);
  var data = loadData("metadatas.json");
  let mydata = JSON.parse(data);
  let tempList =[];
  storeData(tempList, "myurls.json");
    for (var i in files) {
      var dosyaAdi = parseInt(files[i].replace(".png",""))-1;
      console.log(files[i]);
      const metadata = await client.store({
        "asset_contract": "0xB84273a0166d71B95aa2e2a87DAC2bA3AE096298",
        "name": mydata[dosyaAdi].name,
        "description": mydata[dosyaAdi].description,
        "dna": mydata[dosyaAdi].dna,
        "edition": mydata[dosyaAdi].edition,
        "date": mydata[dosyaAdi].date,
        "creator": "Bitcoin Brothers",
        "attributes": mydata[dosyaAdi].attributes,
        "seller_fee_basic_points": 250,
        "fee_recipient": SELLER_FEE_ADRESS,
        "external_url": "https://app.gitbook.com/s/zF7Q33Z3UomBLRyTlDNM/plebbit/white-paper-v0.2.0",
        "image": new File(
          [await fs.promises.readFile('resimler/' + files[i])],
          files[i],
          { type: 'image/png' }
        ),
      });
      var myStoreddata = loadData("myurls.json");
      let myStoredList = JSON.parse(myStoreddata);
      myStoredList.push(metadata.url);
      console.log("Metadata stored on Filecoin and IPFS with URL:", metadata.url);
      storeData(myStoredList, "myurls.json");
      var path = "resimler/"+files[i];
      fs.unlinkSync(path);
    }
 
}
storeAsset()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });