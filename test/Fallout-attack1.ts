import chai from "chai";
import { ethers, ethereum } from "@nomiclabs/buidler";
import { utils, Wallet } from "ethers";
import { solidity } from "ethereum-waffle";
import { TransactionRequest } from "ethers/providers";
const verbose = process.env.VERBOSE;

chai.use(solidity);
const { expect } = chai;

describe("Fallout attack1", () => {
    const toWei = utils.parseEther;
    const toEth = utils.formatEther;
    let hDCFallout: any;
    let admin: string;
    let adminWallet: Wallet;

    before(async () => {
        // 1
        const [adminSigner] = await ethers.getSigners();

        admin = await adminSigner.getAddress();

        adminWallet = <Wallet>adminSigner;

        // 2
        const hCFFallout = await ethers.getContractFactory('Fallout');
        hDCFallout = await hCFFallout.deploy();
        await hDCFallout.deployed();
        console.log("Fallout :: Deployed contract address :: " + hDCFallout.address);
        expect(hDCFallout.address).to.properAddress;

        // console.log( adminSigner );
        console.log("Fallout :: Admin address :: " + admin);
        console.log("Fallout :: Owner :: " + await hDCFallout.owner() );

        console.log("Fallout :: Deployment Done !!!");

        // 3
        // RK_TODO :: TypeError: adminWallet.sign is not a function
        // const allocBal: TransactionRequest = { to: hDCFallout.address , value: toWei('10') };
        // await adminWallet.sign( allocBal );
        // await adminSigner.sendTransaction( allocBal );
        const walletBal = await adminWallet.getBalance();
        console.log("Fallout :: Wallet Balance :: " +  toEth( walletBal ));

        await hDCFallout.allocate( {value:10} );
        const adminBalance = await hDCFallout.allocatorBalance( admin );
        console.log("Fallout :: Admin deposit banance :: " + adminBalance);
        expect(adminBalance).to.eq( 10 );

    });

    it("Fallout TC1",async () => {

        // 1
        const [,user1Signer] = await ethers.getSigners();
        let user1 = await user1Signer.getAddress();
        console.log("Fallout :: User1 address :: " + user1);

        const user1initbal = await hDCFallout.allocatorBalance( user1 );
        expect(user1initbal).to.eq( 0 );

        hDCFallout.connect( user1 );

        // await hDCFallout.allocate( { from:user1, value:10 } );
        // const user1s2bal = await hDCFallout.allocatorBalance( user1 );
        // expect(user1s2bal).to.eq( 0 );

        // await hDCFallout.Fal1out({from:user1, value:15});
        // await hDCFallout.Fal1out( {from:user1} );
        // expect(user1initbal).to.eq( 15 );

    });

});
