import { useEffect, useState } from "react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { BarberCard } from "./components/BarberCard";
import BarberModel from "../../models/BarberModel";

export const ListBarbersPage = () => {
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
                    description: responseJson[key].description,
                    fullDescription: responseJson[key].fullDescription
                });
            }
            setBarbers(loadedBarbers);
            setIsLoading(false);
        };
        fetchBarbers().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
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
        <div className="container">
            <div>
                {
                    barbers.map(barber => (
                        <BarberCard barber={barber} key={barber.id} />
                    ))
                }
            </div>
        </div>
    );
}