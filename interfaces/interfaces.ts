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
