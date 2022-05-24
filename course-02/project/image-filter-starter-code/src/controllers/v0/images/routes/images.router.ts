import { Router, Request, Response } from "express";
import { Images } from "../models/Images";
import { spawn } from 'child_process'
import { requireAuth } from "../../users/routes/auth.router";
import * as AWS from "../../../../config/aws/aws";
import { S3Data } from '../../../../config/aws/S3Data';
import { filterImageFromURL, deleteLocalFiles } from "../../../../util/util";

const router: Router = Router();

// https://images.pexels.com/photos/12108913/pexels-photo-12108913.jpeg
router.get("/filteredimage", async (req: Request, res: Response) => {
  try {
    
    if(!req.query.image_url) {
      throw new Error('URL image is required!');
    }
    
    var filteredImage = await filterImageFromURL(`${req.query.image_url}`);
    const s3Data: S3Data = await AWS.uploadS3(filteredImage);

    res.status(200).json(s3Data);
    //return res.send(filteredImage)
  } catch (error) {
    let message = 'Unknown Error';
    if (error instanceof Error) message = error.message;

    return res.status(400).json({message})
  } finally {
    await deleteLocalFiles([filteredImage]);
  }
});

const processImage = () => {
  const pythonProcess = spawn('python3', ["src/image_filter.py"]);
  if(pythonProcess!== undefined) {
    pythonProcess.stdout.on('data', (data) => {
      // Do something with the data returned from pthon script
      console.log(data.tostring());
    })
  }
}

export const ImagesRouter: Router = router;
