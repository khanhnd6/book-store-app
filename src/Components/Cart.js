import { useEffect, useState } from "react"
import { APIUrl, getData } from "../constants"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
import "./Styles/Cart.css"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"

function CartItems({cart, setCart, allProducts}) {
    const [cartItems, setCartItems] = useState([])
    
    useEffect(()=> {
        if(cart.length != 0)
            setCartItems(
                cart.map( (i) => ({details: allProducts.find( prod => prod.id == i.id), quantity: i.quantity, isChecked : false }))
            )
    }, [allProducts, cart])


    if(cart.length  == 0){
        return (
            <h2>Giỏ hàng trống</h2>
        )
    }

    const decreaseQuantity  = (id) => {
        const currIdx = cart.findIndex((item) => item.id === id);
        
        if (currIdx !== -1) {
            const updateCart = { ...cart[currIdx] };
            if(updateCart.quantity<= 1){
                return
            }
            updateCart.quantity -= 1;

            const udCart = [...cart];
            udCart[currIdx] = updateCart;


            setCart(udCart);
        }
    }

    const increaseQuantity = (id) => {
        const currIdx = cart.findIndex((item) => item.id === id);
        
        if (currIdx !== -1) {
            const updateCart = { ...cart[currIdx] };
            updateCart.quantity += 1;

            const udCart = [...cart];
            udCart[currIdx] = updateCart;


            setCart(udCart);
        }
    }

    const removeCartItem = (id) => {

        if(Array.isArray(id)){
            const filteredCartItem = [...cart].filter((i)=> !id.includes(i.id))
            setCart(filteredCartItem)
        } else if(typeof(id) == 'number') {
            const idx = cart.findIndex(item => item.id == id)
            if(idx != -1){
                const udCartItems = [...cart]
                setCart(udCartItems.splice(idx, 1))
            }
        }
    }


    const handleRemoveSelectedItems = () => {
        const filteredCartItems = [...cartItems].filter(i=>i.isChecked).map(i=> i.details.id)
        removeCartItem(filteredCartItems);
    }

    
    const handleRemoveItemById = (id) => {
        
        const target = [...cart].findIndex(item => item.id == id)
        
        const updatedCart = [...cart]
        updatedCart.splice(target, 1)
        
        console.log(updatedCart)
        setCart(updatedCart)
    }


    return (

        <>

            <div className="cart-custom">
                <div className="cart-header bg-white p-3 position-relative">
                    <div>
                        <input type="checkbox" checked = {!cartItems.find(i=> !i.isChecked)} onClick={(e)=>setCartItems(cartItems.map(item=> ({...item, isChecked: e.target.checked})))} />
                        Tất cả ({cart.length} sản phẩm)
                    </div>  
                    <div className="btn me-3 border-0" onClick={handleRemoveSelectedItems} style={{position: "absolute", top: "50%", right: 0, transform: "translateY(-50%)"}} >
                        <FontAwesomeIcon icon={faTrashCan} />
                    </div>

                </div>
                <div className="cart-body">
                    { cartItems.length != 0 && cartItems.map((item,idx) => {
                            return (
                            
                                <div key={idx} className="d-flex flex-row align-items-center bg-white p-3 my-2 pe-5 position-relative">

                                    <div className="btn me-3 border-0" onClick={()=> handleRemoveItemById(item.details?.id)} style={{position: "absolute", top: "50%", right: 0, transform: "translateY(-50%)"}} >
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </div>

                                    <div>
                                        <input 
                                            checked={item.isChecked}
                                            type="checkbox" 
                                            onChange={(e)=>{
                                                if(cartItems.length != 0){
                                                    let tempCartItems = [...cartItems];
                                                    tempCartItems[idx].isChecked = e.target.checked
                                                    setCartItems(tempCartItems)
                                                }
                                            }} 
                                        />
                                    </div>

                                    <div className="d-flex flex-row align-items-center">
                                        <img className="cart-item-thumb"  src={item.details?.images[0]?.small_url} />
                                        
                                    </div>

                                    <div className="d-flex flex-column flex-md-row algin-items-center justify-content-between pe-2 w-100">
                                        <div style={{width: "200px"}}>
                                            <p>{item.details?.name}</p>
                                        </div>

                                        <div style={{fontWeight: "bold", fontSize: "15px"}}>{item.details?.list_price.toLocaleString()}<sup>&#273;</sup></div>

                                        <div className="quantity-btns">
                                            <div className={(item.quantity != 1 ? "btn quantity-btn " : "btn quantity-btn quantity-btn-disable")} onClick={(e)=> decreaseQuantity(item.details.id)}><FontAwesomeIcon icon={faMinus}/></div>
                                            <div className="btn quantity ">
                                                <input 
                                                    className="quantity-input"
                                                    type="number" 
                                                    value={item.quantity} 
                                                    onChange={(e)=>{ 
                                                        let val = e.target.value
                                                        if(val <= 0){

                                                        } else {
                                                            let tempCartItems = [...cartItems];
                                                            tempCartItems[idx].quantity = val
                                                            setCartItems(tempCartItems)
                                                        }
                                                    }} 
                                                /></div>
                                            <div className="btn quantity-btn" onClick={(e)=> increaseQuantity(item.details.id)}><FontAwesomeIcon icon={faPlus}/></div>
                                        </div>

                                        <div style={{color: 'red', fontWeight: "bold", fontSize: "15px"}}>{(item.quantity * item.details?.list_price).toLocaleString()}<sup>&#273;</sup></div>
                                    </div>
                                </div>
                            
                            )
                        })
                    }
                </div>

                <div className="d-flex flex-row justify-content-between bg-white px-3 py-5">
                    <span style={{fontWeight: "bold", fontSize: "16px"}}>Tổng</span>
                    <span style={{fontWeight: "bold", fontSize: "16px", color: "red"}}>{cartItems.reduce((total, curr) => { return total += curr.details?.list_price * curr.quantity }, 0).toLocaleString()}<sup>&#273;</sup></span>
                </div>
            </div>
        </>
    )
}


export default function Cart({cart, setCart, allProducts}) {
    return (
        <div className="pb-5">
            <div className="py-3 bg-white"><h1>Giỏ hàng</h1></div>
            <div className="w-100 py-4">
                <CartItems cart={cart} setCart = {setCart} allProducts = {allProducts} />
            </div>
        </div>
    )
}