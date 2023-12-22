import { ExploreTopBarbers } from './components/ExploreTopBarbers';
import { Carousel } from './components/Carousel';
import { Heros } from './components/Heros';
import { BarbershopServices } from './components/BarbershopServices';
export const HomePage = () => {
    return(
        <>
            <ExploreTopBarbers/>
            <Carousel/>
            <Heros/>
            <BarbershopServices/>
        </>
    );
}