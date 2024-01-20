import { Link } from "react-router-dom";
import BarberModel from "../../../models/BarberModel";

export const BarberCard: React.FC<{ barber: BarberModel }> = (props) => {
    return (
        <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
            <div className="row g-0">
                <div className="col-md-2">
                    <div className="d-none d-lg-block">
                        <img src={require("../../../Images/BarbersImages/barber-image.png")} width='123' height='196' alt="book" />
                    </div>
                    <div className="d-lg-none d-flex justify-content-center align-items-center">
                        <img src={require("../../../Images/BarbersImages/barber-image.png")} width='123' height='196' alt="book" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <h5 className="card-title">
                            {props.barber.firstName} {props.barber.lastName}
                        </h5>
                        <h6>
                            {props.barber.description}
                        </h6>
                        <p className="card-text">
                            {props.barber.fullDescription}
                        </p>
                    </div>
                </div>
                <div className="col-md-4 d-flex justify-content-center align-items-center">
                    <Link className="btn btn-md main-color text-white" to={`/appointment/${props.barber.id}`}>View details</Link>
                </div>
            </div>
        </div>
    )
}