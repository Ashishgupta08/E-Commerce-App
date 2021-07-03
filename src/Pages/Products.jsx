import { React } from "react";
import './assets/css/product.css';
import { useProducts } from "../Contexts";
import { Nav } from "../Components/Nav/Nav";
import { ProductCard } from "../Components/ProductCard/ProductCard";

export function Products() {

  const { productsState, productsDispatch } = useProducts();

  return (
    <>
    <div className="filters">
      <div>
        <p>Sort By Price</p>
        <label><input type="radio" name="price" onClick={()=>productsDispatch({type: "LOW_TO_HIGH"})} />Low to High</label>
        <label><input type="radio" name="price" onClick={()=>productsDispatch({type: "HIGH_TO_LOW"})} />High to Low</label>
      </div>
    </div>
    <Nav />
    <div className="product-page">
        {
          productsState.products.map(product => <ProductCard  product={product}/>)
        }
    </div>
    </>
  );
}