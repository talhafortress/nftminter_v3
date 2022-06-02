import fs from 'fs'

const CONTRACT_ADDRESS = "0x6357F239bF339E9390c8Dd34Eced75BE7B5D4aAc"; //"0xBC168b4955F2626C71a04E428903b38652496811"
const ALLOWEDLIST = ["0x747222F2688c3A7F0DDd975431759539caa4b3FF","0x747222F2688c3A7F0DDd975431759539caa4b3FF","0x747222F2688c3A7F0DDd975431759539caa4b3FF","0x747222F2688c3A7F0DDd975431759539caa4b3FF","0x747222F2688c3A7F0DDd975431759539caa4b3FF"];
async function callexample() {

  const ExampleNFT = await ethers.getContractFactory("BitcoinBrothers");  
  const [owner] = await ethers.getSigners();
  var sonuc = await ExampleNFT.attach(CONTRACT_ADDRESS).mintAllowList(6);
  console.log(sonuc);



  //const ExampleNFT = await ethers.getContractFactory("BitcoinBrothers");  
  //const [owner] = await ethers.getSigners();
  //var sonuc = await ExampleNFT.attach(CONTRACT_ADDRESS).setAllowListActive(true);
  //console.log(sonuc);
}

callexample()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });