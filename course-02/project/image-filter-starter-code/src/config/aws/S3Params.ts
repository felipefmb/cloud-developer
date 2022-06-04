/*
const bucket: string
const key: string;
const body: Buffer;
*/

import { stringify } from "querystring";
import { Json } from "sequelize/types/lib/utils";

export class S3Params {

    public Bucket: string;
    public Key: string;
    public Body?: Buffer;
    public Expires?: number;

    constructor(Bucket: string, Key: string, Body?: Buffer, Expires?: number) {
        this.Bucket = Bucket;
        this.Key = Key;
        this.Body = Body
        this.Expires = Expires;
    }
}