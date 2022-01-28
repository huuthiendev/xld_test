import { Router, Request, Response } from 'express';
import { AppRoute } from '../interfaces/app_route.interface';
import { Wallet, IWallet } from '../models/wallet.model';
import { checkRequireParams } from '../middleware/validator.middleware';
import { checkWalletAddress } from '../middleware/wallet.middleware';

export class WalletController implements AppRoute {
  public route = '/wallet';
  public router: Router = Router();
  constructor() {
    this.router.get('/read', checkRequireParams(['wallet_address']), this.getWallet);
    this.router.post('/create', [checkRequireParams(['wallet_address', 'balance']), checkWalletAddress()], this.createWallet);
    this.router.put('/update', checkRequireParams(['wallet_address', 'balance']), this.updateWallet);
    this.router.delete('/delete', checkRequireParams(['wallet_address']), this.deleteWallet);
  }

  public async getWallet(req: Request, res: Response): Promise<any> {
    try {
      var wallet = await Wallet.findOne({ wallet_address: req.query.wallet_address });
      if (!wallet) {
        throw { message: 'Cannot find wallet info!' };
      }
      return res.status(200).json(wallet);
    }
    catch (err) {
      console.log('[WalletController] getWallet - ERROR: ', err);
      return res.status(400).send(err);
    }
  }

  public async createWallet(req: Request, res: Response): Promise<any> {
    try {
      var payload: IWallet = {
        wallet_address: req.body.wallet_address,
        balance: parseFloat(req.body.balance)
      };
      var checkWallet = await Wallet.findOne({ wallet_address: req.body.wallet_address });
      if (checkWallet) {
        throw { message: 'Wallet address existed!' };
      }
      var wallet = await Wallet.create(payload);
      return res.status(200).json(wallet);
    }
    catch (err) {
      console.log('[WalletController] createWallet - ERROR: ', err);
      return res.status(400).send(err);
    }
  }

  public async deleteWallet(req: Request, res: Response): Promise<any> {
    try {
      var wallet = await Wallet.findOneAndDelete({ wallet_address: req.query.wallet_address });
      if (!wallet) {
        throw { message: 'Cannot find wallet info!' };
      }
      return res.status(200).json({ message: 'success' });
    }
    catch (err) {
      console.log('[WalletController] deleteWallet - ERROR: ', err);
      return res.status(400).send(err);
    }
  }

db.createUser(
{
  user: "thien",
  pwd: "thien2021",
  roles:[{role: "readWrite" , db:"xld"}]
})

  public async updateWallet(req: Request, res: Response): Promise < any > {
  try {
    var wallet = await Wallet.findOneAndUpdate({ wallet_address: req.body.wallet_address }, { balance: req.body.balance }, { new: true });
    return res.status(200).json(wallet);
  }
    catch(err) {
    console.log('[WalletController] updateWallet - ERROR: ', err);
    return res.status(400).send(err);
  }
}
}