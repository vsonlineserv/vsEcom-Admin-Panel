import { User } from './user';

export class LoginModal {
  Username: string;
  Password: string;
}

export class LoginUserData {
  user: User;
 
}

export class TokenVSAuth {
  token: string;
  expires_in: string;
  expires_inUTC: string;
}

export class UserRegistrationModal{
  Email: string;
  Password: string;
  ConfirmPassword: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: any;
  ApplicationName: string;
  Username: string;
  TemplateId: number;
  Country: string;
  StoreCategory: number;
  State: string;
  City: string;
  Pincode: string;
  Latitude: number;
  Longitude: number;
}

export class StaffAccountRegistrationModal{
  Email: string;
  Password: string;
  ConfirmPassword: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: any;
  licenseId: number;
  PermissionList: [];
  ExistingAuthId: string;
}