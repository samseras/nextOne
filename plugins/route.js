// // let token = global.sessionStorage.getItem('token') || ''
// console.log(global, 'global')
// // let token = ''
// import {getLocalStroage} from '~/util'
// console.log(getLocalStroage('token'), 'localStroage')
export default ({ app }) => {
    // app.router.beforeEach((to, from, next) => {
    //     next(true)
    //     console.log(to, 'totototot')
    //     console.log(from, 'fromfromfromfrom')
    //     // console.log(to, 'totototot')
    // })
//     app.router.beforeEach((to, from, next) => {
//         next(true)
//         let token = sessionStorage.getItem('token')
//         let role = JSON.parse(sessionStorage.getItem('role') || '[]')
//         if (token) {
//             if (to.path === '/login') {
//                 next()
//             }
//             if (role[0] == 1) {
//                 next()
//             } else {
//                 if (to.meta.id && role.includes(to.meta.id)) {
//                     next()
//                 } else if (to.meta.id) {
//                     next(from.path)
//                 }
//             }
//         } else {
//             next('/login')
//         }
//   }
}
