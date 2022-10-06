import { useState, useEffect } from "react"
import axios from "axios"
import InventoryItem from "../api/types/inventory_item";
// import ReactTable from "react-table";
import { blue, Table } from '@nextui-org/react';
import ReactPaginate from 'react-paginate';
import uuid from 'react-uuid';
import EditForm from './editForm';
import { json } from "stream/consumers";
import { isAnyArrayBuffer } from "util/types";


export default function InventoryForm(): JSX.Element {

    const [item, setItem] = useState({
        name: "",
        quantity: null,
        rate: null,

    });
   
    const [readInventoryItems, setReadInventoryItems] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});

    
    
    const submitItem = (e: any) => {
        e.preventDefault();
        const newData = { newName: item.name, newQuantity: item.quantity, newRate: item.rate };

        axios.post('http://localhost:3000/api/create_inventory', newData)
            .then(function (response) {
                console.log('success');
                readInventory();
                console.log(readInventoryItems);
            })
            .catch(function (error) {
                console.log(error);
            });
        // readInventory();

    }
    
    const readInventory = () => {
        axios.get('http://localhost:3000/api/read_inventory')
            .then(response => {
                console.log('success');
                // console.log(response);
                setReadInventoryItems(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    useEffect(() => {
        readInventory();
    },[])
 
   
    // console.log(readInventoryItems);

    const handleEdit = (e, x) => {
        e.preventDefault();
        setIsEditing(true);
        setEditData(x);
        // console.log(editData);

    }
    const changeEdit = ()=> {
        console.log('inside change edit');
        setIsEditing(false);
                
    }

    return (
        <div>
            
            <div>
                <Table
                    aria-label="Example table with static content"
                    css={{
                        height: "auto",
                        minWidth: "100%",
                        color: "blue"
                    }}>
                    <Table.Header>
                        <Table.Column>Product Name</Table.Column>
                        <Table.Column>Quantity</Table.Column>
                        <Table.Column>Rate</Table.Column>
                        <Table.Column>Edit</Table.Column>
                    </Table.Header>
                    <Table.Body>
                         {readInventory ? readInventoryItems.map((x, i) => (
                            <Table.Row key={i}>
                                <Table.Cell>{x.newName}</Table.Cell>
                                <Table.Cell>{x.newQuantity}</Table.Cell>
                                <Table.Cell>{x.newRate}</Table.Cell>
                                <Table.Cell>
                                    {/* {x.newQuantity && x.newRate && x.id !== null ? <button onClick={(e: any,) => handleEdit(e, x)}>Edit</button> : ''} */}
                                    <button onClick={(e: any,) => handleEdit(e, x)}>Edit</button> 
                                </Table.Cell>
                            </Table.Row>)):<></>
                        } 
                    </Table.Body>
                </Table>
                {isEditing ? <EditForm editData = {editData} changeEdit = {changeEdit} readInventoryItems = {readInventoryItems} readInventory = {readInventory}/> : <form>
                    <div>
                        <div>Product name</div>
                        <div>
                            <input type="text" placeholder="name" onChange={e => setItem({ ...item, name: e.target.value })} />
                        </div>
                    </div>
                    <div>
                        <div> Quantity</div>
                        <div>
                            <input type="number" placeholder="" onChange={e => setItem({ ...item, quantity: parseInt(e.target.value, 10) })} />
                        </div>
                    </div>
                    <div>
                        <div>Rate</div>
                        <div>
                            <input type="number" placeholder="" onChange={e => setItem({ ...item, rate: parseInt(e.target.value, 10) })} />
                        </div>
                    </div>
                    <button type = 'submit' onClick={submitItem}>Save</button>
                </form>}


            </div>
        </div>
    )
}               
