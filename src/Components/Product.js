import { Link } from "react-router-dom";
import Rate from "./Rate";

import "./Styles/Product.css"

const Product = (props) => {
    
    const {name, src, price, originalPrice, avgRating, quantity, id } = {...props}

    return (
        <div className="product">
            <div className="thumb">
                <img src={src} alt ="" />
            </div>
            <div className="details">
                <div className="name">
                    <Link to={`/details/${id}`} >{name}</Link>
                    <Rate noOfStar = {avgRating} textStyles = {{color: "var(--darkGrey)"}} text = {quantity != undefined ? " | "+ quantity.text : ""} />
                </div>
                <div className="price">
                    <p className="price-text">{price.toLocaleString()}<sup style={{fontSize:"10px"}}>&#8363;</sup> {originalPrice != price ? <span>{((originalPrice - price)/originalPrice).toPrecision(0)}%</span> : <></>}</p>
                </div>
            </div>
            <div className="product-footer">
                <p>Giao siêu tốc 2h</p>
            </div>
        </div>
    )
}

export default Product;