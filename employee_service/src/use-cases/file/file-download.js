module.exports = function makeFileDownload({
    bucket
}) {
    return async function fileDwonload({
        fileName
    }) {
        const [metaData] = await bucket.file(`trainee-data/${fileName}`).getMetadata();
        return metaData.mediaLink;
    }
}

