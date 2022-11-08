import { useState, useEffect } from "react"
import axios from "axios"
import InventoryItem from "../api/types/inventory_item";
// import ReactTable from "react-table";
import { blue, Table } from '@nextui-org/react';
import EditForm from './edit_form';
import ViewCart from "./view_cart";

export default function CustomerOrder(): JSX.Element {

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
    const [isViewing, setIsViewing] = useState(false);
    const [cart, setCart] = useState([]);


    const readInventory = () => {
        axios.get('http://localhost:3000/api/inventory/inventory')
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
    }, [])


    console.log(readInventoryItems);

 
    const handleAddtoCart = (e, x) => {
        e.preventDefault();
        console.log(x);
        cart.push(x);
        console.log(cart);
        setCart([...cart])
        console.log(cart);
    }
    const handleViewCart = (e,) => {
        e.preventDefault();
        setIsViewing(true);
        console.log(cart);
    }



    return (
        <div>
             {isViewing ? <ViewCart cart = {cart} readInventoryItems = {readInventoryItems}/> :  <div>
                <div className="title">
                    <h1 className="title_mainTitle"> Grocery Items </h1>
                    <button className="title_cart" onClick={(e: any,) => handleViewCart(e)}>
                        View cart
                    </button>
                </div>

                <style jsx>
                    {
                        `
                        .title {
                            margin-left : 25rem;
                            display: flex;
                            
                        }
                        .title_cart {
                            margin-top: 2rem;
                            height: 2rem
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
                        <Table.Column>Add to cart</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {readInventory ? readInventoryItems.map((x, i) => (
                            <Table.Row key={i}>
                                <Table.Cell>{x.name}</Table.Cell>
                                <Table.Cell>{x.quantity}</Table.Cell>
                                <Table.Cell>{x.rate}</Table.Cell>
                                <Table.Cell>
                                    <button onClick={(e: any,) => handleAddtoCart(e, x)}>Add to cart</button>
                                </Table.Cell>
                            </Table.Row>)) : <></>
                        }
                    </Table.Body>
                </Table>
            </div>}
           
        </div>
    )
}               
