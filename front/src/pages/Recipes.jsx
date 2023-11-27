
import { useEffect, useState } from "react";
import axios from "axios";

function Notification({ prod, oh }) {
   const [opacity, setOpacity] = useState(1);

   useEffect(() => {
      const intervalId = setInterval(() => { setOpacity((prevOpacity) => prevOpacity - 0.1); }, 50);
      return () => (intervalId);
   }, []);
   // const handleTransitionEnd = () => {
   //    console.log('Transition complete, unmounting component');
   //    oh([false, '']);
   // };
   return (
      <div className={`notification`} style={{ opacity }} > {/*onTransitionEnd={handleTransitionEnd} >*/}
         <h5>You just added to cart {prod[1]}</h5>
      </div>
   );
}

function Modal({ cate, sModal, gr, sList, ssList }) {
   const [not, setNot] = useState([false]);

   return (
      <div style={{ position: 'absolute', width: '500px', backgroundColor: 'gray', left: "50%", transform: 'translateX(-50%)', top: "8rem" }}>
         <h1>This is a modal</h1>
         <button onClick={() => sModal(false)}>done</button>
         <h2>This is category: {cate}</h2>
         {gr.filter(x => x.category === cate).map(x1 => <p>{x1.name} {x1.price}<button onClick={() => { ssList([...sList, x1]); 
            setNot((prevNot) => { const updatedNot = [false, '']; setTimeout(() => setNot([true, x1.name]), 0); return updatedNot; }); }}>add</button></p>)}
         {not[0] && <Notification prod={not} oh={setNot} />}
      </div>
   )
}

function Ctgry({ ct, gr, sList, ssList }) {
   const [openModal, setOpenModal] = useState(false);
   return (
      <div>
         <p>{ct} <button onClick={() => setOpenModal(true)}>add</button></p>
         {sList && sList.filter(x => x.category === ct).map(x => <p key={x.name}>{x.name} {x.price}</p>)}
         {openModal && <Modal cate={ct} sModal={setOpenModal} gr={gr} ssList={ssList} sList={sList} />}
      </div>
   );
}

function Recipes(params) {
   const [groceries, setGroceries] = useState([]);
   const [shoppigList, setShoppingList] = useState([]);

   useEffect(() => {
      //files
      axios.get("https://zovinableju.ddns.net/api/yo")
         .then((response) => {
            const groceriesData = Object.keys(response.data).flatMap(x => response.data[x].map(c => ({ category: x, name: c.name, price: c.price, store: c.store })));
            setGroceries(groceriesData);
         })
         .catch(() => {
            axios.get("http://localhost:4444/yo")
               .then((response) => {
                  const groceriesData = Object.keys(response.data).flatMap(x => response.data[x].map(c => ({ category: x, name: c.name, price: c.price, store: c.store })));
                  setGroceries(groceriesData);
                  console.log(groceriesData);
               })
               .catch((error) => {
                  console.log(error);
               });
         });

   }, [])

   // console.log("ovoo je " + shoppigList);
   return (
      <div style={{ color: 'white' }}>
         <h1 >Recepies</h1>
         <div>{[...new Set(groceries.map(x => x.category))]
            .map(x => <Ctgry
               ct={x}
               gr={groceries}
               sList={shoppigList}
               ssList={setShoppingList}
            />)}</div>

      </div>
   )
}
export default Recipes