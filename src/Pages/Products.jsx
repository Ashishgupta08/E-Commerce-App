import { React } from "react";
import './assets/css/product.css';
import {ProductCard, Nav } from '../Components';
// import LoadingScreen from "react-loading-screen";
import { useProducts } from "../Contexts";

export function Products() {

  const { productsState, productsDispatch } = useProducts();
  // const [loader, setLoader] = useState(false)

  return (
    <>
    {/* <LoadingScreen
          loading={loader}
          bgColor="#f1f1f1"
          spinnerColor="#9ee5f8"
          textColor="#676767"
          text="Loading... Please Wait!"
    >
    </LoadingScreen> */}
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