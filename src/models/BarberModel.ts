class BarberModel {

    id:number;
    firstName:string;
    lastName:string;
    description:string;
    fullDescription?:string;

    constructor (   id:number,
                    firstName:string,
                    lastName:string,
                    description:string,
                    fullDescription?:string){
        this.id=id;
        this.firstName=firstName;
        this.lastName=lastName;
        this.description=description;
        this.fullDescription=fullDescription;
    }
} export default BarberModel;