import AWS = require("aws-sdk");
import { config } from "../app/config";
import * as fs from "fs";
import { DataSync } from "aws-sdk";
import { S3Data } from "./S3Data";

const c = config.dev;

//Configure AWS
if (c.aws_profile !== "DEPLOYED") {
  var credentials = new AWS.SharedIniFileCredentials({
    profile: c.aws_profile,
  });
  AWS.config.credentials = credentials;
}

export const s3 = new AWS.S3({
  signatureVersion: "v4",
  region: c.aws_region,
  params: { Bucket: c.aws_media_bucket },
});

/* getGetSignedUrl generates an aws signed url to retreive an item
 * @Params
 *    key: string - the filename to be put into the s3 bucket
 * @Returns:
 *    a url as a string
 */
export function getGetSignedUrl(key: string): string {
  const signedUrlExpireSeconds = 60 * 5;

  const url = s3.getSignedUrl("getObject", {
    Bucket: c.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });

  return url;
}

/* getPutSignedUrl generates an aws signed url to put an item
 * @Params
 *    key: string - the filename to be retreived from s3 bucket
 * @Returns:
 *    a url as a string
 */
export function getPutSignedUrl(key: string) {
  const signedUrlExpireSeconds = 60 * 5;

  const url = s3.getSignedUrl("putObject", {
    Bucket: c.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });

  return url;
}

export async function uploadS3(path: string) {
  const fileContent = fs.readFileSync(path);
  const params = {
    Bucket: c.aws_media_bucket,
    Key: `file_${Math.floor(Math.random() * 2000)}.jpeg`, // File name you want to save as in S3
    Body: fileContent,
  };

  const data = await s3.upload(params, function (err: Error, data: AWS.S3.ManagedUpload.SendData) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  }).promise();

  return new S3Data(data.Key, data.Location);
}
