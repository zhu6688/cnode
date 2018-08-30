<template>
    <div class="container">
        <div class="top">
            <h3>{{datas.title}}</h3>
            <div>
                <span>作者: <router-link :to="{path:'/user/'+author.loginname}">{{author.loginname}}</router-link> </span>
                <span>发布时间：{{datas.create_at|date}}</span>
            </div>
            <p class="btn" :class="{btn2:active}" @click="collect()" action="collect" ref="collect">{{zt}}</p>
        </div>
        <div v-html="htmls"></div>
        <div class="list" v-for="(list,index) in replies" :key="list.id">
            <img :src="list.author.avatar_url">
            <div class="right">
                <span class="name">{{list.author.loginname}}</span> <span>{{index+1}}楼&nbsp;&nbsp;{{list.create_at|date}}</span>
                <div v-html="list.content"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { getDetail  } from '../api'
import axios from 'axios'
export default {
    data(){
        return {
            id : this.$route.query.id,
            htmls : '',
            datas:[],
            replies:[],
            author:{},
            zt:'加入收藏',
            active:false
        }
    },
    created(){  
        this.getDetails()
    },
    methods:{
        getDetails(){
            getDetail(this.id).then(res=>{
                this.datas = res.data.data;
                this.htmls = res.data.data.content;
                this.replies = res.data.data.replies;
                this.author = res.data.data.author;
            })
        },
        collect(){
            if(localStorage.getItem('loginName')){
                // 收藏主体
                let action = this.$refs.collect.getAttribute('action');
                axios.post(`/topic/${action}`,{
                    accesstoken:'7a042623-3857-4e76-bb4c-2f6d0857a6d7',
                    topic_id:this.id
                }).then(res=>{
                    if(res.data.success){
                        if('collect'===action){ //收藏主题
                            //alert('收藏成功')
                            this.zt = '取消收藏';
                            this.active=true;
                            action = this.$refs.collect.setAttribute('action','de_collect');
                        }else if('de_collect'===action){ //取消主题
                            //alert('取消收藏成功')
                            this.zt = '加入收藏';
                            this.active=false;
                            action = this.$refs.collect.setAttribute('action','collect');
                        }
                    }
                })
            }else{
                this.$router.push('/login')
            }
        }
    }
}
</script>

<style scoped lang="less">
.container{
    max-width:1170px;
    margin:0 auto;
    font-size:14px;
}
.top{
    border-bottom:1px solid #ccc;
    text-align: center;
    h3{
        margin:15px 0 5px; 
    }
    div{
        display:flex;
        justify-content:space-around;
        margin-bottom: 5px;
    }
}
.btn{
    padding:5px 10px;
    background:#369219;
    color:#fff;
    margin:5px auto;
}
.btn2{
    background:#ccc;
    color:#000;
}
.list{
    display: flex;
    padding:10px 5px;
    border-bottom:1px dashed #ccc;
    img{
        width:45px;
        height:45px;
        margin-right:10px;
    }
    .right{
        color:#79b6f7;
        .name{
            color:#000;
        }
    }
}
</style>
