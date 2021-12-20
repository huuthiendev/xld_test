import { Request, Response, NextFunction } from "express";
import { isAddress } from 'web3-utils';

const checkWalletAddress = (): any => {
  return (req: Request, res: Response, next: NextFunction) => {
    var requestParams: any = Object.keys(req.query).length ? req.query : req.body;
    // Validate the Ethereum wallet_address
    if (!isAddress(requestParams.wallet_address)) {
      return res.status(400).json({ message: 'Invalid wallet address!' });
    }
    else next();
  }
}

export {
  checkWalletAddress
}