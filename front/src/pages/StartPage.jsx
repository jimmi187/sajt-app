import { useState } from "react";




 
 function ProductRow({ product }) {
   const name = product.stocked ? product.name :
     <span style={{ color: 'red' }}>
       {product.name}
     </span>;
 
   return (
     <tr>
       <td>{name}</td>
       <td>{product.price}</td>
     </tr>
   );
 }
 
 function ProductTable({ products, filterText   }) {
   const rows = [];
 
   products.forEach((product) => {
      if(
         product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1
      ) return;
      
      
      rows.push(
         <ProductRow
            product={product}
            key={product.name} />
      );
   });
 
   return (
     <table>
       <thead>
         <tr>
           <th>Name</th>
           <th>Price</th>
         </tr>
       </thead>
       <tbody>{rows}</tbody>
     </table>
   );
 }
 
 function SearchBar({ filterText, onFilterTextChange  }) {
   return (
     <form>
       <input 
         type="text" 
         value={filterText} 
         onChange={(e) => onFilterTextChange(e.target.value)}
         placeholder="Search..." />
      
     </form>
   );
 }
 
 function FilterableProductTable({ products }) {
   const [filterText, setFilterText] = useState('');
   const [inStockOnly, setInStockOnly] = useState(false);

   return (
     <div>
       <SearchBar 
         filterText={filterText}
         onFilterTextChange={setFilterText}
         onInStockOnlyChange={setInStockOnly}
         />
       <ProductTable 
         products={products}
         filterText={filterText} 
         inStockOnly={inStockOnly} />
     </div>
   );
 }
 
 const PRODUCTS = [
   {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
   {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
   {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
   {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
   {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
   {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
 ];
 

export default function StartPage(params) {

  return (
   <>
      <FilterableProductTable  products={PRODUCTS}/>
   </>
  ); 
}