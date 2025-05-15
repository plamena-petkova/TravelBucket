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
