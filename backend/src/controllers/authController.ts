import { Request, Response } from 'express';
import { loginUser, registerUser } from '../services/authService';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, walletAddress } = req.body;
    const user = await registerUser(email, password, walletAddress);
    res.status(201).json({ message: "User registered", user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);
    res.json({ token, user });
  } catch (error: any) {
    res.status(401).json({ error: "Invalid credentials" });
  }
};