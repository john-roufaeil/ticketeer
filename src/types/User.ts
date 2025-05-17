import Booking from "./Booking";

type User = {
  _id: string;
  email: string;
  passwordHash: string;
  role: string;
  bookings?: Booking[];
};

export default User;
