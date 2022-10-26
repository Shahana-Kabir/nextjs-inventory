import { NextApiRequest, NextApiResponse } from "../../node_modules/next/dist/shared/lib/utils";
import connection from './mysql';
import InventoryItem from "./types/inventory_item";

const updateInventory = async (inventoryItem: InventoryItem) => {
    const conn = await connection();
    await conn.query('UPDATE inventoryItems SET name = ?, quantity= ?, rate= ?  WHERE id = ?', [inventoryItem.name, inventoryItem.quantity, inventoryItem.rate, inventoryItem.id])
}
export default async function editInventory(req: NextApiRequest, res: NextApiResponse<InventoryItem>) {
    const inventoryItem: InventoryItem = req.body;
    console.log(inventoryItem);
    await updateInventory(inventoryItem);
    res.status(200).json(inventoryItem);
    console.log(inventoryItem);
}


