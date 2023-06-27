module.exports = function makeFileDelete({
    bucket
}) {
    return async function fileDelete({
        fileName
    }) {
        bucket
            .file(fileName)
            .delete()
            .then(function (data) {
                const apiResponse = data[0];
                console.log(apiResponse);
                return apiResponse;
            })
            .catch((e) => {
                console.log(e);
                return e
            });
    }
}