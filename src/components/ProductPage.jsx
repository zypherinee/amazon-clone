import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ProductDetails } from "./";
import { getGBCurrency } from "../utils/constant";
import { addToCart } from "../redux/cartSlice";

import { callAPI } from "../utils/CallApi";

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState("1");
    const dispatch = useDispatch();

    const getProduct = () => {
      callAPI(`data/products.json`)
      .then((productResults) => {
       setProduct(productResults[id]);
      });
    }

    const addQuantitytoProduct = () => {
      setProduct(product.quantity = quantity);
      return product;
    };
    
    
    useEffect(() =>{
         getProduct();
    }, []);

    if(!product?.title) return <h1>Loading Product ...</h1>

  return ( product &&
    <div className="h-screen bg-amazonclone-background">
        <div className="min-w-[1000px] max-w-[1500px] m-auto p-4">
        <div className="grid grid-cols-10 gap-2">
            {/* left */}
            <div className="col-span-3 p-8 bg-white m-auto">
                 <img src={`${product.image}`}/>
            </div>
            {/*middle */}
            <div className="col-span-5 p-4 bg-white divide-y divide-gray-400">
                <div className="mb-3">
                <ProductDetails product={product} ratings={true}/>
                </div>
                <div className="text-base xl:text-lg mt-3">
                    {product.description}
                </div>
            </div>
            {/*right */}
            <div className="col-span-2 p-4 rounded bg-white">
            <div className="text-xl xl:text-2xl text-red-700 font-semibold">{getGBCurrency().format(product.price)}</div>
                <div className="text-base xl:text-lg text-gray-500 text-right font-semibold">RRP:<span className="line-through">{getGBCurrency().format(product.oldPrice)}</span></div>
                <div className="text-sm xl:text-base text-blue-500 text-right font-semibold mt-3">FREE Returns</div>
                <div className="text-sm xl:text-base text-blue-500 text-right font-semibold mt-1">FREE Delivery</div>
                <div className="text-base xl:text-lg text-green-700 text-right font-semibold mt-1">In Stock</div>
                <div className="text-base xl:text-lg mt-1">Quantity:
                    <select onClick={(e) => setQuantity(e.target.value)} className="p-2 bg-white border rounded-md focus:border-indigo-600">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    </select>
                </div>
                <Link to={"/checkout"}>
                <button onClick={() => dispatch(addToCart(addQuantitytoProduct()))} className="bg-yellow-400 w-full p-3 text-xs xl:text-sm rounded hover:bg-yellow-500 mt-3">Add to Cart</button>
                </Link>
            </div>
            </div>
        </div>
    </div>
  )
}

export default ProductPage;
