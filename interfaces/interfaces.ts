export interface UserProps {
  _id: String;
  name?: String;
  email: String;
  password: String;
  image: String;
  trips: any;
}

export interface UserState {
  user: UserProps | null;
  setUser: (user: UserProps) => void;
  clearUser: () => void;
}
