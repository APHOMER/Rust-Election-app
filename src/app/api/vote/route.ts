import { ActionGetResponse, ActionPostRequest, ACTIONS_CORS_HEADERS, createPostResponse } from "@solana/actions"
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { Voting } from "@/../anchor/target/types/votingdapp";

import { title } from "process";
import { AnchorProvider } from "@coral-xyz/anchor";

import { BN, Program } from "@coral-xyz/anchor";

const IDL = require("../../../../anchor/target/idl/votingdapp.json");

export const OPTIONS = GET;


export async function GET(request: Request) {
  const actionMetadata: ActionGetResponse = {
    icon: "https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg",
    title: "Who is likely to make a GOOD WIFE between these two ladies.",
    description: "vote between Ifihan and Sarima.",
    label: "Vote",
    links: {
      actions: [
        {
          label: "vote for Ifihan",
          // method: "POST",
          href: "/api/vote?candidate=Ifihan",
          type: "transaction"
        },
        {
          label: "vote for Sarima",
          // method: "POST",
          href: "/api/vote?candidate=Sarima",
          type: "transaction"
        }
      ]
    }
  };
  return Response.json(actionMetadata, { headers: ACTIONS_CORS_HEADERS });
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const candidate = url.searchParams.get("candidate");

  if (candidate != "Ifihan" &&  candidate != "Sarima") {
    return new Response("Invalid candidate", { status: 400, headers: ACTIONS_CORS_HEADERS });
  }

  const connection = new Connection("http://127.0.0.1.8899", "confirmed");
  const program: Program<Voting> = new Program(IDL, {connection});

// const programId = new PublicKey("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF"); // Replace with actual program ID
// const provider = new AnchorProvider(connection, null, AnchorProvider.defaultOptions());
// const program: Program<Voting> = new Program(IDL, programId, provider);

  const body: ActionPostRequest = await request.json();
  let voter;

  try {
    console.log("PublicKey input:", body.account);

    voter = new PublicKey(body.account);
  } catch (error) {
    return new Response("Invalid account", { status: 400, headers: ACTIONS_CORS_HEADERS });
  }

  const instruction = await program.methods
    .vote(candidate, new BN(1))
    .accounts({
      signer: voter,
    })
    .instruction();
  
  const blockhash = await connection.getLatestBlockhash(); // expires after 150 confirmed blocks

  const transaction = new Transaction({
    feePayer: voter,
    blockhash: blockhash.blockhash,
    lastValidBlockHeight: blockhash.lastValidBlockHeight,
  }).add(instruction);

  // Serialize transaction before sending it
const serializedTransaction = transaction.serialize().toString('base64');

  const response = await createPostResponse({
    fields: {
      transaction: transaction,
      type: "transaction",
    }
  });

  return Response.json(response, { headers: ACTIONS_CORS_HEADERS });
}

 


