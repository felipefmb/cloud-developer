import { Router, Request, Response } from "express";
import { LoginRouter } from './sub/login.router';
import { UserRouter } from './sub/user.router';

const router: Router = Router();

router.use('/login', LoginRouter);
router.use('/user', UserRouter);

router.get('/', async (req: Request, res: Response) => {
    res.send("Choose: /login or /user");
});

export const AuthRouter: Router = router;