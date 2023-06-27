module.exports = function makeFileUploadAction({
    fileUpload
}) {
    return async function fileUploadAction(req, res) {

        try {

            console.log("req.file", req.file);
            const result = await fileUpload({ file: req.file });
            console.log("result", result);
            res.send(result);
        }
        catch (err) {
            console.log('err', err);
            res.status(400).send('err')
        }


    }
}

