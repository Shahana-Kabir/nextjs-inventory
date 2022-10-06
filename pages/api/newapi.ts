

import { NextApiRequest, NextApiResponse } from "../../node_modules/next/dist/shared/lib/utils";
import connection from './mysql';

interface MemberSpec {
    id?: Number;
    no:Number;
    age: Number;
}

const saveMemberSpec = async (new_Member: MemberSpec) => {
    const conn = await connection()
    await conn.query('INSERT INTO new_member SET ?', new_Member)
}
export default async function handler(req, res) {
    const new_Member: MemberSpec = req.body;
    console.log(new_Member);
    try{
        await saveMemberSpec(new_Member);
        res.status(200).json(new_Member);
    } catch(error) {
        res.status(400).json({error: error});
    }    
}