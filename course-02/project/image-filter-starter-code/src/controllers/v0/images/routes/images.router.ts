import { Router, Request, Response } from "express";
import * as AWS from "../../../../config/aws/aws";
import { S3Data } from '../../../../config/aws/S3Data';
import { Images } from '../models/Images'
import { filterImageFromURL, deleteLocalFiles } from "../../../../util/util";
import { requireAuth } from "../../users/routes/auth.router";

const router: Router = Router();

router.get("/filteredimage", requireAuth, async (req: Request, res: Response) => {
  let filteredImage: string = "";
  try {
    if(!req.query.image_url) {
      throw new Error('URL image is required!');
    }

    filteredImage = await filterImageFromURL(`${req.query.image_url}`);

    const s3Data: S3Data = await AWS.uploadS3(filteredImage);
    
    res.status(200).json(new Images(s3Data.filename, s3Data.urlFile));
  } catch (error) {
    let message = 'Unknown Error';
    if (error instanceof Error) message = error.message;
    return res.status(400).json({message})
  } finally {
    deleteLocalFiles([filteredImage]);
  }
});

export const ImagesRouter: Router = router;
