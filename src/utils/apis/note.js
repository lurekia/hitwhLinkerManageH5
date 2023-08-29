import service from "./axios";

// 得到笔记数量
export function getnotesNumberAPI() {
    return service({
        url: '/note',
        method: 'get',
    })
}
// 添加笔记
export function addnoteAPI(sortName,params) {
    return service({
        url : `/note/${sortName}`,
        method : 'post',
        data : params
    })
}
// // // 获得一个分类内的所有笔记
// // export function getnoteAPI(sortName) {
// //     return service({
// //         url: `/note/${sortName}`,
// //         method: 'get',
// //     })
// // }

// 删除分类内的笔记
export function deletenoteAPI(sortName,params) {
    return service({
        url: `/note/${sortName}`,
        method: 'delete',
        data : params
    })
}

// // 修改笔记内容
// export function changecontentAPI(sortName) {
//     return service({
//         url: `/note/${sortName}`,
//         method: 'put',
//     })
// }

// 修改笔记的标题及内容
export function changenoteAPI(sortName,oldTitle) {
    return service({
        url: `/note/${sortName}/${oldTitle}`,
        method: 'put',
    })
}

// // 获得笔记内容
// export function getcontentAPI(sortName,title) {
//     return service({
//         url: `/note/${sortName}/${title}`,
//         method: 'get',
//     })
// }

// // 模糊搜索笔记标题
// export function searchTitleAPI(title) {
//     return service({
//         url: `/note/searchTitle/${title}`,
//         method: 'get',
//     })
// }
// 模糊搜索笔记内容
// export function searchContentAPI(content) {
//     return service({
//         url: `/note/searchContent/${content}`,
//         method: 'get',
//     })
// }
// 分页查询笔记标题
export function searchPageAPI(sortName,title,page_index,page_size) {
    return service({
        url: `note/searchTitle/${sortName}/${title}/${page_index}/${page_size}`,
        method: 'get',
    })
}