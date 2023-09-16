const AWS = require('aws-sdk');

// Replace these with your AWS credentials
const ID = process.env.ACCESS_KEY_ID;
const SECRET = process.env.SECRET_ACCESS_KEY;

// Replace this with your S3 bucket name
const BUCKET_NAME = process.env.BUCKET_NAME;
// Set your desired AWS region
const REGION = 'us-east-1'; // Change to your desired region

// Configure AWS with your credentials and region
AWS.config.update({
    accessKeyId: ID,
    secretAccessKey: SECRET,
    region: REGION
});

// Create an S3 instance
const s3 = new AWS.S3();

module.exports = s3; // Export the configured S3 instance for use in other parts of your application
