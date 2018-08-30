const mutations = {
    loading(state,flag){
        state.loadingFlag = flag;
    },
    changeTab(state,obj){
        state.tab = obj.tab;
    }
}


export default mutations;


