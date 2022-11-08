import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
import connection from '../mysql';
import InventoryItem from '../types/inventory_item';

// interface InventoryItem {
//     id?: Number;
//     newName: string;
//     newQuantity: Number;
//     newRate: Number
// }
const deleteItem = async (id) => {
    const conn = await connection();
    await conn.query('DELETE FROM inventoryItems WHERE id = ?', [id])
}



export default async function InventoryHandler(req: NextApiRequest, res: NextApiResponse) {
   const method = req.method;
    const inventoryId = req.query.inventoryId;
    let result;
    switch (method) {
      case 'DELETE':
        // Get data from your database
       const result =  await deleteItem(inventoryId);
        res.status(200).json({id:inventoryId});
        console.log(result);
        break
        default:
        res.setHeader('Allow', ['DELETE'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  }