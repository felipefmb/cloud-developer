/*
const bucket: string
const key: string;
const body: Buffer;
*/

import { stringify } from "querystring";
import { Json } from "sequelize/types/lib/utils";

export class S3Params {

    public bucket: string;
    public key: string;
    public body?: Buffer;
    public expires?: number;

    constructor(bucket: string, key: string, body?: Buffer, expires?: number) {
        this.bucket = bucket;
        this.key = key;
        this.body = body
        this.expires = expires;
    }
}