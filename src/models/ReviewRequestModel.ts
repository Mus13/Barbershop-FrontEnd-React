class ReviewRequestModel{
    rating:number;
    barberId:number;
    reviewDescription?:string;
    constructor(rating:number,
        barberId:number,
        reviewDescription:string
    ){
        this.rating=rating;
        this.barberId=barberId;
        this.reviewDescription=reviewDescription;
    }
} export default ReviewRequestModel;