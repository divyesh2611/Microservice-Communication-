module.exports = function makeFileDeleteAction({
    fileDelete
}) {
    return async function fileDeleteAction(req, res) {
        const fileName = req.params.filename;
        const result = await fileDelete({ fileName });
        res.send(result);
    }
}