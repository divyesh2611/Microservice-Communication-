
const useCase = require('../../use-cases');


const makeFileUploadAction = require('./file-upload');
const fileUploadAction = makeFileUploadAction({
    fileUpload: useCase.file.fileUpload
})
const makeFileDownloadAction = require('./file-download');
const fileDwonloadAction = makeFileDownloadAction({
    fileDwonload: useCase.file.fileDownload
})
const makeFileDeleteAction = require('./file-delete');
const fileDeleteAction = makeFileDeleteAction({
    fileDelete: useCase.file.fileDelete
})

module.exports = Object.freeze({
    fileUploadAction,
    fileDwonloadAction,
    fileDeleteAction
})