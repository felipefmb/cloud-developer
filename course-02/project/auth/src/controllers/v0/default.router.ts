import { Router, Request, Response } from "express";
import { config } from "../../config/config";

const router: Router = Router();

// Root Endpoint
// Displays a simple message to the user

router.get("/", async (req, res) => {
    res.send("Choose: /api/v0/login or /api/v0/user");

});

export const DefaultRouter: Router = router;
