
// Define the structure for a user object returned by the API
export interface User {
  id: number;
  name: string;
  surname: string; 
  identity_no: string;
  rfid : string;
  fleet_id: number;
  phone: string;

}

// Define the structure for the data sent in user creation
export interface CreateUserPayload {
  name: string;
  surname : string;
  identity_no: string;
  rfid : string;
  fleet_id: number;
  phone: string;
}

// Define the structure of the response from the login API 
export interface LoginResponse  {
  access: string ;
}

// Define the structure of the response from the user list API
export interface UserListResponse {
  users: User[] ;
}
