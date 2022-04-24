const { expect } = require("chai");

describe("ZKT contract", function () {
  it("Deployment should initialize ERC20 token", async function () {
    const [owner] = await ethers.getSigners();

    const ZKT = await ethers.getContractFactory("Token");

    const hardhatZKT = await ZKT.deploy();

    const ownerBalance = await hardhatZKT.balanceOf(owner.address);
    expect(await hardhatZKT.totalSupply()).to.equal(ownerBalance);
  });
});
