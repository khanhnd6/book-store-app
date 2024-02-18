import { useEffect, useState } from "react"
import { json, useParams } from "react-router-dom"
import { getData, APIUrl, scrollTop } from "../constants"
import Rate from "./Rate"
import "./Styles/Details.css"

import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const Images = ({imgUrls}) => {

    const [imgIdx, setImgIdx] = useState(0)

    if(!imgUrls || imgUrls.length == 0)
        return <></>


    return (
        <div>
            <>
                {
                    imgUrls.map((item, i) => <img key={i} className={imgIdx == i ? "details-thumb" : "d-none"} src={item.thumbnail_url} />)
                }
            </>
            <div className="thumbs d-flex flex-wrap py-2 gap-1">
                {
                    imgUrls.map((item, i) => <div onClick={()=> {setImgIdx(i)}} className={"details-imgs" + (i == imgIdx ? " selected" : "")} key={i} > <img src={item.thumbnail_url} /> </div>)
                }
            </div>
        </div>
    )
}

const DetailSideBar = ({details}) => {
    return (
        <div className="col-12 col-sm-3 bg-white p-2 h-100  mb-3 mb-sm-0">
            <Images imgUrls = {details.images} />
            <div>
                Xem thêm: Tóm tắt nội dung sách
            </div>
        </div>
    )
}

const DetailsContent = ({details}) => {

    let authors = null;
    if(!!details.authors && details.authors.length != 0){
        authors = details.authors.reduce((curr, item) => curr + item.name +  ",", "")
        authors = authors.substr(0, authors.length-1)
    }

    let infoItem = details.specifications?.find(i => i.name === 'Thông tin chung').attributes

    return (
        <div className="col-12 col-sm-6 px-0 px-sm-2 mb-3 mb-sm-0">
            <div className="bg-white py-4 px-2">
                {!!authors && 
                    <div>
                        Tác giả {authors}
                    </div>
                }

                <div className="pb-3">
                    <div>
                        <h1 style={{fontSize: "18px"}}>{details.name}</h1>
                        { !! details.rating_average && <div className="d-flex"><span className="pe-2">{details.rating_average}</span> <Rate noOfStar={Math.ceil(details.rating_average * 2)/2} textStyles = {{paddingLeft: "10px"}} text = {" | " + details.quantity_sold.text}/> </div>}
                    </div>
                    <div>
                        <p style={{fontSize: "20px", fontWeight: "500"}}>{details.list_price?.toLocaleString()}<sup style={{fontSize:"10px"}}>&#8363;</sup> {details.list_price != details.original_price ? <span>{((details.original_price - details.list_price)/details.original_price).toPrecision(0)}%</span> : <></>}</p>
                    </div>
                </div>

                <div>
                    <table className="info-table">
                        <thead>
                            <tr>
                                <th>Thông tin chi tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!!infoItem && infoItem.map((item, i) => <tr key={i}><td>{item.name}</td><td dangerouslySetInnerHTML={{ __html: item.value }}></td></tr>)}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-3 py-4 px-2 bg-white">
                <h6>Mô tả sản phẩm</h6>
                <div className="description" dangerouslySetInnerHTML={{ __html: details.description }}>
                </div>
            </div>
        </div>
    )
}

const DetailsCheckout = ({details, setCart, cart}) => {

    const minusHanler = () => {
        if(quantity != 1)
            setQuantity(quantity-1)
    }
    const plusHandler = () => setQuantity(quantity + 1)

    const [quantity, setQuantity] = useState(1);

    const addToCart = () => {
        let targetItem = cart.find(i => i.id == details.id)
        if(!!targetItem){
            targetItem.quantity += quantity
            targetItem.modifyTime = new Date().getTime();
        } else {
            setCart([...cart, {id: details.id, quantity, modifyTime: new Date().getTime()}])
        }
        console.log(cart)
    }   

    return (
        <div className="col-12 col-sm-3 py-4 px-2 bg-white h-100">
            <div className="pb-2">
                <h6>Số lượng</h6>
                <div className="interactive-btns pb-3">
                    <div className={"btn interactive-btn " + (quantity == 1 ? "btn-disable": "")  } onClick={minusHanler}>
                        <FontAwesomeIcon icon={faMinus}/>
                    </div>
                    <div className="btn quantity ">
                        <input 
                            type="number" 
                            className="quantity-input"
                            value={quantity} 
                            onChange={(e)=> {
                                let val = e.target.value;
                                if(val <= 0) {

                                } else {
                                    setQuantity(val)
                                }
                            }} 
                        />
                    </div>
                    <div className={"btn interactive-btn "} onClick={plusHandler}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </div>
                </div>
                <h6 style={{fontSize: '15px', fontWeight: "500"}}>Tạm tính</h6>
                <p style={{fontSize: '20px', fontWeight: "600"}}>{details.list_price?.toLocaleString()}<sup>đ</sup></p>
            </div> 
            <div className="d-flex buying-btns flex-column">
                <div className="btn btn-red">Mua ngay</div>
                <div className="btn" onClick={addToCart}>Thêm vào giỏ</div>
                <div className="btn">Mua trước trả sau</div>
            </div>
        </div>
    )
}

const Details = (props) => {

    let {productId} = useParams()

    const [details, setDetails] = useState({})

    useEffect(()=> {
        getData(APIUrl + "/" + productId)
            .then(res=> {
                setDetails(res)
                scrollTop()
            })
            .catch(err => console.log(err))
    }, [])

    console.log(details)
    return (
        <div className="row mt-2 mb-3">
           <DetailSideBar details={details} />
           <DetailsContent details={details} />
           <DetailsCheckout setCart= {props.setCart} cart = {props.cart} details={details} />
        </div>
    )
}


export default Details