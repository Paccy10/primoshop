export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
}

export interface UpdateProfileData {
  name: string;
  email: string;
  password?: string;
  isAdmin?: boolean;
}
