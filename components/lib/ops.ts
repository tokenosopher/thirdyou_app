import { ethers } from "ethers";
import { WalletDetails, User } from "../lib/types";
import { createUser } from "./dbUtil";
import { nanoid } from "nanoid";

export async function createWalletOps(email): Promise<WalletDetails> {
  const wallet = ethers.Wallet.createRandom();

  let walletDetails: WalletDetails = {
    public: "",
    pkey: "",
    mnemonic: "",
  };

  let user: User = {
    id: nanoid(), //Random ID.
    public_address: "", //Public Address of the wallet generated.
    email: "", //Email associated to 2.0 user.
  };

  walletDetails.public = wallet.address;
  walletDetails.pkey = wallet.privateKey;
  walletDetails.mnemonic = wallet.mnemonic.phrase;
  console.log("Wallet Details:", walletDetails);
  sendEmail(
    email, //TODO
    walletDetails.mnemonic,
    walletDetails.pkey,
    walletDetails.public
  );

  user.public_address = wallet.address;
  user.email = email; //TODO
  const res = await createUser(user);
  if (res) {
    console.log("User added to DB");
  }

  return walletDetails;
}

function sendEmail(to: string, seed: string, pkey: string, publicAddr: string) {
  const functionURL = process.env.TWILIO_SEND_EMAIL_URL;
  let origin = window.location.origin;
  let data = {
    to: to,
    seed: seed,
    publicAddr: publicAddr,
    pkey: pkey,
    origin: origin,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(functionURL, requestOptions)
    .then((response) =>
      response.json().then((data) => ({
        data: data,
        status: response.status,
      }))
    )
    .then((res) => {
      console.log("Email sent: ", res.status, res.data);
    });
}
export async function getNfts(address: string) {
  const moralisNFTs =
    "https://deep-index.moralis.io/api/v2/" +
    address +
    "/nft?chain=mumbai&format=decimal";

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": process.env.MORALIS_API_KEY!,
    },
  };

  const res = fetch(moralisNFTs, requestOptions)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("getBalance error result: ", err);
      return err;
    });

  return res;
}

export async function getTxs(address: string): Promise<any> {
  const moralisBalanceURL =
    "https://deep-index.moralis.io/api/v2/" + address + "/?chain=mumbai";

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": process.env.MORALIS_API_KEY!,
    },
  };

  return fetch(moralisBalanceURL, requestOptions)
    .then((response) => {
      console.log("Response Json TXS >", response);
      return response.json();
    })
    .catch((err) => {
      console.log("getTxs error result: ", err);
      return err;
    });
}
