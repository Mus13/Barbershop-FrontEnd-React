import { useEffect, useState } from "react"
import BarberModel from "../../models/BarberModel"
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarsReview } from "../Utils/StarsReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import ReviewModel from "../../models/ReviewModel";
import { LatestReviews } from "./LatestReviews";

export const BarberAppointmentPage = () => {
    const [barber,setBarber]=useState<BarberModel>();
    const [isLoadingBook,setIsLoadingBook]=useState(true);
    const [httpError,setHttpError]=useState(null);

    //Review state
    const [reviews,setReviews]=useState<ReviewModel[]>([]);
    const [totalStars,setTotalStars]=useState(0);
    const [isLoadingReview,setIsLoadingReview]=useState(true);
    const [displayError, setDisplayError] = useState(false);


    const barberId = (window.location.pathname).split('/')[2];

    useEffect(()=>{
        const fetchBarber = async () => {
            const baseUrl:string=`http://localhost:8080/api/barbers/barber/${barberId}`;
            const response = await fetch(baseUrl);
            if (!response.ok) {
                throw new Error("Something went wrong!");
            }
            const responseJson= await response.json();
            const loadedBarber:BarberModel={
                id: responseJson.id,
                firstName: responseJson.firstName,
                lastName: responseJson.lastName,
                description: responseJson.description,
                fullDescription: responseJson.fullDescription,
            };

            setBarber(loadedBarber);
            setIsLoadingBook(false);
        };
        fetchBarber().catch((error:any)=>{
            setIsLoadingBook(false);
            setHttpError(error.message);
        });
    },[]);

    useEffect(()=>{
            const fetchBarberReview= async ()=>{
                const reviewUrl:string=`http://localhost:8080/api/reviews/barber/${barberId}`;
                const responseReview= await fetch(reviewUrl);
                if (!responseReview.ok) {
                    throw new Error("Something went wrong");
                }
                const responseData= await responseReview.json();
                const loadedReviews:ReviewModel[]=[];
                let weightedStartReviews:number=0;
                for(const key in responseData){
                    loadedReviews.push({
                        id:responseData[key].id,
                        userName:responseData[key].userName,
                        date:responseData[key].date,
                        reviewDescription:responseData[key].reviewDescription,
                        rating:responseData[key].rating,
                        barberId:responseData[key].barberId
                    });
                    weightedStartReviews+=responseData[key].rating;
                }
                if (loadedReviews) {
                    const round = (Math.round((weightedStartReviews/loadedReviews.length)*2)/2).toFixed(1);
                    setTotalStars(Number(round));
                }
                setReviews(loadedReviews);
                setIsLoadingReview(false);
            }

            fetchBarberReview().catch((error:any)=>{
                setIsLoadingReview(false);
                setHttpError(error.message);
            })
        },[]);

    if (isLoadingBook || isLoadingReview) {
        return(
            <SpinnerLoading/>
        );
    }

    if (httpError) {
        return(
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        );
    }

    

    return(
        <div>
            <div className="container d-none d-lg-block">
                {
                    displayError &&
                    <div className="alert alert-danger mt-3" role="alert">
                        You already have an appointment.
                    </div>
                }
                <div className="row mt-5">
                    <div className="col-sm-2 col-md-2">
                    <img src={require("./../../Images/BarbersImages/barber-image.png")} width="226" height="349" alt="barber"/>
                    </div>
                    <div className="col-4 col-md-4 container">
                        <div className="ml-2">
                            <h2>
                                {barber?.firstName} {barber?.lastName}
                            </h2>
                            <h5 className="text-primary">
                                {barber?.description}
                            </h5>
                            <p className="lead">
                                {barber?.fullDescription}
                            </p>
                            <StarsReview rating={totalStars} size={32}/>
                        </div>
                    </div>
                    <CheckoutAndReviewBox />
                </div>
                <hr/>
                <LatestReviews reviews={reviews} barberId={barber?.id} mobile={false}/>
            </div>
            <div className="container d-lg-none mt-5">
                {
                    displayError &&
                    <div className="alert alert-danger mt-3" role="alert">
                        You already have an appointment.
                    </div>
                }
                <div className="d-flex justify-content-center align-items-center">
                <img src={require("./../../Images/BarbersImages/barber-image.png")} width="226" height="349" alt="barber"/>
                </div>
                <div className="mt-4">
                    <div className="ml-2">
                        <h2>{barber?.firstName} {barber?.lastName}</h2>
                        <h5 className="text-primary">
                            {barber?.description}
                        </h5>
                        <p className="lead">
                            {barber?.fullDescription}
                        </p>
                        <StarsReview rating={totalStars} size={32}/>
                    </div>
                </div>
                <CheckoutAndReviewBox />
                <hr/>
                <LatestReviews reviews={reviews} barberId={barber?.id} mobile={true}/>
            </div>
        </div>
    )
}