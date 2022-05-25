import { Router, Request, Response } from "express";
import { AuthRouter } from './auth/routes/router';

const router: Router = Router();

router.use('/auth', AuthRouter);


// Root Endpoint
// Displays a simple message to the user
router.get("/", async (req, res) => {
  res.send("try GET /images/filteredimage?image_url={{}}");
});

export const IndexRouter: Router = router;
