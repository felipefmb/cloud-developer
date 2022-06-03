import { Request, Response } from 'express';
import { AppConfig } from '../../../../config/app/AppConfig'

import * as jwt from 'jsonwebtoken';
import { NextFunction } from 'connect';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const config: AppConfig= new AppConfig();  
  console.warn("auth.router not yet implemented, you'll cover this in lesson 5")
    
     if (!req.headers || !req.headers.authorization){
         return res.status(401).send({ message: 'No authorization headers.' });
     }
     
     const token_bearer: string[] = req.headers.authorization.split(' ');
     if(token_bearer.length != 2){
         return res.status(401).send({ message: 'Malformed token.' });
     }
    
    const token: string = token_bearer[1];
    return jwt.verify(token, config.jwt.secret, (err, decoded) => {
       if (err) {
         return res.status(500).send({ auth: false, message: 'Failed to authenticate.' });
       }
       return next();
     });
}