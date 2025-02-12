import {Card} from "@mui/material";

type Booking = {
    id: number;
    name?: string;
    time?: number;
    place?: string | GeolocationCoordinates
}

const Booking = ({}:Booking) => {

    return (
        <Card></Card>
    )

}
export default Booking;



