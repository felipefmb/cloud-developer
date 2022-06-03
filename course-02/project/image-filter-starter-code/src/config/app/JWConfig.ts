export class JWTConfig {

    public secret: string;

    constructor() {
        this.secret = process.env.JWTSECRET;
    }
}