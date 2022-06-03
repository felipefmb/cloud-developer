import { Router } from "express";

const router: Router = Router();

router.get("/", async (req, res) => {
   res.send("try GET /api/v0/images/filteredimage?image_url={{}}");
});

export const DefaultRouter: Router = router;