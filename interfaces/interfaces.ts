export interface UserProps {
  _id: string;
  name?: string;
  email: string;
  password: string;
  image?:string;
  trips?: any;
}

export interface UserState {
  user: UserProps | null;
  setUser: (user: UserProps) => void;
  clearUser: () => void;
}

export interface AlertProps {
  alertMessage:string,
  alertType:TypeAlertProps,
}

export type TypeAlertProps = 'alert-warning' | 'alert-info' | 'alert-error';


interface Coordinates {
  lat: number;
  lng: number;
}

interface Destination {
  city?: string;
  country?: string;
  address?: string;
  coordinates?: Coordinates;
}

interface Transport {
  mode: 'flight' | 'train' | 'car' | 'bus' | 'boat' | 'other';
  provider?: string;
  bookingReference?: string;
  departureTime?: string;
  arrivalTime?: string;
  from?: string;
  to?: string;
  notes?: string;
}

interface Accommodation {
  name: string;
  address: string;
  checkIn: string;
  checkOut: string;
  bookingReference?: string;
  type?: 'hotel' | 'hostel' | 'airbnb' | 'camping' | 'other';
  contact?: string;
  notes?: string;
}

interface Participant {
  userId: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  role: 'admin' | 'member' | 'viewer';
  status: 'invited' | 'joined' | 'declined';
}

interface ItineraryItem {
  time?: string;
  title: string;
  description?: string;
  location?: string;
  imageUrl?: string;
  cost?: number;
}

interface ItineraryDay {
  date: string;
  activities: ItineraryItem[];
}

interface BudgetBreakdown {
  category: 'transport' | 'accommodation' | 'food' | 'activity' | 'misc';
  estimate: number;
  spent?: number;
}

interface Budget {
  totalEstimate?: number;
  actualSpent?: number;
  currency: string;
  breakdown?: BudgetBreakdown[];
}

export interface TripProps extends Document {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  destination: Destination;
  transport: Transport[];
  accommodation: Accommodation[];
  participants: Participant[];
  itinerary: ItineraryDay[];
  budget?: Budget;
  createdBy: {
    userId: string;
    name: string;
    email?: string;
  };
  isPublic: boolean;
  status: 'planned' | 'ongoing' | 'completed' | 'cancelled';
  coverImageUrl?: string;
  galleryUrls?: string[];
  tags?: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
