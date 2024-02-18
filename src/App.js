import { useEffect, useState } from 'react';
import './App.css';
import Board from './Components/Board';
import Layout from './Components/Layout';
import RoutePath from './Components/RoutePath';
import { APIUrl, getData } from './constants';
import { Route, Routes } from 'react-router-dom';
import Details from './Components/Details';
import Cart from './Components/Cart';

const Home = ({allProducts, keyword, filter, setFilter}) => {
  return <>
      <RoutePath routes = {[{name: "Trang chủ", link : "/home"}, {name: "Nhà sách Tiki", link: "/nha-sach-Tiki"}]} />
      
      <Board allProducts={allProducts} keyword={keyword} filter={filter} setFilter={setFilter} />
    </>
}



function App() {

  const [allProducts, setAllProducts] = useState([]);
  const [filter, setFilter] = useState(null)
  
  const [keyword, setKeyword] = useState("");

  const [cart, setCart] = useState([])
  

  useEffect(()=> {
    if(allProducts.length == 0){
      getData(APIUrl).then((data)=> {
        setAllProducts(data)
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
  
      }).catch((err) => console.log(err))
    }

    if(cart.length == 0){
      let localStorage = window.localStorage.getItem("cart")
      if(!!localStorage)
        setCart(JSON.parse(localStorage))
    }
  }, [])

  useEffect(()=>{
    window.localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  return (
    <Layout keyword = {keyword} cart = {cart} setKeyword = {setKeyword}>
      <div className='container px-5' >
        <Routes>
          <Route path="/" element={<Home allProducts = {allProducts} keyword={keyword} filter = {filter} setFilter = {setFilter} />} />
          <Route path="details" >
            <Route path=':productId' element={<Details cart={cart} setCart = {setCart} />}  />
          </Route>
          <Route path='/cart' element={<Cart cart = {cart} setCart={setCart} allProducts = {allProducts} />} />
        </Routes>
      </div>
    </Layout>
  );
}

export default App;
