import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteFolderOrFileDouble, getFolderTrash, restoreFolderOrFile } from "../../../service/uploadService"

import { createFolder } from "../../../redux/auth/folderSlice"
import _ from "lodash"



const Trash = () => {
    const [listTrash, setListTrash] = useState([])
    const refreshFolder = useSelector(state => state.folder.refreshFolder)
    const dispatch = useDispatch()
    const userId = useSelector(state => state.auth.userId)


    const fetchStorage = async () => {
        const response = await getFolderTrash(userId);
        if (response.statusCode === 200) {
            setListTrash(response.metadata.storage)
        }
    }


    useEffect(() => {
        fetchStorage();
    }, [userId, refreshFolder])




    const handleRestore = async (folderId) => {
        const response = await restoreFolderOrFile({ folderId });
        if (response.statusCode === 200) {
            dispatch(createFolder())
        }
    }

    const handleDeleteDouble = async (folderId) => {
        const response = await deleteFolderOrFileDouble({ folderId });
        if (response.statusCode === 200) {
            dispatch(createFolder())
        }
    }






    return (
        <>
            <div className="home-container text-[#1F1F1F] pl-4">

                <div className="home-title  pt-[14px] pb-[6px] text-[24px]">
                    Trash
                </div>
                <div className="flex gap-2">
                    <div className="flex gap-3 items-center py-1 px-3 rounded-lg text-[14px] font-semibold hover:cursor-pointer hover:bg-[#f0f1f1] border border-black">
                        <div>
                            Type
                        </div>
                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" focusable="false"><path d="M7 10l5 5 5-5H7z"></path></svg>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center py-1 px-3 rounded-lg text-[14px] font-semibold hover:cursor-pointer hover:bg-[#f0f1f1] border border-black">
                        <div>
                            Modified
                        </div>
                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" focusable="false"><path d="M7 10l5 5 5-5H7z"></path></svg>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center py-1 px-3 rounded-lg text-[14px] font-semibold hover:cursor-pointer hover:bg-[#f0f1f1] border border-black">
                        <div>
                            Source
                        </div>
                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" focusable="false"><path d="M7 10l5 5 5-5H7z"></path></svg>
                        </div>
                    </div>
                </div>
                <div>

                    <div>
                        <div className="flex h-[48px] border-b-[1px] items-center text-[14px] font-medium">
                            <div className="w-[34%]">
                                Name
                            </div>
                            <div className="w-[20%]">
                                Owner
                            </div>
                            <div className="w-[20%]">
                                Last modified
                            </div>
                            <div className="w-[10%]">
                                File size
                            </div>
                        </div>
                        {!_.isEmpty(listTrash) && <div>
                            {listTrash.map((folder, index) => {
                                return (
                                    <>
                                        <div className="hover:bg-[#F0F4F8] group flex h-[48px] border-b-[1px] items-center text-[14px]" key={index}>
                                            <div className="w-[34%] flex items-center gap-2 pl-4 pr-10 overflow-ellipsis">
                                                <div className="overflow-hidden whitespace-nowrap  font-medium">
                                                    {folder.nameFolder ? folder.nameFolder : folder.nameFile}
                                                </div>
                                                <div>
                                                    <svg width="16px" height="16px" viewBox="0 0 16 16" focusable="false" fill=""><path d="M5,7 C6.11,7 7,6.1 7,5 C7,3.9 6.11,3 5,3 C3.9,3 3,3.9 3,5 C3,6.1 3.9,7 5,7 L5,7 Z M11,7 C12.11,7 13,6.1 13,5 C13,3.9 12.11,3 11,3 C9.89,3 9,3.9 9,5 C9,6.1 9.9,7 11,7 L11,7 Z M5,8.2 C3.33,8.2 0,9.03 0,10.7 L0,12 L10,12 L10,10.7 C10,9.03 6.67,8.2 5,8.2 L5,8.2 Z M11,8.2 C10.75,8.2 10.46,8.22 10.16,8.26 C10.95,8.86 11.5,9.66 11.5,10.7 L11.5,12 L16,12 L16,10.7 C16,9.03 12.67,8.2 11,8.2 L11,8.2 Z"></path></svg>
                                                </div>
                                            </div>
                                            <div className="w-[20%] text-[#5E5E5E]">
                                                {folder.createdBy.username}@gmail.com
                                            </div>
                                            <div className="w-[20%] text-[#444746] overflow-hidden whitespace-nowrap font-notoSans">

                                                <div>
                                                    {(new Date(folder.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }))}
                                                </div>
                                            </div>
                                            <div className="w-[10%] flex gap-3">
                                                <div>
                                                    {folder.memories} KB
                                                </div>
                                            </div>

                                            <div className="hidden group-hover:flex gap-2 w-[15%]">
                                                <div className="hover:cursor-pointer hover:bg-[#e9eef6] p-[6px] rounded-full" onClick={() => handleRestore(folder._id)}>
                                                    <svg width="18px" height="18px" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"></path><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path></svg>
                                                </div>
                                                <div className="hover:cursor-pointer hover:bg-[#e9eef6] p-[6px] rounded-full" onClick={() => handleDeleteDouble(folder._id)}>
                                                    <svg height="18px" width="18px" viewBox="0 0 24 24" fill="currentColor"><path d="m9.4 16.5 2.6-2.6 2.6 2.6 1.4-1.4-2.6-2.6L16 9.9l-1.4-1.4-2.6 2.6-2.6-2.6L8 9.9l2.6 2.6L8 15.1ZM7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM7 6v13Z"></path></svg>
                                                </div>
                                                <div className="hover:cursor-default p-[6px] opacity-50">
                                                    <svg width="18px" height="18px" viewBox="0 0 24 24" focusable="false" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"></path><path d="M18.41 5.8L17.2 4.59c-.78-.78-2.05-.78-2.83 0l-2.68 2.68L3 15.96V20h4.04l8.74-8.74 2.63-2.63c.79-.78.79-2.05 0-2.83zM6.21 18H5v-1.21l8.66-8.66 1.21 1.21L6.21 18zM11 20l4-4h6v4H11z"></path></svg>
                                                </div>
                                                <div className="hover:cursor-default p-[6px] opacity-50">
                                                    <svg width="18px" height="18px" viewBox="0 0 24 24" focusable="false" fill="currentColor"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path></svg>
                                                </div>
                                                <div className="hover:cursor-default p-[6px] opacity-50">
                                                    <svg width="18px" height="18px" viewBox="0 0 24 24" fill="currentColor" focusable="false"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13zM9 8h2v9H9zm4 0h2v9h-2z"></path></svg>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}

                        </div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Trash