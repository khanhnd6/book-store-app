import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = (props) => {
    return (
        <>
            <Navbar keyword = {props.keyword} setKeyword = {props.setKeyword} cart={props.cart} />
                {props.children}
            <Footer />
        </>
    )

}


export default Layout;