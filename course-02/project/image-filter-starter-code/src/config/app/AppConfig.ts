import { EnvConfig } from "./EnvConfig";
import { JWTConfig } from "./JWConfig";

export class AppConfig {
    
    public router_version: string;
    public env_config: EnvConfig;
    public jwt: JWTConfig;

    constructor() {
        this.router_version = "v0"
        this.env_config = new EnvConfig();
        this.jwt = new JWTConfig();
    }
}