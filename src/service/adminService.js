import axios from '../setup/axios'

const getAllUsers = async () => {
    return await axios.get(`/admin/get-all-users`);
};

const getFilesByUserId = async (userId) => {
    return await axios.get(`/admin/get-files-by-user-id?userId=${userId}`);
};

const getTrashByUserId = async (userId) => {
    return await axios.get(`/admin/get-trash-by-user-id?userId=${userId}`);
};

const getListFolderByFolderParrentId = async (folderId) => {
    return await axios.get(`/admin/get-folders-by-folder-parrent-id?folderId=${folderId}`);
}

const getFolderParrent = async (folderId) => {
    return await axios.get(`/admin/get-folder-parrent?folderId=${folderId}`);
}

export {
    getAllUsers, getFilesByUserId, getTrashByUserId, getListFolderByFolderParrentId, getFolderParrent
}