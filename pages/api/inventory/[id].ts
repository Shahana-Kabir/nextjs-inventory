import { NextApiRequest, NextApiResponse } from "../../../node_modules/next/dist/shared/lib/utils";
import connection from '../mysql';

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

export default async function InventoryHandler(req: NextApiRequest, res: NextApiResponse) {
    const {
      query: { id },
      method,
    } = req
  
    switch (method) {
      case 'DELETE':
        // Get data from your database
        await deleteItem(id);
        res.status(200).json({id:id});
        break
    }
  }