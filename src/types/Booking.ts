import Event from "./Event";

type Booking = {
  _id: string;
  eventId: string | Event;
  userId: string;
};

export default Booking;
