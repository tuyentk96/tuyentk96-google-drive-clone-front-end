import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFilesByUserId, getFoldersByUserId } from "../../service/uploadService"
import { setCurrentFolder } from "../../redux/auth/folderSlice"
import { useNavigate } from "react-router-dom"
import _ from "lodash"

const HomeMain = () => {
    const [listFolder, setListFolder] = useState()
    const [listFile, setListFile] = useState()
    const userId = useSelector(state => state.auth.userId)
    const role = useSelector(state => state.auth.role)
    const storageId = useSelector(state => state.auth.storageId)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchListFiles = async (userId) => {
        const response = await getFilesByUserId(userId)

        if (response.statusCode === 200) {
            if (response.metadata.files[0].fileId.length > 1) {
                setListFile(response.metadata.files[0].fileId)
            } else {
                setListFile([])
            }
        }
    }

    const fetchListFolder = async (userId) => {
        const response = await getFoldersByUserId(userId)

        if (response.statusCode === 200) {
            if (response.metadata.folders[0].folderId.length > 1) {
                setListFolder(response.metadata.folders[0].folderId)
            } else {
                setListFolder([])
            }
        }
    }

    console.log(listFolder);


    useEffect(() => {
        fetchListFiles(userId)
    }, [userId])

    useEffect(() => {
        fetchListFolder(userId)
    }, [userId])

    const handleOnClickFolder = (folderId, isMyDrive) => {
        if (isMyDrive) {
            dispatch(setCurrentFolder({ currentFolderId: folderId }))
            navigate(`/folder/${folderId}`)
        }

        if (!isMyDrive) {
            dispatch(setCurrentFolder({ currentFolderId: folderId }))
            navigate(`/share-with-me/${folderId}`)
        }
    }

    const handleOnClickManagerUser = () => {
        dispatch(setCurrentFolder({ currentFolderId: storageId }))
        navigate('/manager-user')
    }

    const handleOnClickManagerFile = () => {
        dispatch(setCurrentFolder({ currentFolderId: storageId }))
        navigate('/manager-files')
    }

    const handleOnClickManagerFolder = () => {
        dispatch(setCurrentFolder({ currentFolderId: storageId }))
        navigate('/manager-folders')
    }

    const handleOnClickManagerTrash = () => {
        dispatch(setCurrentFolder({ currentFolderId: storageId }))
        navigate('/manager-trash')
    }

    if (role === 'USER') {
        return (
            <>
                <div className="home-container text-[#1F1F1F] pl-4">
                    <div className="home-title text-center pt-[14px] pb-[6px] text-[24px]">
                        Welcome to Drive
                    </div>
                    <div>
                        <div className="h-[48px] flex gap-2 ]">
                            <div>
                                <svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"></path></svg>
                            </div>
                            <div className="hidden">
                                <svg height="24px" viewBox="0 -960 960 960" width="24px" focusable="false"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"></path></svg>
                            </div>
                            <div>
                                Suggested folders
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {
                                !_.isEmpty(listFolder) && listFolder.map((folder, index) => {
                                    return (
                                        <>
                                            <div className="flex items-center bg-[#F0F4F8] w-[298px] p-2 rounded-xl" key={index} onDoubleClick={() => handleOnClickFolder(folder._id, folder.createdBy._id === userId)}>
                                                <div className="flex gap-2 items-center ">
                                                    <div>
                                                        <svg focusable="false" viewBox="0 0 24 24" height="24px" width="24px" fill="currentColor"><g><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path><path d="M0 0h24v24H0z" fill="none"></path></g></svg>
                                                    </div>
                                                    <div className="w-[217px]">
                                                        <div className="font-medium text-[13px]">
                                                            {folder?.nameFolder}
                                                        </div>
                                                        <div className="text-[12px] text-[#444746]">
                                                            {
                                                                folder?.createdBy?._id === userId ? 'In My Drive' : 'In Share With Me'
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <svg viewBox="0 0 20 20" focusable="false" width="20px" height="20px" fill="currentColor"><path fill="none" d="M0 0h20v20H0V0z"></path><path d="M10 6c.82 0 1.5-.68 1.5-1.5S10.82 3 10 3s-1.5.67-1.5 1.5S9.18 6 10 6zm0 5.5c.82 0 1.5-.68 1.5-1.5s-.68-1.5-1.5-1.5-1.5.68-1.5 1.5.68 1.5 1.5 1.5zm0 5.5c.82 0 1.5-.67 1.5-1.5 0-.82-.68-1.5-1.5-1.5s-1.5.68-1.5 1.5c0 .83.68 1.5 1.5 1.5z"></path></svg>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }

                        </div>
                    </div>
                    <div>
                        <div className="h-[48px] flex gap-2 ] mt-4">
                            <div>
                                <svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"></path></svg>
                            </div>
                            <div className="hidden">
                                <svg height="24px" viewBox="0 -960 960 960" width="24px" focusable="false"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"></path></svg>
                            </div>
                            <div>
                                Suggested files
                            </div>
                        </div>
                        <div>
                            {!_.isEmpty(listFile) && <div className="flex h-[48px] border-b-[1px] items-center text-[14px] font-medium">
                                <div className="w-[37%]">
                                    Name
                                </div>
                                <div className="w-[22%]">
                                    Reason suggested
                                </div>
                                <div className="w-[20%]">
                                    Owner
                                </div>
                                <div className="w-[20%]">
                                    Location
                                </div>
                            </div>}

                            {!_.isEmpty(listFile) && listFile.map((file, index) => {
                                return (
                                    <>
                                        <div className="hover:bg-[#F0F4F8] flex h-[48px] border-b-[1px] items-center text-[14px]" key={index}>
                                            <div className="w-[37%] flex items-center gap-2 pl-4 pr-10 overflow-ellipsis">
                                                <div className="overflow-hidden whitespace-nowrap  font-medium">
                                                    {file?.nameFile}
                                                </div>
                                                <div>
                                                    <svg width="16px" height="16px" viewBox="0 0 16 16" focusable="false" fill=""><path d="M5,7 C6.11,7 7,6.1 7,5 C7,3.9 6.11,3 5,3 C3.9,3 3,3.9 3,5 C3,6.1 3.9,7 5,7 L5,7 Z M11,7 C12.11,7 13,6.1 13,5 C13,3.9 12.11,3 11,3 C9.89,3 9,3.9 9,5 C9,6.1 9.9,7 11,7 L11,7 Z M5,8.2 C3.33,8.2 0,9.03 0,10.7 L0,12 L10,12 L10,10.7 C10,9.03 6.67,8.2 5,8.2 L5,8.2 Z M11,8.2 C10.75,8.2 10.46,8.22 10.16,8.26 C10.95,8.86 11.5,9.66 11.5,10.7 L11.5,12 L16,12 L16,10.7 C16,9.03 12.67,8.2 11,8.2 L11,8.2 Z"></path></svg>
                                                </div>
                                            </div>
                                            <div className="w-[22%] text-[#5E5E5E]">
                                                <div>
                                                    You opened • {(new Date(file.openedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }))}
                                                </div>
                                            </div>
                                            <div className="w-[20%] text-[#444746] overflow-hidden whitespace-nowrap font-notoSans">
                                                {file?.createdBy?.username}@gmail.com
                                            </div>
                                            {file?.createdBy?._id === userId ?
                                                <>
                                                    <div className="w-[20%] flex gap-3">
                                                        <div>
                                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentcolor" focusable="false"><path d="M19 2H5C3.9 2 3 2.9 3 4V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V4C21 2.9 20.1 2 19 2ZM19 20H5V19H19V20ZM19 17H5V4H19V17Z"></path><path d="M13.1215 6H10.8785C10.5514 6 10.271 6.18692 10.0841 6.46729L7.14019 11.6075C7 11.8878 7 12.215 7.14019 12.4953L8.26168 14.4579C8.40187 14.7383 8.72897 14.9252 9.05608 14.9252H15.0374C15.3645 14.9252 15.6449 14.7383 15.8318 14.4579L16.9533 12.4953C17.0935 12.215 17.0935 11.8878 16.9533 11.6075L13.9159 6.46729C13.7757 6.18692 13.4486 6 13.1215 6ZM10.1776 12.0748L12.0467 8.8972L13.8692 12.0748H10.1776Z"></path></svg>
                                                        </div>
                                                        <div>
                                                            My Drive
                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <div className="w-[20%] flex gap-3">
                                                        <div>
                                                            <svg width="18" height="18" viewBox="0 0 24 24" focusable="false" fill="currentcolor"><path d="M0 0h24v24H0z" fill="none"></path><path xmlns="http://www.w3.org/2000/svg" d="M15 8c0-1.42-.5-2.73-1.33-3.76.42-.14.86-.24 1.33-.24 2.21 0 4 1.79 4 4s-1.79 4-4 4c-.43 0-.84-.09-1.23-.21-.03-.01-.06-.02-.1-.03A5.98 5.98 0 0 0 15 8zm1.66 5.13C18.03 14.06 19 15.32 19 17v3h4v-3c0-2.18-3.58-3.47-6.34-3.87zM9 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 9c-2.7 0-5.8 1.29-6 2.01V18h12v-1c-.2-.71-3.3-2-6-2M9 4c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 9c2.67 0 8 1.34 8 4v3H1v-3c0-2.66 5.33-4 8-4z"></path></svg>
                                                        </div>
                                                        <div>
                                                            Share With Me
                                                        </div>
                                                    </div>
                                                </>
                                            }

                                        </div>
                                    </>
                                )
                            })

                            }


                        </div>
                    </div>
                </div>
            </>
        )
    }

    if (role === 'ADMIN') {
        return (
            <div className="home-container text-[#1F1F1F] pl-4">
                <div className="home-title text-center pt-[14px] pb-[6px] text-[24px] mb-4">
                    ADMIN MANAGER
                </div>
                <div className="flex gap-4" >
                    <div className="inline-block items-center bg-[#F0F4F8]  py-2 px-4 rounded-xl hover:cursor-pointer" onClick={handleOnClickManagerUser}>
                        Manager User
                    </div>
                    <div className="inline-block items-center bg-[#F0F4F8]  py-2 px-4 rounded-xl hover:cursor-pointer" onClick={handleOnClickManagerFile}>
                        Manager File
                    </div>
                    <div className="inline-block items-center bg-[#F0F4F8]  py-2 px-4 rounded-xl hover:cursor-pointer" onClick={handleOnClickManagerFolder}>
                        Manager Folder
                    </div>
                    <div className="inline-block items-center bg-[#F0F4F8]  py-2 px-4 rounded-xl hover:cursor-pointer" onClick={handleOnClickManagerTrash}>
                        Manager Trash
                    </div>
                </div>
            </div>
        )
    }


}

export default HomeMain