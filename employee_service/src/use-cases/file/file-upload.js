module.exports = function makeFileUpload({
    bucket,
    format
}) {
    return async function fileUpload({
        file
    }) {
        try {

            // Create a new blob in the bucket and upload the file data.
            const blob = bucket.file(file.originalname);
            const blobStream = blob.createWriteStream({
                resumable: false,
            });

            blobStream.on("error", (err) => {
                console.log("errorrrrrr", err);
                return { message: err.message };
            });

            blobStream.on("finish", async (data) => {
                // Create URL for directly file access via HTTP.
                const publicUrl = format(
                    `https://storage.googleapis.com/${bucket.name}/${blob.name}`
                );

                try {
                    // Make the file public
                    await bucket.file(`trainee-data/${file.originalname}`).makePublic();
                } catch {
                    console.log("public acesss denied");
                    return {
                        message:
                            `Uploaded the file successfully: ${file.originalname}, but public access is denied!`,
                        url: publicUrl,
                    }
                }
                console.log("data is sent to successfully", publicUrl)
                return {
                    message: "Uploaded the file successfully: " + file.originalname,
                    url: publicUrl,
                }
            });

            blobStream.end(file.buffer);
        } catch (err) {
            console.log(err);
            return {
                message: `Could not upload the file: ${file.originalname}. ${err}`,
            }
        }
    };


}


