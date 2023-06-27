module.exports = function makeFileDownloadAction({
    fileDwonload
}) {
    return async function fileDwonloadAction(req, res) {

        try {
            const fileName = req.params.filename;
            const result = await fileDwonload({ fileName });
            console.log("result", result)
            res.redirect(result);
        }
        catch (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    }
}