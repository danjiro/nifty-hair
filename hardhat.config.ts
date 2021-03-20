import { HardhatUserConfig } from "hardhat/types";
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-etherscan';
import 'hardhat-watcher';
import "hardhat-typechain";
import "@nomiclabs/hardhat-waffle";

import { config as dotEnvConfig } from 'dotenv';

dotEnvConfig();

const config: HardhatUserConfig = {
  solidity: "0.7.3",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.ROPSTEN_PRIVATE_KEY || '']
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  watcher: {
    test: {
      tasks: [{ command: 'test', params: { testFiles: ['{path}'] } }],
      files: ['./test/**/*'],
      verbose: true,
    },
  },
};

module.exports = config;
