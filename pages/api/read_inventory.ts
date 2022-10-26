import { NextApiRequest, NextApiResponse } from "../../node_modules/next/dist/shared/lib/utils";
import connection from './mysql';
import InventoryItem from "./types/inventory_item";

export default async function readInventory(req: NextApiRequest, res: NextApiResponse<Array<InventoryItem>>) {
    const conn = await connection();
    let queryString = `SELECT * FROM inventoryItems`;
    const [inventory] = await conn.query(queryString).catch(err => {throw err});
    res.json(inventory);
}
