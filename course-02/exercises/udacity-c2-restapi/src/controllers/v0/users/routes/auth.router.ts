import { Router, Request, Response } from 'express';

import * as jwt from 'jsonwebtoken';
import { NextFunction } from 'connect';
import { config } from '../../../../config/config';

const router: Router = Router();

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    console.warn("auth.router not yet implemented, you'll cover this in lesson 5")
    
     if (!req.headers || !req.headers.authorization){
         return res.status(401).send({ message: 'No authorization headers.' });
     }
     
     const token_bearer = req.headers.authorization.split(' ');
     console.log('token_bearer', token_bearer, token_bearer.length)
     if(token_bearer.length != 2){
         return res.status(401).send({ message: 'Malformed token.' });
     }
    
    const token = token_bearer[1];
    return jwt.verify(token, config.jwt.secret, (err, decoded) => {
       if (err) {
         return res.status(500).send({ auth: false, message: 'Failed to authenticate.' });
       }
       return next();
     });
}

router.get('/verification', 
    requireAuth, 
    async (req: Request, res: Response) => {
        return res.status(200).send({ auth: true, message: 'Authenticated.' });
});

router.get('/', async (req: Request, res: Response) => {
    res.send('auth')
});

export const AuthRouter: Router = router;
