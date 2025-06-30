export interface UserProps {
  _id: string;
  name?: string;
  email: string;
  avatarUrl: string;
  password: string;
  trips?: any;
}

export interface UserState {
  user: UserProps | null;
  setUser: (user: UserProps) => void;
  clearUser: () => void;
}

export interface TripsState {
  trips: TripProps[] | [];
  setTrips: (trips: TripProps[]) => void;
  clearTrips: () => void;
  addTrip: (trip: TripProps) => void;
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
  transport: {
    startPoint: string;
    endPoint: string;
    price: string;
    typeOfTransport: "airplane" | "car" | "bus" | "train" | "other";
  };
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

export type TripFormState = {
  title: string;
  description?: string;
  startDateTrip: string;
  endDateTrip: string;
  destination: {
    city?: string;
    country?: string;
  };
  accomodation: {
    _id: string;
    name: string;
    address: string;
    checkIn: {
      date: string;
      time: string;
    };
    checkOut: {
      date: string;
      time: string;
    };
    bookingReference?: string;
    type?: "hotel" | "hostel" | "airbnb" | "camping" | "other";
    urlToBooking: string;
    contact?: string;
    notes?: string;
  };
  transport: {
    typeOfTransport: "airplane" | "car" | "bus" | "train" | "other";
    startPoint: string;
    endPoint: string;
    price: string;
  };
  participants: Participant[];
  createdBy: Participant;
  isPublic: boolean;
  status: "planned" | "ongoing" | "completed" | "cancelled";
  coverImageUrl?: string;
  galleryUrls?: string[];
  tags?: string[];
};
