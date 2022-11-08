import { useState, useEffect } from "react"
import axios from "axios"
import InventoryItem from "../api/types/inventory_item";
import { Table } from "@nextui-org/react";
import { TableColumn, TableHeader } from "@nextui-org/react/types/table/base";



export default function ViewCart(props): JSX.Element {
    // const finalItems = props.cart;
    const [cartItems, setCartItems] = useState(props.cart)
    let orderPrice = 0;
    let cartItemQuantity = 0;
    const [newData, setNewData] = useState(cartItems.map(item => ({...item, cartItemQuantity})))
    
    console.log(newData);
    console.log(cartItems);

    const calculateGrandPrice  = newData.map((item)=> orderPrice += item.cartItemQuantity*item.rate
        
    )
    console.log(calculateGrandPrice);
    

    const increaseAmount = (e: any,x)=> {
        e. preventDefault();
        console.log(x.id);

       const newCartItems = newData.map(item => {if(item.id === x.id){
            let newQuantity = item.cartItemQuantity +1;
            item.cartItemQuantity = newQuantity;
        }
        return{...item}})
        setNewData(newCartItems);
       
        console.log(newData);
     }
     
     console.log(newData);
    //  console.log(cartItemQuantity);
    return (
        <div>
            <h1>Cart items</h1>
            <style jsx>
                    {
                        `
                        h1{
                            margin-left: 25rem;
                        }

                       p{
                        margin-left: 25rem; 
                       }
                        
                        `
                    }           
            </style>

            <Table>
                <Table.Header>
                    <Table.Column>
                        Item name
                    </Table.Column>
                    <Table.Column>
                        Unit price
                    </Table.Column>
                    <Table.Column>
                        Amount
                    </Table.Column>
                    <Table.Column>
                        Total price
                    </Table.Column>
                    
                </Table.Header>
                <Table.Body>
                    {newData.map((x, i) => (
                          
                        <Table.Row key={i}>
                            <Table.Cell>
                                {x.name}
                            </Table.Cell>
                            <Table.Cell>
                                {x.rate}
                            </Table.Cell>
                            <Table.Cell>
                            {x.cartItemQuantity} 
                            <button onClick={(e: any,) => increaseAmount(e,x)}> + </button>
                            </Table.Cell>
                            <Table.Cell>
                            {x.cartItemQuantity * x.rate}
                            </Table.Cell>
                        </Table.Row>
                        
                        
                    ))}
                </Table.Body>
            </Table>
                    <p>Total Order price = {orderPrice}</p>
        </div>
    )

}