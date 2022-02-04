export interface User {
  id: string; //Random ID.
  public_address: string; //Public Address of the wallet generated.
  email: string; //Email associated to 2.0 user.
}

export interface WalletDetails {
  public: string;
  pkey: string;
  mnemonic: string;
}
