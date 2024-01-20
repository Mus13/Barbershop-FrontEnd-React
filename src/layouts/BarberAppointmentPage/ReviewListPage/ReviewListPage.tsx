import { useEffect, useState } from "react";
import ReviewModel from "../../../models/ReviewModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Review } from "../../Utils/Review";

export const ReviewListPage = () => {

    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState("");

    const barberId = (window.location.pathname).split("/")[2];

    useEffect(() => {
        const fetchBarberReviews = async () => {
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
                setReviews(loadedReviews);
                setIsLoading(false);
        }

        fetchBarberReviews().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);

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
        <div className="container m-5">
            <div>
                <h3>Comments: {reviews.length}</h3>
            </div>
            <p>Reviews: </p>
            <div className="row">
                {
                    reviews.map(review=>(
                        <Review key={review.id} review={review}/>
                    ))
                }
            </div>
        </div>
    );
}