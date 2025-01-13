import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addStar, checkPermissionShare, disableStar, getListStar, getShareWithMe, shareDataforAnotherUser } from "../../../service/uploadService"
import { useNavigate } from "react-router-dom"
import { createFolder, setCurrentFolder } from "../../../redux/auth/folderSlice"
import { Modal } from "antd"
import { getListUserSearchByUsername } from "../../../service/accessService"
import _ from "lodash"


const ShareWithMe = () => {
    const [listShareWithMe, setListShareWithMe] = useState([])
    const navigate = useNavigate()
    const refreshFolder = useSelector(state => state.folder.refreshFolder)
    const dispatch = useDispatch()
    const userId = useSelector(state => state.auth.userId)
    const [isShowShareData, setIsShowShareData] = useState(false)
    const [userShare, setUserShare] = useState('')
    const [listSearchShare, setListSearchShare] = useState([])
    const [listUserChoose, setListUserChoose] = useState([])



    useEffect(() => {
        const fetchStorage = async () => {
            const response1 = await getShareWithMe(userId);
            if (response1.statusCode === 200) {
                const listFolders = response1.metadata.listShareWithMe;
                const response2 = await getListStar(userId)

                if (response2.statusCode === 200) {

                    const listStar = response2.metadata.listStar;

                    const folderIds = listStar?.folderId?.map(folder => folder._id);
                    const fileIds = listStar?.fileId?.map(folder => folder._id);
                    const listStarIds = [
                        ...(Array.isArray(folderIds) ? folderIds : []),
                        ...(Array.isArray(fileIds) ? fileIds : [])
                    ];

                    listFolders.map(item => {
                        if (listStarIds.includes(item._id)) {
                            item.isStar = true
                        } else {
                            item.isStar = false
                        }
                    })

                    setListShareWithMe(listFolders)
                }
            }
        }
        fetchStorage();
    }, [userId, refreshFolder])

    const fetchListSearch = async () => {
        const response = await getListUserSearchByUsername(userShare);
        if (response.statusCode === 200) {
            setListSearchShare(response.metadata.listUser)
        }
    }
    useEffect(() => {
        if (userShare) {
            fetchListSearch()
        }
    }, [userShare])


    const handleClickFolder = (folderId) => {
        dispatch(setCurrentFolder({ currentFolderId: folderId }))
        navigate(`/share-with-me/${folderId}`)
    }

    const handleClickFile = (fileId) => {
        console.log(fileId);
    }


    const handleCheckPermissionShare = async (e, id) => {
        e.stopPropagation();
        const response = await checkPermissionShare({ folderId: id, userId })
        if (response.statusCode === 200) {
            setIsShowShareData(true)
        }

    }

    const handleCancelShare = async () => {
        setIsShowShareData(false)
        setListSearchShare([])
        setUserShare('')
        setListUserChoose([])

    }


    const handleShareData = async (id) => {
        const listUserId = listUserChoose.map(item => item._id)

        const response = await shareDataforAnotherUser({ folderId: id, listUserId })
        if (response.statusCode === 200) {
            setIsShowShareData(false)
            setListSearchShare([])
            setUserShare('')
            setListUserChoose([])
        }
    }

    const handleClickChooseUser = async (user) => {

        const check = listUserChoose.filter((item) => item.username === user.username)


        if (_.isEmpty(check) && user._id !== userId) {
            setListUserChoose([...listUserChoose, user])
        }

        setUserShare('')
        setListSearchShare([])
    }

    const handleCancelChooseUser = (user) => {
        const listUserChooseUpdate = listUserChoose.filter(function (item) {
            return item !== user
        })

        setListUserChoose(listUserChooseUpdate)
    }

    const handleClickStar = async (folderId) => {
        const response = await addStar({ userId, folderId })
        if (response === 200) {

            dispatch(createFolder())
        }
    }

    const handleDisableStar = async (folderId) => {
        const response = await disableStar({ userId, folderId })
        if (response === 200) {
            dispatch(createFolder())
        }
    }


    return (
        <>
            <div className="home-container text-[#1F1F1F] pl-4">

                <div className="home-title  pt-[14px] pb-[6px] text-[24px]">
                    Share With Me
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
                            People
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
                        {listShareWithMe && <div>
                            {listShareWithMe.map((folder, index) => {
                                return (
                                    <>
                                        <Modal open={isShowShareData} width={512} okText='Done' onOk={() => handleShareData(folder._id)} onCancel={handleCancelShare}>
                                            <div className='text-[24px]'>
                                                {`Share "${folder.nameFolder ? folder.nameFolder : folder.nameFile}"`}
                                            </div>
                                            <input type="text" value={userShare} onChange={(e) => setUserShare(e.target.value)} className='border border-[#747775] outline-none rounded py-3 pl-3 w-full mt-4 mb-1 focus:border-[#0b57d0] focus:border-[2px]' placeholder='Add people, group, and calendar envents' />
                                            {!_.isEmpty(listSearchShare) && <div>
                                                <div className={userShare ? "bg-[#e9eef6] text-[#1F1F1F] text-[16px] py-1 shadow-lg absolute w-[90%] z-10" : 'hidden'}>
                                                    {listSearchShare && listSearchShare.map((user, index) => {
                                                        return (
                                                            <>
                                                                <div className="hover:bg-[#e0e5ec] pl-4" key={index} onClick={() => handleClickChooseUser(user)}>
                                                                    <div className="font-semibold">
                                                                        {user.username}
                                                                    </div>
                                                                    <div className="text-[#444746]">
                                                                        {user.email}
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )
                                                    })}
                                                </div>
                                            </div>}
                                            <div className="mt-4 " >
                                                {!_.isEmpty(listUserChoose) && listUserChoose.map((user, index) => {
                                                    return (
                                                        <>
                                                            <div className="inline-flex items-center gap-3 border border-[#757876] py-1 px-2 rounded-full mx-2 my-1" key={index}>
                                                                <div className="text-[#444746] cursor-default">
                                                                    {user.username}
                                                                </div>
                                                                <div className="hover:bg-[#e9eef6] hover:cursor-pointer rounded-full p-[2px]" onClick={() => handleCancelChooseUser(user)}>
                                                                    <svg focusable="false" width="18" height="18" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path></svg>
                                                                </div>
                                                            </div>

                                                        </>
                                                    )
                                                })}
                                            </div>

                                            <div>

                                            </div>

                                        </Modal>
                                        <div className="hover:bg-[#F0F4F8] group flex h-[48px] border-b-[1px] items-center text-[14px]" onDoubleClick={folder.nameFolder ? () => handleClickFolder(folder._id) : () => handleClickFile(folder._id)} key={index}>
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
                                                <div className="hover:cursor-pointer hover:bg-[#e9eef6] p-[6px] rounded-full" onClick={(e) => handleCheckPermissionShare(e, folder._id)}>
                                                    <svg width="18px" height="18px" viewBox="0 0 24 24" focusable="false" fill="currentColor" ><path d="M9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H3v-.99C3.2 16.29 6.3 15 9 15s5.8 1.29 6 2v1zm3-4v-3h-3V9h3V6h2v3h3v2h-3v3h-2z"></path></svg>
                                                </div>
                                                <div className="hover:cursor-pointer hover:bg-[#e9eef6] p-[6px] rounded-full">
                                                    <svg width="18px" height="18px" viewBox="0 0 24 24" focusable="false" fill="currentColor" ><path d="M4 15h2v3h12v-3h2v3c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2m11.59-8.41L13 12.17V4h-2v8.17L8.41 9.59 7 11l5 5 5-5-1.41-1.41z"></path></svg>
                                                </div>
                                                <div className="hover:cursor-default p-[6px] opacity-50">
                                                    <svg width="18px" height="18px" viewBox="0 0 24 24" focusable="false" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"></path><path d="M18.41 5.8L17.2 4.59c-.78-.78-2.05-.78-2.83 0l-2.68 2.68L3 15.96V20h4.04l8.74-8.74 2.63-2.63c.79-.78.79-2.05 0-2.83zM6.21 18H5v-1.21l8.66-8.66 1.21 1.21L6.21 18zM11 20l4-4h6v4H11z"></path></svg>
                                                </div>
                                                <div
                                                    className={`hover:cursor-pointer hover:bg-[#e9eef6] p-[6px] rounded-full ${folder.isStar ? '' : 'hidden'}`}
                                                    onClick={() => {
                                                        handleDisableStar(folder._id);
                                                        const updatedList = listShareWithMe.map((item) =>
                                                            item._id === folder._id
                                                                ? { ...item, isStar: !item.isStar }
                                                                : item
                                                        );
                                                        setListShareWithMe(updatedList);
                                                    }}
                                                >
                                                    <svg width="18px" height="18px" viewBox="0 0 24 24" focusable="false" fill="currentColor">
                                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                                                    </svg>
                                                </div>
                                                <div
                                                    className={`hover:cursor-pointer hover:bg-[#e9eef6] p-[6px] rounded-full ${!folder.isStar ? '' : 'hidden'}`}
                                                    onClick={() => {
                                                        handleClickStar(folder._id);
                                                        const updatedList = listShareWithMe.map((item) =>
                                                            item._id === folder._id
                                                                ? { ...item, isStar: !item.isStar }
                                                                : item
                                                        );
                                                        setListShareWithMe(updatedList);
                                                    }}
                                                >
                                                    <svg width="18px" height="18px" viewBox="0 0 24 24" focusable="false" fill="currentColor">
                                                        <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path>
                                                    </svg>
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

export default ShareWithMe