const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

const config = {
  s3BucketName: process.env.BUCKET_NAME,
  folderPath: "./build",
};

const s3Config = {
  signatureVersion: "v4",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

const s3 = new AWS.S3(s3Config);

console.log("S3 config", s3Config);

function uploadDirectoryFiles(distFolderPath) {
  const files = fs.readdirSync(distFolderPath);
  if (!files || files.length === 0) {
    console.log(`Provided folder '${distFolderPath}' is empty or does not exist.`);
    return;
  }
  for (const fileName of files) {
    const filePath = path.join(distFolderPath, fileName);
    if (fs.lstatSync(filePath).isDirectory()) {
      uploadDirectoryFiles(filePath);
      continue;
    }
    uploadFile(filePath, fileName);
  }
}

function uploadFile(filePath, fileName) {
  const fileKey = filePath.replace(`${__dirname}/${config.folderPath}/`, "");
  const fileContent = fs.readFileSync(filePath);
  s3.putObject(
    {
      Bucket: config.s3BucketName,
      Key: fileKey,
      Body: fileContent,
    },
    (err, res) => {
      if (err) {
        return console.log("Error uploading file", err);
      }
      console.log(`Successfully uploaded '${fileKey}'!`, { res });
    }
  );
}

uploadDirectoryFiles(config.folderPath);