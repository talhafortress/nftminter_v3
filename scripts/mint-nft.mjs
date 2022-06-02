import fs from 'fs'

const CONTRACT_ADDRESS = "0x6357F239bF339E9390c8Dd34Eced75BE7B5D4aAc"
const META_DATA_URL = "ipfs://bafyreihft73faj24whsp3skudwbwl6h5gxgg4yp3g36du4e4a3cv4x4osq/metadata.json"

async function mintNFT(contractAddress, metaDataURL) {
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
  var data = loadData("myurls.json");
  let mydata = JSON.parse(data);


  const ExampleNFT = await ethers.getContractFactory("BitcoinBrothers")
  const [owner] = await ethers.getSigners();
  for (var i in mydata) {
    var val = mydata[i];
    if(val!= null){
      await ExampleNFT.attach(contractAddress).mintNFT(owner.address, val);
      console.log(i + ". NFT minted to: ", owner.address);
      delete mydata[i];
      storeData(mydata,"myurls.json");
    }
  }
  

}

mintNFT(CONTRACT_ADDRESS, META_DATA_URL)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });