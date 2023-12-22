import { useEffect, useState } from "react"
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Link } from "react-router-dom";
import BarberModel from "../../../models/BarberModel";
import { ReturnBarber } from "./ReturnBarber";

export const Carousel = () => {
    const [barbers, setBarbers] = useState<BarberModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchBarbers = async () => {
            const url: string = `http://localhost:8080/api/barbers/getAll`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Something went wrong!");
            }
            const responseJson = await response.json();
            const loadedBarbers: BarberModel[] = [];

            for (const key in responseJson) {
                loadedBarbers.push({
                    id: responseJson[key].id,
                    firstName: responseJson[key].firstName,
                    lastName: responseJson[key].lastName,
                    description: responseJson[key].description
                });
            }
            setBarbers(loadedBarbers);
            setIsLoading(false);
        };
        fetchBarbers().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, [])

    if (isLoading) {
        return (
            <SpinnerLoading />
        );
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        );
    }

    return (
        <div className="containet-mt-5" style={{ height: 550 }}>
            <div className="homepage-carousel-title">
                <h3>Find your barber!</h3>
            </div>
            <div id="carouselExampleControls" className="carousel carousel-dark slide mt-5 d-none d-lg-block"
                data-bs-interval="false">
                {/**Desktop */}
                <div className="carousel-inner">
                    {barbers.length > 0 && (
                        Array.from({ length: Math.ceil(barbers.length / 3) }, (v, i) => i * 3).map((startIndex, index) => (
                            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                <div className="row d-flex justify-content-center align-items-center">
                                    {barbers.slice(startIndex, startIndex + 3).map((barber, i) => (
                                        <ReturnBarber barber={barber} key={startIndex + i} />
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="d-lg-none mt-3">
                <div className="carousel-inner">
                    {barbers.map((barber, index) => (
                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                            <div className="row d-flex justify-content-center align-items-center">
                                <ReturnBarber barber={barber} key={index} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="homepage-carousel-title mt-3">
                <Link className="btn btn-outline-secondary btn-lg" to="/barbers">View more..</Link>
            </div>
        </div>

    )
}