import { NextApiRequest, NextApiResponse } from "../../node_modules/next/dist/shared/lib/utils";
import connection from './mysql';
// import InventoryItem from "./types/inventory_item";

interface InventoryItem {
    id?: Number;
    newName: string;
    newQuantity: Number;
    newRate: Number
}

const saveInventory = async (finalTable: InventoryItem) => {
    const conn = await connection()
    await conn.query('INSERT INTO finalTable SET ?', finalTable)
}

export default async function createInventory(req: NextApiRequest, res: NextApiResponse<InventoryItem>) {
    const finalTable: InventoryItem = req.body;
    await saveInventory(finalTable);
    res.status(200).json(finalTable);
}
