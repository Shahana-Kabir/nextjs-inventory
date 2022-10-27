import { NextApiRequest, NextApiResponse } from "../../node_modules/next/dist/shared/lib/utils";
import connection from './mysql';
import InventoryItem from "./types/inventory_item";



const saveInventory = async (inventoryItems: InventoryItem) => {
    const conn = await connection()
    await conn.query('INSERT INTO inventoryItems SET ?', inventoryItems)
}

export default async function createInventory(req: NextApiRequest, res: NextApiResponse<InventoryItem>) {
    const inventoryItems: InventoryItem = req.body;
    await saveInventory(inventoryItems);
    res.status(200).json(inventoryItems);
}
