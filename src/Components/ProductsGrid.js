import Product from "./Product"

const ProductsGrid = ({products}) => {
    return (
        <div className="flex-grow-1 d-flex flex-wrap gap-2">
            {products.map((item, i) => <Product key = {i} name = {item.name} src={item.images[0].thumbnail_url ?? ""} price = {item.list_price} originalPrice = {item.original_price} avgRating = {item.rating_average} quantity = {item.quantity_sold} />)}
        </div>
    )
}

export default ProductsGrid