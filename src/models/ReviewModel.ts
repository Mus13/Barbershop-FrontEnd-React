class ReviewModel{
    id:number;
    userName:string;
    date:string;
    rating:number;
    barberId:number;
    reviewDescription:string;
    constructor(
        id:number,
        userName:string,
        date:string,
        rating:number,
        barberId:number,
        reviewDescription:string
    ){
        this.id=id;
        this.userName=userName;
        this.date=date;
        this.rating=rating;
        this.barberId=barberId;
        this.reviewDescription=reviewDescription;
    }
} export default ReviewModel;