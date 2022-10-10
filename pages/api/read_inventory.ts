import { NextApiRequest, NextApiResponse } from "../../node_modules/next/dist/shared/lib/utils";
import connection from './mysql';



export default async function readInventory(req: NextApiRequest, res: NextApiResponse) {
    const conn = await connection();
    let queryString = `SELECT * FROM finalTable`;
    const [inventory] = await conn.query(queryString).catch(err => {throw err});
    res.json(inventory);
    
}
