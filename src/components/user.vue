<template>
    <div class="container">
        <headd>用户信息</headd>
        <div class="top">
            <div class="crumbs">
                <router-link to="/">主页</router-link> / 
                <span>用户信息</span>
            </div>
            <div class="user">
                <div class="par">
                    <img :src="users.avatar_url" class="pic">
                    <span class="name">{{ users.loginname }}</span>
                    <span class="jf">{{users.score}}积分</span>
                </div>
                <p class="time">注册时间 &nbsp;&nbsp; {{ users.create_at | date }}</p>
            </div>
        </div>
        <div class="create">
            <p class="title">最新创建的话题</p>
            <div class="item" v-for="item in users.recent_topics" :key="item.id">
                <img :src="item.author.avatar_url" :title="item.author.loginname">
                <div class="right">
                    <div class="top">
                        <p><router-link :to="{path:'/detail',query:{id:item.id}}">{{item.title}}</router-link></p>
                    </div>
                    <div class="bottom">
                        <p class="time">
                            {{item.last_reply_at|date}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="join">
            <p class="title">最近参与的话题</p>
            <div class="item" v-for="item in users.recent_replies" :key="item.id">
                <img :src="item.author.avatar_url" :title="item.author.loginname">
                <div class="right">
                    <div class="top">
                        <p><router-link :to="{path:'/detail',query:{id:item.id}}">{{item.title}}</router-link></p>
                    </div>
                    <div class="bottom">
                        <p class="time">
                            {{item.last_reply_at|date}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getUserInfo } from '../api'
import headd from './base/header'
    export default {
        components:{headd},
        data(){
            return {
                name:this.$route.params.name,
                join:[],
                create:[],
                users:{}
            }
        },
        created(){
            this.getUser();
        },
        methods:{
            getUser(){
                getUserInfo(this.name).then(res=>{
                    this.users = res.data.data;
                    this.join = res.data.data.recent_replies;
                    this.create = res.data.data.recent_topics;
                    console.log(res)
                })
            }
        }
    }
</script>

<style scoped lang="less">
.container{
    font-size:14px;
    max-width: 1170px;
    margin:0 auto;
}
.crumbs{
    border-bottom:1px solid #ccc;
    line-height: 30px;
    background:#f5f5f5;
    padding:0 5px;
    a{
        color:blue;
        &:hover{
            text-decoration: underline;
        }
    }
}
.user {
    padding:10px 5px 0;
    .par{
        display:flex;
        align-items: center;
        img{
            width:60px;
            height:60px;
            margin-right:20px;
        }
        .jf{
            font-size:16px;color:red;
            margin-left:20px;
        }
    }
    .time{
        color:#ccc;
        line-height: 1.5;
    }
}
.title{
    height:40px;
    line-height: 40px;
    background:#eee;
    padding:0 5px;
    margin-top:10px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}
.item{
    padding:10px 5px;
    border-bottom:1px dotted #ccc;
    display:flex;
    img{
        width:45px;
        height:45px;
        display:block;
        margin-right:10px;
    }
    .right{
        flex:1;
        overflow: hidden;
        .top{
            margin-bottom:5px;
            display:flex;
            span{
                margin-right:10px;
                padding:2px 5px;
                background:#ccc;
                border-radius: 2px;
                &.active{
                    background:#369219;
                    color:#fff;
                }
            }
            p{
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                width:90%;
            }
            a{
                position: relative;
                color:#333;
                &::after{
                    position: absolute;
                    content:'';
                    bottom:0;
                    left:0;
                    height:3px;
                    width:100%;
                    background:#2196F3;
                    transition:all 0.3s;
                    transform:scale(0);
                }
                &:hover::after{
                    transform:scale(1);
                }
            }
        }
        .bottom{
            display:flex;
            justify-content:space-between;
        }
    }
}
</style>