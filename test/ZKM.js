const { expect } = require('chai')

describe('ZKM contract', function () {
  it('Deployment should initialize ERC20 token', async function () {
    const [owner] = await ethers.getSigners()

    const ZKM = await ethers.getContractFactory('ZkMaiaPolygon')

    const hardhatZKM = await ZKM.deploy()

    const ownerBalance = await hardhatZKM.balanceOf(owner.address)
    expect(await hardhatZKM.totalSupply()).to.equal(ownerBalance)
  })
})
