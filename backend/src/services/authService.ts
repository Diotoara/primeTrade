import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export const registerUser = async (email:string, password:string, wallet:any) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const userExists = await User.findOne({email});
  if(userExists){
    throw new Error("User alerady exists");
  }
  return await User.create({ email, password: hashedPassword, walletAddress: wallet });
};

export const loginUser = async (email:string, password:string) => {
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const adminToken = jwt.sign(
      { id: 'admin-id-000', role: 'admin' }, 
      process.env.JWT_SECRET!, 
      { expiresIn: '1d' }
    );
    return { 
      token: adminToken, 
      user: { email: process.env.ADMIN_EMAIL, role: 'admin' } 
    };
  }

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Auth failed");
  }
  const token = jwt.sign(
    { id: user._id, role: user.role }, 
    process.env.JWT_SECRET!, 
    { expiresIn: '1d' }
  );
  return { token, user: { email: user.email, role: user.role } };
};