import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fullyStar , faStarHalfStroke } from "@fortawesome/free-solid-svg-icons"
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons"

function Rate (props) {
    let els = []

    if(props.noOfStar != 0)
        for(let i = 0 ; i < 5; i++){

            if(props.noOfStar % 1 == 0){
                els.push(<FontAwesomeIcon key={i} icon = { i < props.noOfStar ? fullyStar : emptyStar } style={{color: i < props.noOfStar ? "#FDD835" : "#B8B8B8"}} />)
            } else {
                els.push(<FontAwesomeIcon key={i} icon = { i < props.noOfStar ? fullyStar : emptyStar } style={{color: i < props.noOfStar ? "#FDD835" : "#B8B8B8"}} />)
                if(i + 1 < props.noOfStar && i+2 > props.noOfStar){            
                    els.push(<FontAwesomeIcon key={i+1} icon = {faStarHalfStroke} style={{color: "#FDD835"}} />)
                    i++
                }
            }

        }

    return (
        <div className="rate">
            {els} <span style={props.textStyles}>{props.text}</span>
        </div>
    )
}

export default Rate;
