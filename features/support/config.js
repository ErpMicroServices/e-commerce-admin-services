import fs from "fs";

class Config {

    constructor() {
        this._currentEnvironment = process.env.NODE_ENV || defaultEnvironment();
        if (this._currentEnvironment == defaultEnvironment()) {
            this._config = {
                database: {
                    host: process.env.DATABASE_HOST || 'localhost',
                    port: process.env.DATABASE_PORT || 5432,
                    database: process.env.DATABASE_DATABASE || 'ems_ecommerce',
                    user: process.env.DATABASE_USER || 'ems_ecommerce',
                    password: process.env.DATABASE_PASSWORD || 'ems_ecommerce'
                },
                api: {
                    url: "http://localhost/api/e-commerce/admin",
                    timeout: 30000,
                }
            };
        } else {
            this._config = JSON.parse(fs.readFileSync(`config.${this.currentEnvironment}.json`, "utf8"));
        }
    }

    get api() {
        return this._config.api;
    }

    get jwt() {
        return this._config.jwt;
    }

    get database() {
        return this._config.database;
    }

}

const config = new Config();
export default config;

export function defaultEnvironment() {
    return "default";
}

export function developmentEnvironment() {
    return "dev";
}

export function environments() {
    return [Config.defaultEnvironment(), Config.localEnvironment(), Config.developmentEnvironment(), Config.qaEnvironment(), Config.qaEnvironment(), Config.stagingEnvironment(), Config.prodEnvironment()];
}

export function localEnvironment() {
    return "local";
}

export function prodEnvironment() {
    return "prod";
}

export function qaEnvironment() {
    return "qa";
}

export function stagingEnvironment() {
    return "staging";
}
