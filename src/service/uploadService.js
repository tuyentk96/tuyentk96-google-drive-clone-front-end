import axios from '../setup/axios'

const createNewFolder = async (data) => {
    return await axios.post('/uploads/new-folder', data)
}

const uploadFiles = async (data) => {
    return await axios.post('/uploads/upload-files', data)
}

const getStorage = async ({ folderId, userId }) => {
    return await axios.get(`/uploads/get-storage?folderId=${folderId}&userId=${userId}`)
}

const getFolderMyDrive = async (folderId) => {
    return await axios.get(`/uploads/get-folder-my-drive?folderId=${folderId}`)
}

const getFolderShareWithMe = async ({ folderId, userId }) => {
    return await axios.get(`/uploads/get-folder-share-with-me?folderId=${folderId}&userId=${userId}`)
}

const checkPermissionShare = async ({ folderId, userId }) => {
    return await axios.get(`/uploads/check-share?folderId=${folderId}&userId=${userId}`)
}

const deleteFolderOrFile = async (data) => {
    return await axios.post(`/uploads/delete`, data)
}

const shareDataforAnotherUser = async (data) => {
    return await axios.post(`/uploads/share`, data)
}

const renameFolderOrFile = async (data) => {
    return await axios.post('/uploads/rename', data);
}

const restoreFolderOrFile = async (data) => {
    return await axios.post('/uploads/restore', data);
}

const addStar = async (data) => {
    return await axios.post('/uploads/add-star', data);
}

const disableStar = async (data) => {
    return await axios.post('/uploads/disable-star', data);
}

const deleteFolderOrFileDouble = async (data) => {
    return await axios.post('/uploads/delete-double', data);
}

const changePublic = async (data) => {
    return await axios.post('/uploads/change-public', data);
}

const getShareWithMe = async (userId) => {
    return await axios.get(`/uploads/get-share-with-me?userId=${userId}`)
}

const getFolderTrash = async (userId) => {
    return await axios.get(`/uploads/get-folder-trash?userId=${userId}`)
}

const getListStar = async (userId) => {
    return await axios.get(`/uploads/get-star?userId=${userId}`)
}
const download = async (folderId) => {
    return await axios.get(`/uploads/download?folderId=${folderId}`, { responseType: 'blob' });
};

const getFolderOrFile = async (folderId) => {
    return await axios.get(`/uploads/get-folder-or-file-by-id?folderId=${folderId}`);
};

const getFilesByUserId = async (userId) => {
    return await axios.get(`/uploads/get-file-by-user-id?userId=${userId}`);
};

const getFoldersByUserId = async (userId) => {
    return await axios.get(`/uploads/get-folder-by-user-id?userId=${userId}`);
};

export {
    createNewFolder, getStorage, getFolderMyDrive, uploadFiles,
    deleteFolderOrFile, checkPermissionShare, shareDataforAnotherUser,
    getShareWithMe, getFolderShareWithMe, renameFolderOrFile, getFolderTrash,
    deleteFolderOrFileDouble, restoreFolderOrFile, disableStar, addStar, getListStar, download,
    changePublic, getFolderOrFile, getFoldersByUserId, getFilesByUserId
}