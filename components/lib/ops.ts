import { ethers } from "ethers";
import { WalletDetails, User } from "../lib/types";
import { createUser } from "./dbUtil";
import { nanoid } from "nanoid";
import { useAmp } from "next/amp";

export async function createWalletOps(): Promise<WalletDetails> {
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
    "isaacwi@gmail.com", //TODO
    walletDetails.mnemonic,
    walletDetails.pkey,
    walletDetails.public
  );

  user.public_address = wallet.address;
  user.email = "isaacwi@gmail.com"; //TODO
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
