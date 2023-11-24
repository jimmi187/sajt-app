
import { useEffect, useState } from "react";
import axios from "axios";
import { generatePath } from "react-router-dom";



function Ctgry({ ct, sList }) {
   
   return (
      <div>
         <p>{ct}</p>
         {sList && sList.filter(x => x.category === ct)}
      </div>
   );
}

function Recipes(params) {
   const [groceries, setGroceries] = useState([]);
   const [shoppigList, setShoppingList] = useState(null);

   useEffect(() => {
      //files
      axios.get("https://zovinableju.ddns.net/api/yo")
         .then((response) => {
            const groceriesData = Object.keys(response.data).flatMap(x => response.data[x].map(c =>({category: x, name: c.name, price: c.price, store: c.store})));
            setGroceries(groceriesData);
         })
         .catch(() => {
            axios.get("http://localhost:4444/yo")
               .then((response) => {
                  const groceriesData = Object.keys(response.data).flatMap(x => response.data[x].map(c =>({category: x, name: c.name, price: c.price, store: c.store})));
                  setGroceries(groceriesData);
                  console.log(groceries);
               })
               .catch((error) => {
                  console.log(error);
               });
         });

   }, [])

   return (
      <div style={{ color: 'white' }}>
         <h1 >Recepies</h1>
         <div>{[...new Set(groceries.map(x => x.category))].map(x => <Ctgry ct={x} sList={shoppigList}/>)}</div>
      </div>
   )
}
export default Recipes