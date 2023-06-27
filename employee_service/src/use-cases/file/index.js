const { format } = require("util");
const { Storage } = require("@google-cloud/storage");
// Instantiate a storage client with credentials
const storage = new Storage({ keyFilename: "gcp-service-account-key.json" });
const bucket = storage.bucket("experro-dev");

const makeFileUpload = require('./file-upload');
const fileUpload = makeFileUpload({
    bucket,
    format
})
const makeFileDownload = require('./file-download');
const fileDownload = makeFileDownload({
    bucket
})
const makeFileDelete = require('./file-delete');
const fileDelete = makeFileDelete({
    bucket
})

module.exports = {
    fileUpload,
    fileDownload,
    fileDelete
}