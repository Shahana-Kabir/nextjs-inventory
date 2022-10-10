import { NextApiRequest, NextApiResponse } from "../../node_modules/next/dist/shared/lib/utils";
import connection from './mysql';

interface InventoryItem {
    id?: Number;
    newName: string;
    newQuantity: Number;
    newRate: Number
}
const deleteItem = async (id) => {
    const conn = await connection();
    await conn.query('DELETE FROM finalTable WHERE id = ?', [id])
}
export default async function deleteInventory(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.body);
    const deletedId = req.body.id;
    // console.log(deletedId);
    await deleteItem(deletedId);
    res.status(200).json({id:deletedId});
    (res.status(200).json({id:deletedId}));
}