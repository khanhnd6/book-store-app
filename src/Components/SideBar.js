import { faChevronDown, faFilter } from "@fortawesome/free-solid-svg-icons"

import Rate from "./Rate"

import "./Styles/SideBar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useLayoutEffect, useState } from "react"

const SideBar = function ({categories, providers, filter, setFilter }) {


    const [isShown, setIsShown] = useState(false);

    useLayoutEffect(()=> {
        const handleResizeScreen = () => {
            let width = window.innerWidth;
            if(width > 768){
                setIsShown(true)
            } else {
                setIsShown(false)
            }
        }

        handleResizeScreen()

        window.addEventListener("resize", handleResizeScreen)

        return () => {
            window.removeEventListener("resize", handleResizeScreen)
        }
    }, [])

    const selectCategoryHandler = (id) => {
        let newCategories = [...filter.categories];
        let target = newCategories.find(item => item.id == id)
        if(target != null){
            let oldVal = target.isSelected
            newCategories.forEach(element => element.isSelected = false)
            if(!oldVal){
                target.isSelected = true;
            }
            setFilter({...filter, categories: newCategories})
        }
    
    }


    const selectProviderHandler = (id) => {
        let newSellers = [...filter.providers];
        let target = newSellers.find(item => item.id == id)
        if(target != null){
            target.isSelected = !target.isSelected;
            setFilter({...filter, providers: newSellers})
        }
    }

    const clickRatingHandler = (rating) => {
        if(filter.rating == null || filter.rating != rating){
            setFilter({...filter, rating: rating})
        } else {
            setFilter({...filter, rating: null})
        }
    }

    
    return (
        <div className="bg-white  sidebar-container" style={{ padding: " 16px 20px" }}>
            <div className="d-md-none bg-white pb-1 btn border-0 px-0" onClick={()=> setIsShown(!isShown)}>
                <FontAwesomeIcon icon ={faFilter} />
                &nbsp;Lọc
            </div>
            { isShown && <div className="filter">
                <div className="filter-box">
                    <h3>Danh mục sản phẩm</h3>
                    <ul>
                        {categories != null &&  categories.map((item, i) => {
                            return <li onClick={()=>selectCategoryHandler(item.id)} className={item.isSelected ? "selected" : ""} key = {i}>{item.name}</li>
                        })}
                    </ul>
                </div>

                <div className="filter-box">
                    <h3>Nhà cung cấp</h3>
                    <ul>
                        {providers != null && providers.map((item, i) => <li key={i}><input checked={item.isSelected} onChange={()=> selectProviderHandler(item.id)} type="checkbox" />{item.name}</li>)}
                    </ul>
                </div>

                <div className="filter-box">
                    <h3>Đánh giá</h3>
                    <ul>
                        <li className={!!filter && !!filter.rating && filter.rating == 5 ? "selected" : ""} onClick={()=>clickRatingHandler(5)} ><Rate noOfStar = {5} text = "từ 5 sao"/></li>
                        <li className={!!filter && !!filter.rating && filter.rating == 4 ? "selected" : ""} onClick={()=>clickRatingHandler(4)} ><Rate noOfStar = {4} text = "từ 4 sao"/></li>
                        <li className={!!filter && !!filter.rating && filter.rating == 3 ? "selected" : ""} onClick={()=>clickRatingHandler(3)} ><Rate noOfStar = {3} text = "từ 3 sao"/></li>
                        <li className={!!filter && !!filter.rating && filter.rating == 2 ? "selected" : ""} onClick={()=>clickRatingHandler(2)} ><Rate noOfStar = {2} text = "từ 2 sao"/></li>
                        <li className={!!filter && !!filter.rating && filter.rating == 1 ? "selected" : ""} onClick={()=>clickRatingHandler(1)} ><Rate noOfStar = {1} text = "từ 1 sao"/></li>
                    </ul>
                </div>
            </div>}
        </div>
    )
}


export default SideBar