export interface UserProps {
  _id: string;
  name?: string;
  email: string;
  avatarUrl:string;
  password: string;
  trips?: any;
}

export interface UserState {
  user: UserProps | null;
  setUser: (user: UserProps) => void;
  clearUser: () => void;
}

export interface TripsState {
  trips: TripProps[] | null;
  setTrips: (trips: TripProps[]) => void;
  clearTrips: () => void;
}

export interface AlertProps {
  alertMessage: string;
  alertType: TypeAlertProps;
  alertPosition: string;
}

export type TypeAlertProps = "alert-warning" | "alert-info" | "alert-error";

interface Destination {
  city?: string;
  country?: string;
}

interface Accommodation {
  _id: string;
  name: string;
  address: string;
  checkIn: {
    date: Date;
    time: TimeRanges;
  };
  checkOut: {
    date: Date;
    time: TimeRanges;
  };
  bookingReference?: string;
  type?: "hotel" | "hostel" | "airbnb" | "camping" | "other";
  urlToBooking: string;
  contact?: string;
  notes?: string;
}

export interface Participant {
  userId: string;
  name: string;
  email?: string;
  avatarUrl?: string;
}

export interface TripProps extends Document {
  _id: string;
  title: string;
  description?: string;
  startDateTrip: string;
  endDateTrip: string;
  destination: Destination;
  participants: Participant[];
  accomodation: Accommodation;
  createdBy: {
    userId: string;
    name: string;
    email?: string;
  };
  isPublic: boolean;
  status: "planned" | "ongoing" | "completed" | "cancelled";
  coverImageUrl?: string;
  galleryUrls?: string[];
  tags?: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
