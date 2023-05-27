import React from "react";
import IProduct from "../model/IProduct";
import {useEffect, useState} from "react";
import {getDataFromServer} from "../service/dataService";
import ExpenseTracker from "./ExpenseTracker";
import '../style/showList.css';

function ShowList() {
    const [items, setItems] = useState<IProduct[]>([]);
    const [ showForm, setShowForm] = useState<boolean>(false)
    const [sum, setSum] = useState<number|null>();
    const[rahulSpent, setRahulSpent]= useState<number>(0);
    const[rameshSpent, setRameshSpent]= useState<number>(0);
    function calculateShare(data: IProduct[]) {
        let tempRahulSpent = 0;
        let tempRameshSpent = 0;
        data.map((eachProduct)=>{
            if(eachProduct.payeeName ==='Rahul'){
                 tempRahulSpent += eachProduct.price
            }else{
                tempRameshSpent += eachProduct.price
            }
        })
        setRahulSpent(tempRahulSpent);
        setRameshSpent(tempRameshSpent);
    }
    useEffect(() => {
        const fetchMenu = async () => {
          try {
            const data = await getDataFromServer() as IProduct[];
            setItems(data);
            setSum(data.reduce((acc: any, each: { price: any; })=>(acc+each.price),0));
            calculateShare(data);
          } catch (error: any) {
            console.log(error);
          }
        };
      
        fetchMenu();
      }, [showForm]);
      

    const success = () =>{
        setShowForm(false);
    }
    const cancel = () =>{
        setShowForm(false);
    }
    return (
        <div>
          <header id="page-header">Expense Tracker</header>
          <button id="Add-Button" onClick={()=>setShowForm(true)}>Add</button>
          {
            showForm && (
              <div className="form">
                <ExpenseTracker onClose={cancel} onTrue={success}></ExpenseTracker>
              </div> 
            )
          }
          <div className="show-list">
            <div className="row header">
              <div className="column">Date</div>
              <div className="column">Product Purchased</div>
              <div className="column">Price</div>
              <div className="column" style={{width:112}}>Payee</div>
            </div>
            {items &&
                items.map((user, idx) => (
                  <div key={idx} className="row">
                    <div className="column">{user.setDate}</div>
                    <div className="column">{user.product}</div>
                    <div className="column">{user.price}</div>
                    <div className={`column ${user.payeeName}`}>{user.payeeName}</div>
                  </div>
                ))}
          </div>
          <hr />
            <div className="column-container">
            <div className="column">Total:</div>
            <span className="column total">{sum}</span>
            </div>
            <div className="column-container">
            <div className="column">Rahul Paid:</div>
            <span className="column total Rahul">{rahulSpent}</span>
            </div>
            <div className="column-container">
            <div className="column">Ramesh Paid:</div>
            <span className="column total Ramesh">{rameshSpent}</span>
            </div>
            <div className="column-container">
            <div className="column">Pay to:</div>
            <div className="column payable">{rahulSpent>rameshSpent ? "Rahul:":"Ramesh:"}</div>
            <span className="column payable price">{Math.abs((rahulSpent-rameshSpent)/2)}</span>
</div>

        </div>
    );
}

export default ShowList;
