import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import { ADAPTER_EVENTS } from "@web3auth/base";

export const web3auth = new Web3Auth({
  chainConfig: { chainNamespace: CHAIN_NAMESPACES.EIP155 },
  clientId: process.env.CLIENT_ID_WEB3AUTH,
});

export function subscribeAuthEvents(web3auth) {
  web3auth.on(ADAPTER_EVENTS.CONNECTED, (data) => {
    console.log(" CONNECTED Data", data);
  });
  web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
    console.log("connecting XXXXXXXXX");
  });

  web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
    console.log("disconnected");
  });

  web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
    console.log("soerror or user have cancelled login request", error);
  });
}

export async function init(web3auth) {
  console.log("*** Initializing !!! ***");
  try {
    subscribeAuthEvents(web3auth);
    await web3auth.initModal();
    console.log("*** Initialized !!! ***");
  } catch (error) {
    console.log("error", error);
    return error;
  }
}
