import { useState } from "react";
import Product from "./Product"
import ReactPaginate from "react-paginate";

const ProductsGrid = ({products}) => {



    return (
        <div>
            <div className="flex-grow-1 d-flex flex-wrap gap-2">
                {products.map((item, i) => 
                    <Product 
                        key = {i} 
                        id={item.id}
                        name = {item.name} 
                        src={item.images[0].thumbnail_url ?? ""} 
                        price = {item.list_price} originalPrice = {item.original_price} 
                        avgRating = {item.rating_average} quantity = {item.quantity_sold} 
                        />)}
            </div>
        </div>
    )
}

export default ProductsGrid