///Create new item api:
// import { NextApiRequest, NextApiResponse } from "../../node_modules/next/dist/shared/lib/utils";
// import connection from './mysql';
// import InventoryItem from "./types/inventory_item";



// const saveInventory = async (inventoryItems: InventoryItem) => {
//     const conn = await connection()
//     await conn.query('INSERT INTO inventoryItems SET ?', inventoryItems)
// }

// export default async function createInventory(req: NextApiRequest, res: NextApiResponse<InventoryItem>) {
//     const inventoryItems: InventoryItem = req.body;
//     await saveInventory(inventoryItems);
//     res.status(200).json(inventoryItems);
// }
//// Delete item api:
// import { NextApiRequest, NextApiResponse } from "../../node_modules/next/dist/shared/lib/utils";
// import connection from './mysql';
// import InventoryItem from "./types/inventory_item";

// const deleteItem = async (id) => {
//     const conn = await connection();
//     await conn.query('DELETE FROM inventoryItems WHERE id = ?', [id])
// }
// export default async function deleteInventory(req: NextApiRequest, res: NextApiResponse) {
//     console.log(req.body);
//     const deletedId = req.body.id;
//     // console.log(deletedId);
//     await deleteItem(deletedId);
//     res.status(200).json({id:deletedId});
//     (res.status(200).json({id:deletedId}));
// }
////EDIT item api:
// import { NextApiRequest, NextApiResponse } from "../../node_modules/next/dist/shared/lib/utils";
// import connection from './mysql';
// import InventoryItem from "./types/inventory_item";

// const updateInventory = async (inventoryItem: InventoryItem) => {
//     const conn = await connection();
//     await conn.query('UPDATE inventoryItems SET name = ?, quantity= ?, rate= ?  WHERE id = ?', [inventoryItem.name, inventoryItem.quantity, inventoryItem.rate, inventoryItem.id])
// }
// export default async function editInventory(req: NextApiRequest, res: NextApiResponse<InventoryItem>) {
//     const inventoryItem: InventoryItem = req.body;
//     console.log(inventoryItem);
//     await updateInventory(inventoryItem);
//     res.status(200).json(inventoryItem);
//     console.log(inventoryItem);
// }