import { useEffect, useState } from "react";
import ProductsGrid from "./ProductsGrid";
import SideBar from "./SideBar";

const Board = ({keyword, filter, setFilter}) => {
    const [products, setProducts] = useState([])

    useEffect(()=> {
        
        const data = require("../data.json")
        if(filter == null){
            let categories = [], providers = []

            data.forEach(item => {
                var itemCategory = item.categories
                var itemSeller = item.current_seller;
        
                if(categories.filter(i => i.id == itemCategory.id && i.name == itemCategory.name).length == 0){
                    categories.push({id: itemCategory.id, name: itemCategory. name, isSelected: false})
                }
        
                if(providers.filter(i => i.id == itemSeller.id && i.name == itemSeller.name).length == 0){
                    providers.push({id: itemSeller.id, name: itemSeller.name, isSelected: false })
                }
            })
    
            setFilter({categories, providers, rating: null})
            setProducts(data)
        }

        //setProducts(data.filter(item => item.name.replaceAll(" ", "").toLowerCase().includes(keyword.replaceAll(" ", "").toLowerCase())))
        

        
    }, [keyword, filter])

    console.log(filter, keyword)

    return (
        <div className="d-flex pb-5 gap-3">
            <SideBar 
                categories = {filter != null ? filter.categories : null} 
                providers = {filter != null ? filter.providers : null} 
                filter = {filter} 
                setFilter = {setFilter}
                />
            <ProductsGrid products = {products} />
        </div>
    )
}


export default Board;