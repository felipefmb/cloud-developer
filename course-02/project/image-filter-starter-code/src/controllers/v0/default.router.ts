import { Router, Request, Response } from "express";
import { config } from "../../config/app/config";

const router: Router = Router();

// Root Endpoint
// Displays a simple message to the user

router.get("/", async (req, res) => {
  /*console.log('host: ', req.get("host"));
  let redirectUrl  = `${req.protocol}://${req.get("host")}/api/${config.routerVersion}`;
  res.redirect(redirectUrl);
  */
  res.send("try GET /api/v0/images/filteredimage?image_url={{}}");
});

export const DefaultRouter: Router = router;
