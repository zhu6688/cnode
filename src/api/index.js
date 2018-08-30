import axios from 'axios'


axios.defaults.baseURL  = 'https://www.vue-js.com/api/v1';


// 首页的全部列表信息
export const getAll = (tab,page)=>{
    return axios.get(`/topics?tab=${tab}&page=${page}`)
}

// 获取详情页的信息
export const getDetail = (id)=>{
    return axios.get(`/topic/${id}`)
}

// 获取用户信息
export const getUserInfo = (name)=>{
    return axios.get(`/user/${name}`)
}



// 登录
export const login = (accesstoken)=>{
    return axios.post('/accesstoken',{
        accesstoken
    })
}


