import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import {
  searchAddressByEmail,
  createUser,
} from "../../../components/lib/dbUtil";

export default nc<NextApiRequest, NextApiResponse>()
  .get(async (req, res) => {
    const email: string = req.query.email as string;

    const tx = await searchAddressByEmail(email);
    if (tx) res.json(tx);
    else
      res.json({
        status: "We didn't find a user associated to this email.",
      });
  })
  .post(async (req, res) => {
    const id_owner = await createUser(req.body);
    return res.json({ id_owner: id_owner, status: "success" });
  });
