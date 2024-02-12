import { Link } from "react-router-dom";

const RoutePath = (props) => {
    const {routes} = {...props};
    return (
        <div className = "route-path pb-3">
            { routes.map((item, i) => i === routes.length - 1 ? <div className="d-inline-block" key = {i}> <Link to = {item.link}>{item.name}</Link> </div> : <div className="d-inline-block" key = {i}> <Link  style={{color: "var(--darkGrey)"}} to = {item.link}>{item.name}</Link>&nbsp;&gt;&nbsp;</div> ) }
        </div>
    )
}


export default RoutePath