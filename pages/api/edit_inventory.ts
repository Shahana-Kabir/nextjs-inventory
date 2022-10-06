import { NextApiRequest, NextApiResponse } from "../../node_modules/next/dist/shared/lib/utils";
import connection from './mysql';

interface InventoryItem {
    id?: Number;
    newName: string;
    newQuantity: Number;
    newRate: Number
}

// const readInventory = async (req: NextApiRequest, res: NextApiResponse<InventoryItem>) => {
//     const inventoryItem: InventoryItem = req.body;
//     const conn = await connection();
//     let queryString = `SELECT * FROM finalTable`;
//     const [inventory] = await conn.query(queryString).
//         catch(err => { throw err });
//     res.json(inventory);
//     console.log(inventory);
// }
const updateInventory = async (finalTable) => {
    const conn = await connection();
    await conn.query('UPDATE finalTable SET newName = ?, newQuantity= ?, newRate= ?  WHERE id = ?', [finalTable.newName, finalTable.newQuantity, finalTable.newRate, finalTable.id])
}
export default async function editInventory(req: NextApiRequest, res: NextApiResponse<InventoryItem>) {
    const finalTable: InventoryItem = req.body;
    console.log(finalTable);
    await updateInventory(finalTable);
    res.status(200).json(finalTable);
console.log(finalTable);
}


