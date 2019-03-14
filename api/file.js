/*
文件模块api
* */
import axios from '~/plugins/http'
import {getUrl} from "./path";



const file = {
    getFileType () {
        return axios({
            method: 'get',
            url: getUrl(`/document/type`)
        })
    },
    updataFileType (params) {
        return axios({
            method: 'PUT',
            url: getUrl(`/document/type`),
            data: params
        })
    },
    createdFloder (data) {
        return axios({
            method: 'POST',
            url: getUrl('/document'),
            data: data
        })
    },
    deleteFile (data) {
        return axios({
            method: 'DELETE',
            url: getUrl('/document'),
            data: {
                ids: data
            }
        })
    },
    getFloderList (id) {
        return axios({
            method: 'GET',
            url: getUrl(`/document/type/dir?typeId=${id}`)
        })
    },
    getMoreFile (id) {
        return axios({
            method: 'GET',
            url: getUrl(`/document?folderId=${id}`)
        })
    },
    uploadFile (data) {
        return axios({
            method: 'POST',
            url: getUrl(`/document/upload`),
            processData : false,
            contentType : false,
            dataType: 'formData',
            data: data,
            // contentType: 'multipart/form-data',
        })
    },
    moveFile (data) {
        return axios({
            method: 'PUT',
            url: getUrl(`/document/move`),
            data: data
        })
    },
    editeFile (data) {
        return axios({
            method: 'PUT',
            url: getUrl(`/document`),
            data: data
        })
    },
    downloadFile (id) {
        return axios({
            method: 'GET',
            url: getUrl(`/document/download?id=${id}`),
            responseType: 'arraybuffer'
        })
    },
    searchAnything (pid, content) {
        return axios({
            method: 'GET',
            url: getUrl(`/search/document?typeId=${pid}&keywords=${content}`)
        })
    },
    previewFile (id) {
        return axios({
            method: 'GET',
            url: getUrl(`/document/preview?fileId=${id}`)
        })
    }

}

export default file
