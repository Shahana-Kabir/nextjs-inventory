import { NextApiRequest, NextApiResponse } from "next/dist/shared/lib/utils";
import connection from '../mysql';
import InventoryItem from "../types/inventory_item";




export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const conn = await connection();
    const method = req.method;
    switch(method){
        case 'GET':
            let queryString = `SELECT * FROM inventoryItems`;
            const [inventory] = await conn.query(queryString).catch(err => {throw err});
            res.status(200).json(inventory);
            break
            case 'POST':
                const saveInventory = async (inventoryItems: InventoryItem) => {
                    // const conn = await connection()
                    await conn.query('INSERT INTO inventoryItems SET ?', inventoryItems)
                }
                const inventoryItems = req.body;
                await saveInventory(inventoryItems);
                res.status(200).json(inventoryItems);
            break
            case 'PUT':
            const updateInventory = async (inventoryItem: InventoryItem) => {
                const conn = await connection();
                await conn.query('UPDATE inventoryItems SET name = ?, quantity= ?, rate= ?  WHERE id = ?', [inventoryItem.name, inventoryItem.quantity, inventoryItem.rate, inventoryItem.id])
                }
            const inventoryItem: InventoryItem = req.body;
            console.log(inventoryItem);
            await updateInventory(inventoryItem);
            res.status(200).json(inventoryItem);
            default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
    }
  
}
