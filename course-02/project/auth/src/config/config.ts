export const config = {
  "routerVersion" : "v0",
  "dev": {
      "username": process.env.POSTGRESS_USERNAME,
      "password": process.env.POSTGRESS_PASSWORD,
      "database": process.env.POSTGRESS_DATABASE,
      "host": process.env.POSTGRESS_HOST,
      "dialect": "postgres"
    },
    "jwt": {
      "secret": process.env.JWTSECRET
    },
    "prod": {
      "username": "",
      "password": "",
      "database": "udagram_prod",
      "host": "",
      "dialect": "postgres"
    }
  }
  