require('@nomiclabs/hardhat-waffle')

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: 'matic_testnet',
  networks: {
    matic_testnet: {
      url: 'https://rpc-mumbai.maticvigil.com',
      accounts: [
        `ef4ccaa9a703ab1e4185e4add3497429fa83670484d1aaae934a279480f93729`
      ],
      gasPrice: 8000000000
    }
    // matic: {
    //   url: 'https://speedy-nodes-nyc.moralis.io/<YOUR_ID>/polygon/mainnet',
    //   accounts: [PRIVATE_KEY],
    //   gasPrice: 8000000000
    // }
  },
  solidity: '0.8.10',
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts'
  }
}
