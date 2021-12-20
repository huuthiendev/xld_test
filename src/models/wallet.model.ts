import { Model, model, Schema } from 'mongoose';

export interface IWallet {
  wallet_address: string;
  balance: number;
}

const WalletSchema = new Schema({
  wallet_address: {
    type: Schema.Types.String,
    unique: true,
    required: [true, "can't be blank"],
    index: true
  },
  balance: {
    type: Schema.Types.Number
  },
}, { timestamps: true });

export const Wallet: Model<IWallet> = model<IWallet>('Wallet', WalletSchema);