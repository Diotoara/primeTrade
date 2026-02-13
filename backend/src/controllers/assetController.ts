import { Request, Response } from 'express';
import { Asset } from '../models/Asset';

export const getAssets = async (req: any, res: Response) => {
  const query = req.user.role === 'admin' ? {} : { owner: req.user.id };
  const assets = await Asset.find(query).populate('owner', 'email');
  res.json(assets);
};

export const createAsset = async (req: any, res: Response) => {
  const asset = await Asset.create({ ...req.body, owner: req.user.id });
  res.status(201).json(asset);
};

export const deleteAsset = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Asset.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Asset not found" });
    
    res.json({ message: "Asset deleted successfully by Admin" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};