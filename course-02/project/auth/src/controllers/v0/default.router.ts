import { Router, Request, Response } from "express";
import { config } from "../../config/config";

const router: Router = Router();

// Root Endpoint
// Displays a simple message to the user

router.get("/", async (req, res) => {
  console.log('host: ', req.get("host"));
  let redirectUrl  = `${req.protocol}://${req.get("host")}/api/${config.routerVersion}`;
  res.redirect(redirectUrl);
});

export const DefaultRouter: Router = router;
