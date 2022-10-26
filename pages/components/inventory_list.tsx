import { useState, useEffect } from "react"
import axios from "axios"
import InventoryItem from "../api/types/inventory_item";
// import ReactTable from "react-table";
import { blue, Table } from '@nextui-org/react';
import EditForm from './edit_form';

export default function InventoryList(): JSX.Element {

    const [item, setItem] = useState({
        name: "",
        quantity: null,
        rate: null,

    });
   
    const [readInventoryItems, setReadInventoryItems] = useState<Array<InventoryItem>>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState<InventoryItem>({
        id: null,
        name: "",
        quantity: null,
        rate: null
    });
    const [deleteId, setDeleteId] = useState(null);
     const [searchProduct, setSearchProduct] = useState('');
    const [isSearch, setIsSearch] = useState(false);

    
    
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

    }
    
    const readInventory = () => {
        axios.get('http://localhost:3000/api/read_inventory')
            .then(response => {
                console.log('success');
                setReadInventoryItems(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    useEffect(() => {
        readInventory();
    },[])
 
   
 console.log(readInventoryItems);

    const handleEdit = (e, x: InventoryItem) => {
        e.preventDefault();
        setIsEditing(true);
        setEditData(x);
    }
    const changeEdit = ()=> {
        console.log('inside change edit');
        setIsEditing(false);
                
    }

    const onUpdate = () : void => {
        changeEdit()
        readInventory()
    }
    const handleDelete = (e, x)=> {
        e.preventDefault();
        console.log(x.id);
        axios.delete(`http://localhost:3000/api/delete_inventory/`, {data: x})
        .then(response => {
            setDeleteId(response.data.id);
            readInventoryItems.filter(item => item.id !== deleteId)  
         readInventory();
        })
        .catch(function (error) {
            console.log(error);
        }); 
        const deletedId = deleteId;
        
    }
  
  const handleSearch = (e)=> {
      setSearchProduct(e.target.value)
      console.log(searchProduct);

  }
  
   

    return (
        <div>
            
            <div>
                <div className = "title">
                    <h1 className = "title_mainTitle"> Inventory Items </h1>
                    <div className = "title_search">
                        <input  placeholder = "search" type = "text" />
                    </div>
                    
                </div>
                  
                <style jsx>
                    {
                        `
                        .title {
                            margin-left : 25rem;
                            display: flex;
                            
                        }
                        .title_search {
                            margin-top: 2rem
                        }
                        .title_mainTitle {
                            margin-right:2rem
                        }
                        .form{
                            margin-left : 27rem;
                            margin-top: 0.25rem;
                        
                        }
                        h2{
                            margin-left: 25rem;
                            margin-top: 5rem;
                        }
                        .form_button{
                            margin-left : 27rem;
                            margin-top: 1rem;
                        }
                       
                        
                        `
                    }           </style> 

                <Table >
                    <Table.Header>
                        <Table.Column>Product Name</Table.Column>
                        <Table.Column>Quantity</Table.Column>
                        <Table.Column>Rate</Table.Column>
                        <Table.Column>Edit</Table.Column>
                        <Table.Column>Delete</Table.Column>
                    </Table.Header>
                    <Table.Body>
                         {readInventory ? readInventoryItems.map((x, i) => (
                            <Table.Row key={i}>
                                <Table.Cell>{x.name}</Table.Cell>
                                <Table.Cell>{x.quantity}</Table.Cell>
                                <Table.Cell>{x.rate}</Table.Cell>
                                <Table.Cell>
                                    <button onClick={(e:any,) => handleEdit(e, x)}>Edit</button> 
                                </Table.Cell>
                                <Table.Cell>
                                    <button onClick={(e: any,) => handleDelete(e, x)}>Delete</button>
                                </Table.Cell>
                            </Table.Row>)):<></>
                        } 
                    </Table.Body>
                </Table>
                {isEditing ? <EditForm inventoryItem = {editData} onUpdate = {onUpdate}/> : <form>
                    
                        <h2> Add a new product</h2>
                        <div className = "form">
                        <div>Product name</div>
                        <div className = "form_input">
                            <input type="text" placeholder="name" onChange={e => setItem({ ...item, name: e.target.value })} />
                        </div>
                    </div>
                    <div className = "form">
                        <div> Quantity</div>
                        <div>
                            <input className = "form_input" type="number" placeholder="quantity" onChange={e => setItem({ ...item, quantity: parseInt(e.target.value, 10) })} />
                        </div>
                    </div>
                    <div className = "form">
                        <div>Rate</div>
                        <div>
                            <input className = "form_input" type="number" placeholder="rate" onChange={e => setItem({ ...item, rate: parseInt(e.target.value, 10) })} />
                        </div>
                    </div>
                    <button className ="form_button" type = 'submit' onClick={submitItem}>Save</button>
                </form>}


            </div>
        </div>
    )
}               
