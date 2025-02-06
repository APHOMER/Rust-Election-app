import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair, PublicKey} from '@solana/web3.js'
import {Votingdapp} from '../target/types/votingdapp'

import { BankrunProvider, startAnchor } from "anchor-bankrun";


const IDL = require('../target/idl/votingdapp.json');

// const votingAddress = new PublicKey("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");  // AyD5wnZEk5po81hTJBG8LxVRHb7GdewWUVhVHv24dm3 
const votingAddress = new PublicKey("AyD5wnZEk5po81hTJBG8LxVRHb7GdewWUVhVHv24dm3"); 
// solana airdrop 1 J4W1aqDZkrzoyCPtE6tUyqEEDdTFg6fQnjgy77k1CeSA


describe('votingdapp', () => {

  let context;
  let provider;
  
  anchor.setProvider(anchor.AnchorProvider.env());
  
  let votingProgram = anchor.workspace.Voting as Program<Votingdapp>;

  beforeAll(async () => {
    // context = await startAnchor("", [{name: "voting", programId: votingAddress}], []);
	  // provider = new BankrunProvider(context);

    // const votingProgram = new Program<Votingdapp>(
    //   IDL,
    //   provider,
    // );
  })

  it('Initialize Poll', async () => {    
    await votingProgram.methods.initializePoll(
      new anchor.BN(1),
      "Who is your favorite GDSC LEAD ?",
      new anchor.BN(0),
      new anchor.BN(1938068428),
    ).rpc();

    const [pollAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer, "le", 0)],
      votingAddress,
    )

    const poll = await votingProgram.account.poll.fetch[pollAddress];

    console.log(poll);

    expect(poll.pollId.toNumber()).toEqual(1);
    expect(poll.description).toEqual("WHat is your favorite type of Peanut"); 
    expect(poll.pollStart.toNumber()).toBeLessThan(poll.pollEnd.toNumber());
  });

  it("initialize candidate", async() => {
    await votingProgram.methods.initializeCandidate(
      "Smooth",
      new anchor.BN(1),
    ).rpc();
    
    await votingProgram.methods.initializeCandidate(
      "Crunchy",
      new anchor.BN(1),
    ).rpc();

    const [crunchyAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer, 'le', 0), Buffer.from("Crunchy")],
      votingAddress,
    );

    const crunchyCandidate = await votingProgram.account.candidate.fetch(crunchyAddress);
    console.log(crunchyCandidate);
    expect(crunchyCandidate.candidateVotes.toNumber()).toEqual(0);

    // smooth
    const [smoothAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer, 'le', 0), Buffer.from("Smooth")],
      votingAddress,
    );
    const smoothCandidate = await votingProgram.account.candidate.fetch(smoothAddress);
    console.log(smoothAddress);
    expect(smoothCandidate.candidateVotes.toNumber()).toEqual(0);
  });

  it("vote", async() => {
    await votingProgram.methods
      .vote(
        "Smooth",
        new anchor.BN(1)
      ).rpc()

      
    const [smoothAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer, 'le', 0), Buffer.from("Smooth")],
      votingAddress,
    );
    const smoothCandidate = await votingProgram.account.candidate.fetch(smoothAddress);
    console.log(smoothAddress);
    expect(smoothCandidate.candidateVotes.toNumber()).toEqual(1);
  });
});





  // Configure the client to use the local cluster.

  // const provider = anchor.AnchorProvider.env()
  // anchor.setProvider(provider)
  // const payer = provider.wallet as anchor.Wallet

  // const program = anchor.workspace.Votingdapp as Program<Votingdapp>

  // const votingdappKeypair = Keypair.generate()



// await program.methods
//       .initialize()
//       .accounts({
//         votingdapp: votingdappKeypair.publicKey,
//         payer: payer.publicKey,
//       })
//       .signers([votingdappKeypair])
//       .rpc()

//     const currentCount = await program.account.votingdapp.fetch(votingdappKeypair.publicKey)

//     expect(currentCount.count).toEqual(0)
//   })

//   it('Increment Votingdapp', async () => {
//     await program.methods.increment().accounts({ votingdapp: votingdappKeypair.publicKey }).rpc()

//     const currentCount = await program.account.votingdapp.fetch(votingdappKeypair.publicKey)

//     expect(currentCount.count).toEqual(1)
//   })

//   it('Increment Votingdapp Again', async () => {
//     await program.methods.increment().accounts({ votingdapp: votingdappKeypair.publicKey }).rpc()

//     const currentCount = await program.account.votingdapp.fetch(votingdappKeypair.publicKey)

//     expect(currentCount.count).toEqual(2)
//   })

//   it('Decrement Votingdapp', async () => {
//     await program.methods.decrement().accounts({ votingdapp: votingdappKeypair.publicKey }).rpc()

//     const currentCount = await program.account.votingdapp.fetch(votingdappKeypair.publicKey)

//     expect(currentCount.count).toEqual(1)
//   })

//   it('Set votingdapp value', async () => {
//     await program.methods.set(42).accounts({ votingdapp: votingdappKeypair.publicKey }).rpc()

//     const currentCount = await program.account.votingdapp.fetch(votingdappKeypair.publicKey)

//     expect(currentCount.count).toEqual(42)
//   })

//   it('Set close the votingdapp account', async () => {
//     await program.methods
//       .close()
//       .accounts({
//         payer: payer.publicKey,
//         votingdapp: votingdappKeypair.publicKey,
//       })
//       .rpc()

//     // The account should no longer exist, returning null.
//     const userAccount = await program.account.votingdapp.fetchNullable(votingdappKeypair.publicKey)
//     expect(userAccount).toBeNull()




