import { Request, Response, NextFunction } from "express";

const checkRequireParams = (requireParams: string[]): any => {
  return (req: Request, res: Response, next: NextFunction) => {
    var missingParams: string[] = [];
    var requestParams: any = Object.keys(req.query).length ? req.query : req.body;
    requireParams.forEach(r => {
      if (!requestParams || !requestParams[r]) {
        missingParams.push(r);
      }
    });
    if (missingParams.length) {
      return res.status(400).json({
        message: 'Missing parameters: ' + missingParams.join(', ')
      });
    }
    else next();
  }
}

export {
  checkRequireParams
}