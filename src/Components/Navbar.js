import { NavLink } from "react-router-dom"
import logo from "../Assets/Images/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faHouse, faFaceSmileWink, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import "./Styles/Navbar.css"
import { useRef } from "react"


const SearchBar = ({keyword, setKeyword}) => {
    const searchRef = useRef(0);
    const searchHandler = () => {
        setKeyword(searchRef.current?.value)
    }
    return (
        <div className="search-bar input-group px-2 d-flex ">
            <div style={{height: "30px", width:  "30px", lineHeight: "30px", textAlign: "center"}}>
                <FontAwesomeIcon size="md" style={{color: "var(--darkGrey)"}} icon= {faMagnifyingGlass} />
            </div>
            <div className="form-outline flex-grow-1" style={{width: "0%"}}>
                <input 
                    type="search" 
                    placeholder = "Freeship đến 30K" 
                    className="form-control border-0" 
                    ref={searchRef}
                    style={{outline: "none", border: "none", boxShadow: "none", height: "100%", padding: 0}} 
                />
            </div>
            <button onClick={searchHandler}  type="button" className="btn search-btn">Tìm kiếm</button>
        </div>
    )

}

const Navbar = ({keyword, setKeyword, cart}) => {
    return (
       <header className="header">
            <div className="container">
                <ul className="d-flex align-items-center">
                    <li className="bg-white"><NavLink to="/" > <img style={{height: "50px"}} alt = "logo" src= {logo} /> </NavLink></li>
                    <li className="flex-grow-1 px-2 px-md-4">
                        <SearchBar keyword = {keyword} setKeyword = {setKeyword} />
                    </li>
                    <li>
                        <ul className="d-flex user-menu">
                            <li><NavLink to="/home" style={{color: "var(--darkGrey)"}} ><FontAwesomeIcon style={{paddingRight: "4px"}} icon={faHouse} />Trang chủ</NavLink></li>
                            <li><NavLink to="/account" style={{color: "var(--darkGrey)"}} ><FontAwesomeIcon style={{paddingRight: "4px"}} icon={faFaceSmileWink} />Tài khoản</NavLink></li>
                            <li className="cart">
                                <NavLink style={{position: "relative"}} to="/cart" ><FontAwesomeIcon icon={faCartShopping} /> <span style={{position: "absolute", top: "-30%", right: "4%", display: "block", background: "red", color: "white", fontSize: "8px", width: "12px", height: "12px", textAlign: "center", borderRadius: "50%"}}>{cart.length}</span> </NavLink>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
       </header>
    )

}

export default Navbar