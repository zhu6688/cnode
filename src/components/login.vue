<template>
    <div class="login">
        <headd>登录</headd>
        <input type="text" placeholder="请输入accessToken" v-model="name"><br>
        <button @click="login">登录</button>
    </div>
</template>

<script>
import { login } from '../api'
import headd from './base/header'
    export default {
        components:{
            headd
        },
        data(){
            return {
                name:''
            }
        },
        create(){
            console.log(localStorage.getItem('path'))
        },
        methods:{
            login(){
                let path = localStorage.getItem('path');
                if(this.name){
                    login(this.name).then(res=>{
                        localStorage.setItem('loginName',res.data.success);
                        this.$router.push({path})
                    },err=>{
                        alert('登录失败')
                    }).catch(err=>{
                        console.log(err)
                    })
                }else{
                    alert('请输入accessToken')
                }
            }
        }
    }
</script>

<style scoped lang="less">
.login{
    max-width: 1170px;
    margin:0 auto;
    text-align: center;
    p{font-size:26px; text-align: center; line-height: 50px;}
    input{ 
        padding:10px  5px; 
        width:90%; 
        box-sizing: border-box; 
        border-radius: 4px;
        outline: none;
        border:1px solid #ccc;
    }
    button{
        width: 90%;
        height:30px;
        margin-top:20px;
        background:lightseagreen;
        border: none;
        color:#fff;
        border-radius: 4px;
    }
}
</style>