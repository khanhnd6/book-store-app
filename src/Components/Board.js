import { useEffect, useState } from "react";
import ProductsGrid from "./ProductsGrid";
import SideBar from "./SideBar";
import ReactPaginate from "react-paginate";


const Board = ({keyword, allProducts, filter, setFilter}) => {
    const [products, setProducts] = useState([])

    const filterHandler = (data) => {
        
        data  = data.filter(item => item.name.replaceAll(" ", "").toLowerCase().includes(keyword.replaceAll(" ", "").toLowerCase()))
        var selectedCategory = filter.categories.find(i => i.isSelected),
        selectedSellers = filter.providers.filter(i => i.isSelected),
        selectedRating = filter.rating;


        if(!!selectedCategory){
            data = data.filter(i => i.categories.id == selectedCategory.id)
        }

        if(selectedSellers.length != 0){
            selectedSellers = selectedSellers.map(i => i.id)
            data = data.filter(i => selectedSellers.includes(i.current_seller.id))
        }

        if(!!selectedRating){
            data = data.filter(i => !!i.rating_average && i.rating_average >= selectedRating)
        }

        console.log('data: ', data)

        setProducts(data)
    }


    useEffect(()=> {        
        if(allProducts.length != 0)
            filterHandler(allProducts)
    }, [keyword, filter])


    
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 12;
    const endOffset = itemOffset + itemsPerPage;
    
    const currentItems = products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;
        setItemOffset(newOffset);
    };


    console.log(filter)

    return (
        <>
            <div className="d-flex flex-column flex-md-row align-items-start pb-5 gap-3">
                <SideBar 
                    categories = {filter != null ? filter.categories : null} 
                    providers = {filter != null ? filter.providers : null} 
                    filter = {filter} 
                    setFilter = {setFilter}
                    />
                <ProductsGrid products = {currentItems} />
            </div>

            <ReactPaginate
                className="py-5 pagination"
                breakLabel="..."
                activeClassName="pagination-item-active"
                nextLabel={null}
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel={null}
                renderOnZeroPageCount={null}
            />
        </>
    )
}


export default Board;