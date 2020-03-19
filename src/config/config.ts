/**
 * Microservice configuration variables
 * It generates the configuration object used across
 * the microservice. This object contains the environment
 * variables.
 */

import { IConfigCommon, IConfigENV, IConfiguration } from "../Interfaces";

// external modules
import * as path from "path";
// import the secret node variables
import * as dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, ".env") });

// get process environment
const env = process.env.NODE_ENV || "development";

// the common environment
const common = {
    environment: env
    // TODO: add common variables
};

// production environment variables
const production = {
    // TODO: add production variables
    port: parseInt(process.env.PROD_PORT, 10) || 3100,
    sessionsecret: process.env.PROD_SESSION_SECRET,
    elasticsearch: {
        node: process.env.PROD_ELASTICSEARCH_NODE
    }
};

// development environment variables
const development = {
    // TODO: add development variables
    port: parseInt(process.env.DEV_PORT, 10) || 3101,
    sessionsecret: process.env.DEV_SESSION_SECRET,
    elasticsearch: {
        node: process.env.DEV_ELASTICSEARCH_NODE
    }
};

// test environment variables
const test = {
    // TODO: add test variables
    port: parseInt(process.env.TEST_PORT, 10) || 3102,
    sessionsecret: process.env.TEST_SESSION_SECRET,
    elasticsearch: {
        node: process.env.TEST_ELASTICSEARCH_NODE
    }
};

const envGroups = {
    production,
    development,
    test
};

// Creates a deep merge between two JSON objects.
function merge(target: IConfigCommon, source: IConfigENV): IConfiguration {
    // Iterate through `source` properties
    // If an `Object` set property to merge of `target` and `source` properties
    for (const key of Object.keys(source)) {
        if (source[key] instanceof Object) {
            Object.assign(source[key], merge(target[key], source[key]));
        }
    }
    // Join `target` and modified `source`
    return Object.assign(target || {}, source);
}

// export the environment variables
const config = merge(common, envGroups[env]);
export default config;
