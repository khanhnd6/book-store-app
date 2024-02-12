import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

import Rate from "./Rate"

import "./Styles/SideBar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const SideBar = function ({categories, providers, filter, setFilter }) {


    const selectCategoryHandler = (id) => {
        console.log(id)
        let newCategories = [...filter.categories];
        let target = newCategories.find(item => item.id == id)
        if(target != null){

            newCategories.forEach(element => element.isSelected = false);

            target.isSelected = !target.isSelected;
            setFilter({...filter, categories: newCategories})
        }
    
    }
    
    return (
        <div className="filter">
            <div className="filter-box">
                <h3>Danh mục sản phẩm</h3>
                <ul>
                    {categories != null &&  categories.map((item, i) => {
                        return <li onClick={()=>selectCategoryHandler(item.id)} key = {i}>{item.name}</li>
                    })}
                </ul>
            </div>

            <div className="filter-box">
                <h3>Nhà cung cấp</h3>
                <ul>
                    {providers != null && providers.map((item, i) => <li key={i}><input type="checkbox" />{item.name}</li>)}
                </ul>
            </div>

            <div className="filter-box">
                <h3>Đánh giá</h3>
                <ul>
                    <li><Rate noOfStar = {5} text = "từ 5 sao"/></li>
                    <li><Rate noOfStar = {4} text = "từ 4 sao"/></li>
                    <li><Rate noOfStar = {3} text = "từ 3 sao"/></li>
                    <li><Rate noOfStar = {2} text = "từ 2 sao"/></li>
                    <li><Rate noOfStar = {1} text = "từ 1 sao"/></li>
                </ul>
            </div>
        </div>
    )
}


export default SideBar