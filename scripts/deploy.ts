import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  const NiftyHair = await ethers.getContractFactory('NiftyHair');

  console.log('Deploying Token contract');

  // Start deployment, returning a promise that resolves to a contract object
  const niftyHair = await NiftyHair.deploy();

  console.log('Contract deployed to address:', niftyHair.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
