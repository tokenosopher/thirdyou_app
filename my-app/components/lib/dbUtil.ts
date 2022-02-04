import { User } from "./types";
import {
  collection,
  doc,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "./db";

export async function createUser(user: User): Promise<User> {
  const usersRef = collection(db, "users");
  await setDoc(doc(usersRef, user.id), {
    id: user.id,
    public_address: user.public_address,
    email: user.email,
  });
  return user;
}

export async function searchAddressByEmail(email: string): Promise<User> {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  const txs: User[] = querySnapshot.docs.map((value) => value.data() as User); //TODO Only 1 user per email.
  return txs[0];
}
