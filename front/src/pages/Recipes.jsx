
import { useEffect, useState } from "react";
import axios from "axios";
import { generatePath } from "react-router-dom";



function OneProd({ prod }) {
   let key = prod.key;
   let x2 = prod.value;
   return (
   <>
      <h3>{key} <button> add more </button> </h3>
      <p> {x2.name}  =======  {x2.price}  ======= {x2.store.map(x => x + " ")}<button> change </button> <button> remove </button></p>

   </>)
}

function Cart({ updateShoppingList, listOfGroceries, shoppigList }) {
   return (
      <div>
         {listOfGroceries !== null ? shoppigList.map(x => <OneProd prod={x} />) : <li>no data</li>}
      </div>
   );
}



function Recipes(params) {
   const [groceries, setGroceries] = useState([]);
   const [shoppigList, setShoppingList] = useState([]);


   useEffect(() => {
      //files
      axios.get("http://zovinableju.ddns.net:4444/yo") 
         .then((response) => {
            const groceriesData = Object.keys(response.data).map(key => ({ key, value: response.data[key] }));
            setGroceries(groceriesData);
            setShoppingList(groceriesData.map(x => ({ key: x.key, value: x.value[0] })));
         })

         .catch((error) => {
            console.log(error);
            setShoppingList(null);
         });

   }, [])

  
   return (
      <div style={{ color: 'white' }}>
         <h1 >Recepies</h1>
         <Cart updateShoppingList={setShoppingList} listOfGroceries={groceries} shoppigList={shoppigList} />
      </div>
   )
}
export default Recipes