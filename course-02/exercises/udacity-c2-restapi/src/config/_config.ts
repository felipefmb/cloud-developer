export const config = {
  "dev": {
    "username": "postgres",
    "password": "postgres",
    "database": "mypostgres",
    "host": "postgres.cgu0nckoi9jl.us-east-1.rds.amazonaws.com",
    "dialect": "postgres",
    "aws_region": "us-east-1",
    "aws_profile": "default",
    "aws_media_bucket": "bucket-990249746415-dev"
  },
  "jwt": {
    "secret": " "
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  }
}
