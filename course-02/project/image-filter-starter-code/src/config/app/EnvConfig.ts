export class EnvConfig {
    public aws_region: string;
    public aws_profile: string;
    public aws_media_bucket: string;

    constructor() {
        this.aws_region = process.env.AWS_REGION;
        this.aws_profile = process.env.AWS_PROFILE;
        this.aws_media_bucket = process.env.AWS_MEDIA_BUCKET;
    }
}