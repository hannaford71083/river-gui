export interface IUser {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    title: string;
  }
  
  
  export interface IUserCreate{
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    title: string;
    password: string,
    confirmPassword: string
  }