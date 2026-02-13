import mongoose from 'mongoose';

const AssetSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Ethereum"
  symbol: { type: String, required: true }, // e.g., "ETH"
  balance: { type: Number, default: 0 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export const Asset = mongoose.model('Asset', AssetSchema);