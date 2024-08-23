// src/controllers/userController.ts
import { Request, Response } from 'express';
import axios from 'axios';
import { LoginResponse, CreateUserPayload, UserListResponse } from '../models/user';

// define here and we can define them in .env file
const API_BASE_URL = 'https://api.wetrack.tech';
const FLEET_ID = 5614;


// not used  for now
export const loginUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const response = await axios.post<LoginResponse>(`${API_BASE_URL}/auth/`, req.body, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    res.json({ token: response.data.access });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Failed to authenticate' });
  }
};




// create new driver
export const createUser = async (req: Request, res: Response) => {
  try {
    // here i read the token and i because the bearer exist we split and take the second part of the string
    const token  = req.headers.authorization?.split(' ')[1];

    const payload: CreateUserPayload = req.body;
    const response = await axios.post(`${API_BASE_URL}/ats/ats/personnel/new`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      }
    });
    res.status(201).json(response.data);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};



// fetch all
export const getUsers = async (req: Request, res: Response) => {
  try {
    const token  = req.headers.authorization?.split(' ')[1];
    const response = await axios.get<UserListResponse>(`${API_BASE_URL}/ats/ats/personnel/list`, {
      params: {
        params: JSON.stringify({
          query: "",
          limit: 10,
          ascending: 1,
          page: 1,
          byColumn: 0
        }),
        fleet_id: FLEET_ID
      },
      headers: {
        'Authorization': `JWT ${token}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to retrieve users' });
    
  }
};
