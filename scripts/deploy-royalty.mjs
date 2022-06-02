async function deployContract() {
    const ExampleNFT = await ethers.getContractFactory("BCBRoyalty")
    const exampleNFT = await ExampleNFT.deploy(250, "0xB84273a0166d71B95aa2e2a87DAC2bA3AE096298")
    await exampleNFT.deployed()
    // This solves the bug in Mumbai network where the contract address is not the real one
    const txHash = exampleNFT.deployTransaction.hash
    const txReceipt = await ethers.provider.waitForTransaction(txHash)
    const contractAddress = txReceipt.contractAddress
    console.log("Contract deployed to address:", contractAddress)
}

deployContract()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });