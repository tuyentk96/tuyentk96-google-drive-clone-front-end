import { Route, Routes } from "react-router-dom"
import Login from "../components/Auth/Login"
import Register from "../components/Auth/Register"
import ForgotPassword from "../components/Auth/ForgotPassword"
import PrivateRoutes from "./PrivateRoutes"
import MyDrive from "../components/Home/MyDrive/MyDrive"
import HomeMain from "../components/Home/HomeMain"
import ShareWithMe from "../components/Home/ShareWithMe/ShareWithMe"
import FolderMyDrive from "../components/Home/Folder/FolderMyDrive"
import FolderShareWithMe from "../components/Home/Folder/FolderShareWithMe"
import Trash from "../components/Home/Trash/Trash"
import Star from "../components/Home/Star/Star"
import Public from "../components/Public/Public"
import ManagerUser from "../components/Home/Admin/ManagerUser"
import ManagerFile from "../components/Home/Admin/ManagerFile"
import ManagerTrash from "../components/Home/Admin/ManagerTrash"
import ManagerFolders from "../components/Home/Admin/ManagerFolders"

const AppRoutes = () => {
    return (
        <Routes>
            {/* Các route công khai */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/public/:folderId" element={<Public />} />


            {/* Route riêng tư */}
            <Route
                path="/"
                element={<PrivateRoutes element={<HomeMain />} />}
            />

            <Route
                path="/my-drive"
                element={<PrivateRoutes element={<MyDrive />} />}
            />

            <Route
                path="/folder/:folderId"
                element={<PrivateRoutes element={<FolderMyDrive />} />}
            />

            <Route
                path="/share-with-me/:folderId"
                element={<PrivateRoutes element={<FolderShareWithMe />} exact />}
            />

            <Route
                path="/share-with-me"
                element={<PrivateRoutes element={<ShareWithMe />} exact />}
            />

            <Route
                path="/trash"
                element={<PrivateRoutes element={<Trash />} exact />}
            />

            <Route
                path="/star"
                element={<PrivateRoutes element={<Star />} exact />}
            />

            <Route
                path="/manager-user"
                element={<PrivateRoutes element={<ManagerUser />} exact />}
            />

            <Route
                path="/manager-files"
                element={<PrivateRoutes element={< ManagerFile />} exact />}
            />

            <Route
                path="/manager-folders"
                element={<PrivateRoutes element={< ManagerFolders />} exact />}
            />

            <Route
                path="/manager-trash"
                element={<PrivateRoutes element={< ManagerTrash />} exact />}
            />

        </Routes>
    );
};

export default AppRoutes;