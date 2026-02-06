import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IRegister {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IUserProfile {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  password: string;
  role: "admin" | "member";
  profilPicture: string;
  isActive: boolean;
}

interface IActivation {
  code: string;
}

interface UserExtended extends User {
  accessToken?: string;
  role?: string;
}

interface SessionsExtended extends Session {
  accessToken?: string;
}

interface JWTExtended extends JWT {
  user?: UserExtended;
}

interface ILogin {
  identifier: string;
  password: string;
}

export type {
  IRegister,
  IActivation,
  UserExtended,
  SessionsExtended,
  JWTExtended,
  ILogin,
  IUserProfile,
};
