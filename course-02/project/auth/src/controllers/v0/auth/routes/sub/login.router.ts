import { Router, Request, Response } from 'express';
import { User } from '../../models/User';
import * as EmailValidator from 'email-validator';
import { comparePasswords, generateJWT } from '../../../../../util/jwtutil';

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  // check email is valid
  if (!email || !EmailValidator.validate(email)) {
      return res.status(400).send({ auth: false, message: 'Email is required or malformed' });
  }

  // check email password valid
  if (!password) {
      return res.status(400).send({ auth: false, message: 'Password is required' });
  }

  const user = await User.findByPk(email);
  // check that user exists
  if(!user) {
      return res.status(401).send({ auth: false, message: 'Unauthorized' });
  }

  // check that the password matches
  const authValid = await comparePasswords(password, user.password_hash)

  if(!authValid) {
      return res.status(401).send({ auth: false, message: 'Unauthorized' });
  }

  // Generate JWT
  const jwt = generateJWT(user);

  res.status(200).send({ auth: true, token: jwt, user: user.short()});
});

export const LoginRouter: Router = router;