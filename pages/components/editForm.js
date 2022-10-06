import {useState, useEffect} from 'react';
import axios from "axios"
import { blue, Table } from '@nextui-org/react';
import Inventory_form from './inventory_form';

const EditForm = (props) => {
    const [changeRow, setChangeRow] = useState({
        changedName: props.editData.newName,
        changedQuantity: props.editData.newQuantity,
        changedRate: props.editData.newRate
    })
   console.log(props);
    const [editing, setEditing] = useState(props.isEditing);
    const [fetchedInventoryItems, setFetchedInventoryItems] = useState(props.readInventoryItems);
    const updatedData = {
        id: props.editData.id,
        newName:changeRow.changedName,
        newQuantity:changeRow.changedQuantity,
        newRate:changeRow.changedRate
    }
    console.log(fetchedInventoryItems);

    const updateEditedData =(e)=> {
        e.preventDefault();
        axios.put('http://localhost:3000/api/edit_inventory', updatedData)
        .then(function (response) {
            console.log('success');
            console.log(response.data);
            // props.changeEdit();
             props.readInventory();
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
                        <input type="text" defaultValue = {props.editData.newName} onChange = {e => setChangeRow({...changeRow, changedName:e.target.value})} />
                        
                    </div>
                </div>
                <div>
                    <div>Quantity</div>
                    <div>
                        <input type="number" defaultValue = {props.editData.newQuantity} onChange = {e => setChangeRow({...changeRow,changedQuantity: e.target.value})} />
                    </div>
                </div>
                <div>
                    <div>Rate</div>
                    <div>
                        <input type="number" defaultValue ={props.editData.newRate} onChange = {e => setChangeRow({...changeRow,changedRate: e.target.value})}/>
                    </div>
                </div>
                <button type="submit" onClick = {updateEditedData}>Edit</button>
            </form>
            </div> 
        </>
    )
}
export default EditForm;