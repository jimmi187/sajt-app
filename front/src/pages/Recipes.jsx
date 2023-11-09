
import { useEffect, useState } from "react";
import axios from "axios";
import { generatePath } from "react-router-dom";


function Cart({  updateShoppingList, listOfGroceries, shoppigList }){
   return(
      <div>
         {listOfGroceries !== null ? shoppigList.map(x => <OneProd prod={x} />) : <p>no data</p>}
      </div>
   );
}


function OneProd({ prod }) {
   let key = prod.key;
   let x2 = prod.value;
   // console.log(prod)
   return (<>
      <h3>{key} <button> add more </button> </h3>
      <p> {x2.name}  =======  {x2.price}  ======= {x2.store.map(x=> x+" ") }<button> change </button> <button> remove </button></p> 
      
   </>)
}


function Recipes(params) {
   const [groceries, setGroceries] = useState([]);
   const [shoppigList, setShoppingList] = useState([]);


   useEffect(() => {
      //files
      axios.get("http://127.0.0.1:4444/yo")
         .then((response) => {
            setGroceries(Object.keys(response.data).map(key => ({ key, value: response.data[key] })));
            setShoppingList(groceries.map(x => ({key: x.key, value: x.value[0]})));
         })
         .catch((error) => {
            console.log(error);
            setShoppingList(null);
         });

   }, [])
   return (
      <div style={{ color: 'white' }}>
         <h1 >Recepies</h1>
         <Cart updateShoppingList={setShoppingList} listOfGroceries={groceries} shoppigList={shoppigList}/>
      </div>
   )
}
export default Recipes