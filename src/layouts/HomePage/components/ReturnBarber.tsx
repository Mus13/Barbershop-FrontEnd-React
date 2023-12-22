import React from "react"

import { Link } from "react-router-dom";
export const ReturnBarber  :React.FC<{barber:any}> = (props) => {
    return (
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
            <div className="text-center">
                <img src={require('./../../../Images/BarbersImages/barber-image.png')} width='151' height='133' alt="book"></img>
                <h6 className="mt-2">{props.barber.firstName} {props.barber.lastName}</h6>
                <p>{props.barber.description}</p>
                <Link className="btn main-color text-white" to={`/appointment/${props.barber.id}`}>Reserve</Link>
            </div>
        </div>
    );
}