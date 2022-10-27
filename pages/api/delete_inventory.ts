import { NextApiRequest, NextApiResponse } from "../../node_modules/next/dist/shared/lib/utils";
import connection from './mysql';
import InventoryItem from "./types/inventory_item";

const deleteItem = async (id) => {
    const conn = await connection();
    await conn.query('DELETE FROM inventoryItems WHERE id = ?', [id])
}
export default async function deleteInventory(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.body);
    const deletedId = req.body.id;
    // console.log(deletedId);
    await deleteItem(deletedId);
    res.status(200).json({id:deletedId});
    (res.status(200).json({id:deletedId}));
}