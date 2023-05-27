import React, { useState } from "react";
import {postNewItem} from "../service/dataService";
import IProduct from "../model/IProduct";
import { useNavigate } from "react-router-dom";

import '../style/expenseTracker.css';
type Props={
    onTrue: any,
    onClose: any
}
function ExpenseTracker({onTrue, onClose}: Props) {
    function showDefaultDate(){
        const today = new Date();
        return (
           ` ${today.getFullYear()}-${("0"+(today.getMonth()+1)).slice(-2)}-${("0"+(today.getDate()+1)).slice(-2)}`
        );
    }
    const [payeeName, setPayeeName] = useState("");
    const [product, setProductName] = useState("");
    const [price, setPriceValue] = useState(0);
    const [date, setDate] = useState(showDefaultDate());
    const navigate = useNavigate();

    async function handleSubmit(event: React.ChangeEvent<HTMLFormElement>){
        event.preventDefault();
        const finalItem: Omit<IProduct, 'id'> = {
            payeeName,
            product,
            price,
            setDate: date,
        };
        const data = await postNewItem(finalItem);
        console.log(data);
        navigate('/');
    }
    function setPayee (event: React.ChangeEvent<HTMLSelectElement>){
        setPayeeName(event.target.value);
    }
    function setProduct (event: React.ChangeEvent<HTMLInputElement>){
        setProductName(event.target.value);
    }
    function setPrice (event: React.ChangeEvent<HTMLInputElement>){
        setPriceValue(parseInt(event.target.value));
    }
    function setDateValue (event: React.ChangeEvent<HTMLInputElement>){
        setDate(event.target.value);
    }
  return (
    <>
        <section>
            <header>
                <h1>Add New Item</h1>
                <p>Read the below instructions before proceeding:</p>
                <br />
                Make sure you fill all the details where * is provided
             </header>
             <form onSubmit={handleSubmit}>
                <article>
                    <p className="starlabel">Name</p>
                    <select title="name" name="name" id="name" required value={payeeName} onChange={setPayee}>
                        <option value="" defaultChecked>Choose</option>
                        <option value="Rahul" >Rahul</option>
                        <option value="Ramesh" >Ramesh</option>
                    </select>
                </article>

                <article>
                    <p className="starlabel">Product Purchased</p>
                    <input placeholder="ProductPurchased" type="text" name="product" id= "product" required value={product} onChange={setProduct}/>
                </article>

                <article>
                    <p className="starlabel">Price</p>
                    <input placeholder="price" type="number" name="price" id="price" required value={price} onChange={setPrice}/>
                </article>

                <article>
                    <p className="starlabel">Date</p>
                    <input placeholder="date" type="date" name="date" id="date" required value={date} onChange={setDateValue}/>
                </article>
                <button className="form-button" onClick={onClose}>Close</button>
                <button className="form-button">Submit</button>
             </form>
        </section>
    </>
  )
}

export default ExpenseTracker;