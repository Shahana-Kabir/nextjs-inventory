import InventoryForm from "../../components/inventory_list";

interface InventoryItem {
    id?: number;
    name: string;
    quantity: number;
    rate: number
}

export default InventoryItem;