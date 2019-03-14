export const state = () => ({
    crumbaList: [],
    clikCrumba: {}
})

export const mutations = {
    SetCrumba (state, data) {
        state.crumbaList = [data]
    },
    SetClickCrumba (state, data) {
        state.clikCrumba = data
    }
}