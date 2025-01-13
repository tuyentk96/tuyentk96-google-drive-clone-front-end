import { useEffect, useRef, useState } from 'react'
import './Navbar.scss'
import { Modal } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createNewFolder, uploadFiles } from '../../../service/uploadService'
import { createFolder, setCurrentFolder } from '../../../redux/auth/folderSlice'
const Navbar = () => {
    const NewRef = useRef('')
    const [isOnNew, setIsOnNew] = useState(false)
    const [isShowCreateNewFolder, setIsShowCreateNewFolder] = useState(false)
    const [newNameFolder, setNewNameFolder] = useState('')
    const storageId = useSelector(state => state.auth.storageId)
    const userId = useSelector(state => state.auth.userId)
    const role = useSelector(state => state.auth.role)
    const navigate = useNavigate()
    const [navbarSelect, setNavbarSelect] = useState('')
    const dispatch = useDispatch()
    const currentFolderId = useSelector(state => state.folder.currentFolderId)
    const [fildeUpload, setFileUpload] = useState([])
    const location = useLocation()

    useEffect(() => {
        setNavbarSelect(location.pathname.split('/')[1])
    }, [location])

    const handleOnClickNew = () => {
        setIsOnNew(true)
    }

    const handleCloseClickNew = () => {
        setIsOnNew(false)
    }

    const handleCloseNewFolder = () => {
        setIsShowCreateNewFolder(false)
    }

    const handleNewFolder = () => {
        setIsShowCreateNewFolder(true)
    }

    const handleFileUpload = async (event) => {
        const files = event.target.files;
        if (files.length === 0) return;

        const formData = new FormData();
        for (const file of files) {
            formData.append('files', file);
        }

        formData.append('userId', userId)
        formData.append('folderId', currentFolderId)

        const response = await uploadFiles(formData);
        if (response.statusCode === 200) {
            setIsOnNew(false)
            dispatch(createFolder())
            setFileUpload([])
        }
        setFileUpload([])
    }

    const handleUploadFolder = () => {
        console.log('handleUploadFolder');
    }


    const handleCreateNewFolder = async () => {
        const folderId = currentFolderId === storageId ? storageId : currentFolderId;

        const response = await createNewFolder({
            userId: userId,
            nameFolder: newNameFolder,
            folderId
        });

        if (response.statusCode === 200) {
            setNewNameFolder('');
            dispatch(createFolder());
            setIsShowCreateNewFolder(false);
        }

    }

    const handleOnClickMyDrive = () => {

        dispatch(setCurrentFolder({ currentFolderId: storageId }))
        navigate('/my-drive')
    }

    const handleOnClickTrash = () => {
        dispatch(setCurrentFolder({ currentFolderId: storageId }))
        navigate('/trash')
    }




    const handleOnClickHome = () => {

        navigate('/')
    }

    useEffect(() => {
        const clickOutSide = (event) => {
            if (NewRef.current && !NewRef.current.contains(event.target)) {
                handleCloseClickNew()
            }
        }

        // Thêm sự kiện click vào document
        document.addEventListener('mousedown', clickOutSide);

        // Dọn dẹp sự kiện khi component unmount
        return () => {
            document.removeEventListener('mousedown', clickOutSide);
        };
    }, [])


    const handleShareWithMe = () => {

        dispatch(setCurrentFolder({ currentFolderId: storageId }))
        navigate('/share-with-me')
    }

    const handleOnClickStar = () => {
        dispatch(setCurrentFolder({ currentFolderId: storageId }))
        navigate('/star')
    }

    const handleOnClickManagerUser = () => {
        dispatch(setCurrentFolder({ currentFolderId: storageId }))
        navigate('/manager-user')
    }

    const handleOnClickManagerFile = () => {
        dispatch(setCurrentFolder({ currentFolderId: storageId }))
        navigate('/manager-files')
    }


    const handleOnClickManagerTrash = () => {
        dispatch(setCurrentFolder({ currentFolderId: storageId }))
        navigate('/manager-trash')
    }

    const handleOnClickManagerFolders = () => {
        dispatch(setCurrentFolder({ currentFolderId: storageId }))
        navigate('/manager-folders')
    }


    return (
        <>
            <div className="w-[256px] navbar-container text-[#1F1F1F]">
                {role === 'USER' && <>
                    <Modal open={isShowCreateNewFolder} width={343} okText='Create' onOk={handleCreateNewFolder} onCancel={handleCloseNewFolder}>
                        <div className='text-[24px]'>
                            New folder
                        </div>
                        <input value={newNameFolder} onChange={(e) => setNewNameFolder(e.target.value)} type="text" className='border border-[#747775] outline-none rounded py-[6px] pl-3 w-full mt-4 mb-6 focus:border-[#0b57d0] focus:border-[2px]' placeholder='Untitled folder' />
                    </Modal>
                    <div className="pt-2 pb-4 px-4 ">
                        <div className="shadow-lg relative hover:bg-[#edf1fa] hover:cursor-pointer inline-flex gap-3 rounded-2xl items-center py-[18px] pr-5 pl-4" onClick={handleOnClickNew}>
                            <div>
                                <svg width="24" height="24" viewBox="0 0 24 24" focusable="false"><path d="M20 13h-7v7h-2v-7H4v-2h7V4h2v7h7v2z"></path></svg>
                            </div>

                            <div className="text-[14px] font-semibold" >
                                New
                            </div>
                            <div ref={NewRef} className={isOnNew ? 'absolute bg-white w-[300px] top-[0px] left-0 shadow-xl rounded-lg py-2 text-[14px]' : 'absolute hidden bg-white w-[300px] top-[0px] left-0 shadow-xl rounded-lg py-2 text-[14px]'}>
                                <div className=''>
                                    <div className='flex gap-3 px-2  hover:bg-[#dce1e8] py-1' onClick={handleNewFolder}>
                                        <div>
                                            <svg width="24px" height="24px" viewBox="0 0 24 24" focusable="false" fill="currentColor"><path d="M12 12h2v-2h2v2h2v2h-2v2h-2v-2h-2v-2zm10-4v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2l.01-12c0-1.1.89-2 1.99-2h6l2 2h8c1.1 0 2 .9 2 2zm-2 0H4v10h16V8z"></path></svg>
                                        </div>
                                        <div>New folder</div>
                                    </div>
                                </div>

                                <div className='border-t mt-2 border-t-[#c7c7c7]'>
                                    <label className='flex gap-3 mt-2 px-2 hover:bg-[#dce1e8] py-1'>
                                        <div>
                                            <svg width="24px" height="24px" viewBox="0 0 24 24" focusable="false" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"></path><path d="M8 15.01l1.41 1.41L11 14.84V19h2v-4.16l1.59 1.59L16 15.01 12.01 11z"></path></svg>
                                        </div>
                                        <div>
                                            File upload
                                        </div>
                                        <input type="file" multiple className='hidden' value={fildeUpload} onChange={handleFileUpload} />
                                    </label>
                                    <div className='flex gap-3 mt-2 px-2 hover:bg-[#dce1e8] py-1' onClick={handleUploadFolder}>
                                        <div>
                                            <svg width="24px" height="24px" viewBox="0 0 24 24" focusable="false" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10zM8 13.01l1.41 1.41L11 12.84V17h2v-4.16l1.59 1.59L16 13.01 12.01 9 8 13.01z"></path></svg>
                                        </div>
                                        <div>
                                            Folder upload
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='navbar-main ml-4 mr-[10px] mt-10'>
                            <div className={navbarSelect === '' ? 'navbar-child navbar-child-active' : 'navbar-child'} onClick={handleOnClickHome}>
                                <div>
                                    <svg height="24" width="24" viewBox="0 0 24 24" fill="#000000" focusable="false"><g><path d="M0,0h24v24H0V0z" fill="none"></path></g><g><polygon points="12,3 4,9 4,21 10,21 10,14 14,14 14,21 20,21 20,9"></polygon></g></svg>
                                </div>
                                <div>
                                    Home
                                </div>
                            </div>
                            <div className={navbarSelect === 'my-drive' ? 'navbar-child navbar-child-active' : 'navbar-child'} onClick={handleOnClickMyDrive}>
                                <div>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#000000" focusable="false"><path d="M9.05 15H15q.275 0 .5-.137.225-.138.35-.363l1.1-1.9q.125-.225.1-.5-.025-.275-.15-.5l-2.95-5.1q-.125-.225-.35-.363Q13.375 6 13.1 6h-2.2q-.275 0-.5.137-.225.138-.35.363L7.1 11.6q-.125.225-.125.5t.125.5l1.05 1.9q.125.25.375.375T9.05 15Zm1.2-3L12 9l1.75 3ZM3 17V4q0-.825.587-1.413Q4.175 2 5 2h14q.825 0 1.413.587Q21 3.175 21 4v13Zm2 5q-.825 0-1.413-.587Q3 20.825 3 20v-1h18v1q0 .825-.587 1.413Q19.825 22 19 22Z"></path></svg>
                                </div>
                                <div>
                                    My Drive
                                </div>
                            </div>

                            <div className={navbarSelect === 'share-with-me' ? 'navbar-child navbar-child-active' : 'navbar-child'} onClick={handleShareWithMe}>
                                <div>
                                    <svg width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M15 8c0-1.42-.5-2.73-1.33-3.76.42-.14.86-.24 1.33-.24 2.21 0 4 1.79 4 4s-1.79 4-4 4c-.43 0-.84-.09-1.23-.21-.03-.01-.06-.02-.1-.03A5.98 5.98 0 0 0 15 8zm1.66 5.13C18.03 14.06 19 15.32 19 17v3h4v-3c0-2.18-3.58-3.47-6.34-3.87zM9 4c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 9c2.67 0 8 1.34 8 4v3H1v-3c0-2.66 5.33-4 8-4z" /></svg>
                                </div>
                                <div>
                                    Shared with me
                                </div>
                            </div>

                            <div className={navbarSelect === 'star' ? 'navbar-child navbar-child-active' : 'navbar-child'} onClick={handleOnClickStar}>
                                <div className=''>
                                    <svg width="24" height="24" viewBox="0 0 24 24" focusable="false" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"></path><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                                </div>
                                <div>
                                    Starred
                                </div>
                            </div>

                            <div className={navbarSelect === 'trash' ? 'navbar-child navbar-child-active' : 'navbar-child'} onClick={handleOnClickTrash}>
                                <div>
                                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="#000000" focusable="false"><g><path d="M0,0h24v24H0V0z" fill="none"></path></g><g><path d="M15,4V3H9v1H4v2h1v13c0,1.1,0.9,2,2,2h10c1.1,0,2-0.9,2-2V6h1V4H15z M11,17H9V8h2V17z M15,17h-2V8h2V17z"></path></g></svg>
                                </div>
                                <div>
                                    Trash
                                </div>
                            </div>
                        </div>
                    </div></>}
                {role === 'ADMIN' && <div className='navbar-main ml-4 mr-[10px] mt-10'>
                    <div className={navbarSelect === '' ? 'navbar-child navbar-child-active' : 'navbar-child'} onClick={handleOnClickHome}>
                        <div>
                            <svg height="24" width="24" viewBox="0 0 24 24" fill="#000000" focusable="false"><g><path d="M0,0h24v24H0V0z" fill="none"></path></g><g><polygon points="12,3 4,9 4,21 10,21 10,14 14,14 14,21 20,21 20,9"></polygon></g></svg>
                        </div>
                        <div>
                            Home
                        </div>
                    </div>
                    <div className={navbarSelect === 'manager-user' ? 'navbar-child navbar-child-active' : 'navbar-child'} onClick={handleOnClickManagerUser}>
                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" focusable="false"><path d="M0 0h24v24H0z" fill="none"></path><path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"></path></svg>                        </div>
                        <div>
                            Manager User
                        </div>
                    </div>
                    <div className={navbarSelect === 'manager-files' ? 'navbar-child navbar-child-active' : 'navbar-child'} onClick={handleOnClickManagerFile}>
                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" focusable="false"><path d="M0 0h24v24H0z" fill="none"></path><path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"></path></svg>                        </div>
                        <div>
                            Manager Files
                        </div>
                    </div>
                    <div className={navbarSelect === 'manager-folders' ? 'navbar-child navbar-child-active' : 'navbar-child'} onClick={handleOnClickManagerFolders}>
                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" focusable="false"><path d="M0 0h24v24H0z" fill="none"></path><path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"></path></svg>                        </div>
                        <div>
                            Manager Folders
                        </div>
                    </div>
                    <div className={navbarSelect === 'manager-trash' ? 'navbar-child navbar-child-active' : 'navbar-child'} onClick={handleOnClickManagerTrash}>
                        <div>
                            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="#000000" focusable="false"><g><path d="M0,0h24v24H0V0z" fill="none"></path></g><g><path d="M15,4V3H9v1H4v2h1v13c0,1.1,0.9,2,2,2h10c1.1,0,2-0.9,2-2V6h1V4H15z M11,17H9V8h2V17z M15,17h-2V8h2V17z"></path></g></svg>
                        </div>
                        <div>
                            Manager Trash
                        </div>
                    </div>
                </div>}

                {role === 'USER' && <div className='ml-4 mr-[10px] w-[175px]'>
                    <div className='flex'>
                        <div className={'h-1 bg-[#0b57d0] w-[40%] rounded'}>

                        </div>
                        <div className='h-1 bg-gray-200 w-[60%] rounded'>

                        </div>
                    </div>
                    <div className='text-[14px] mt-2'>
                        1.0 Gb of 2.0 Gb used
                    </div>
                    <div className='mt-3'>
                        <div className='hover:cursor-pointer text-[14px] py-2 text-center rounded-3xl font-semibold text-[#0b57d0] border border-black '>
                            Get more storage
                        </div>
                    </div>
                </div>}
            </div>
        </>
    )
}

export default Navbar