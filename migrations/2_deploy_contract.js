const fs = require("fs");
const path = require("path");

const NFT = artifacts.require("ThirdYou");

module.exports = async function (deployer) {
  const filePath = path.join(__dirname, "config.js"); //TODO __dirname
  console.log(filePath);

  await deployer.deploy(NFT);
  const nft = await NFT.deployed();
  let config = `nftaddress = ` + `${nft.address}`;
  let data = JSON.stringify(config);
  fs.writeFile(filePath, data, (err) => {
    if (err) throw err;
    console.log("The file has been created!");
  });
};
