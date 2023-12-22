class BarberModel {

    id:number;
    firstName:string;
    lastName:string;
    description:string;

    constructor (   id:number,
                    firstName:string,
                    lastName:string,
                    description:string){
        this.id=id;
        this.firstName=firstName;
        this.lastName=lastName;
        this.description=description;
    }
} export default BarberModel;