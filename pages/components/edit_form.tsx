import {useState, useEffect} from 'react';
import axios from "axios"
import { blue, Table } from '@nextui-org/react';
import Inventory_form from './inventory_list';
import InventoryItem from '../api/types/inventory_item';

type EditFormProps = {
    inventoryItem: InventoryItem
    onUpdate: () => void
}

const EditForm = (props: EditFormProps) => {
    const [changeRow, setChangeRow] = useState<InventoryItem>({
        id: props.inventoryItem.id,
        name: props.inventoryItem.name,
        quantity: props.inventoryItem.quantity,
        rate: props.inventoryItem.rate
    })
    // http://localhost:3000/api/edit_inventory
    const updateEditedData =(e)=> {
        e.preventDefault();
        axios.put('http://localhost:3000/api/inventory/inventory', changeRow)
        .then(function (response) {
            console.log('success');
            console.log(response.data);
            props.onUpdate();
        })
        .catch(function (error) {
            console.log(error);
        });        
    }

   
    return (
        <>
           <div> <h2>Edit form</h2>
            <form>
                <div>
                    <div>Product name</div>
                    <div>
                        <input type="text" value = {changeRow.name} onChange = {e => setChangeRow({...changeRow, name:e.target.value})} />
                        
                    </div>
                </div>
                <div>
                    <div>Quantity</div>
                    <div>
                        <input type="number" value = {changeRow.quantity} onChange = {e => setChangeRow({...changeRow, quantity: parseInt(e.target.value, 10)})} />
                    </div>
                </div>
                <div>
                    <div>Rate</div>
                    <div>
                        <input type="number" value ={changeRow.rate} onChange = {e => setChangeRow({...changeRow,rate: parseInt(e.target.value, 10)})}/>
                    </div>
                </div>
                <button type="submit" onClick = {updateEditedData}>Edit</button>
                {/* {updateEditedData ?:} */}
            </form>
            </div> 
        </>
    )
}
export default EditForm;