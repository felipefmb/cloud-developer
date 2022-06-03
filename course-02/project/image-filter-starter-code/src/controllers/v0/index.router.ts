import { Router, Request, Response } from "express";
import { ImagesRouter } from "./images/routes/images.router";

const router: Router = Router();

router.use("/images/", ImagesRouter);

router.get("/", async (req, res) => {
  res.send("try GET /images/filteredimage?image_url={{}}");
});

export const IndexRouter: Router = router;
