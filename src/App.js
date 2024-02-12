import { useState } from 'react';
import './App.css';
import Board from './Components/Board';
import Layout from './Components/Layout';
import RoutePath from './Components/RoutePath';


function App() {

  
  const [filter, setFilter] = useState(null)
  
  const [keyword, setKeyword] = useState("");

  return (
    <Layout keyword = {keyword} setKeyword = {setKeyword}>
      <div className='container px-5' >
        <RoutePath routes = {[{name: "Trang chủ", link : "/home"}, {name: "Nhà sách Tiki", link: "/nha-sach-Tiki"}]} />
        
        <Board keyword={keyword} filter={filter} setFilter={setFilter} />


      </div>
    </Layout>
  );
}

export default App;
