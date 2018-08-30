<template>
<div>
    <section class="topp">
      <header>Vue.js社区</header>
      <nav>
        <a href='/' @click.prevent="change('all')" :class="{active:tab==='all'}">全部</a>
        <a href='/' @click.prevent="change('share')" :class="{active:tab==='share'}">分享</a>
        <a href='/' @click.prevent="change('ask')" :class="{active:tab==='ask'}">问答</a>
        <a href='/' @click.prevent="change('job')" :class="{active:tab==='job'}">招聘</a>
        <a href='/' @click.prevent="change('weex')" :class="{active:tab==='weex'}">weex</a>
      </nav>
    </section>
    <loading v-if="$store.state.loadingFlag"></loading>
    <div v-else class="container">
        <div class="item" v-for="item in articles" :key="item.id">
            <img :src="item.author.avatar_url" :title="item.loginname">
            <div class="right">
                <div class="top">
                    <span class="zd active" v-if="item.top">置顶</span>
                    <span class="zd" v-else>{{ type[item.tab] }}</span>
                    <p><router-link :to="{path:'/detail',query:{id:item.id}}">{{item.title}}</router-link></p>
                </div>
                <div class="bottom">
                    <p class="num">
                        <span>{{ item.reply_count }}</span> <span>/{{ item.visit_count }}</span>
                    </p>
                    <p class="time">
                        {{item.last_reply_at|date}}
                    </p>
                </div>
            </div>
        </div>
        <div class="more">
            <span v-if="length"  @click="loadMore">加载更多</span>
            <span v-else>亲！没有数据啦...</span>
        </div>
    </div>
</div>
</template>

<script>
import { getAll } from '../api'
import loading from './base/loading.vue'
export default {
    name:"articles",
    components:{ loading },
    computed:{
        tab(){
            return this.$store.state.tab;
        }
    },
    data(){
        return {
            page:1,
            articles:[],
            type:{
                share:'分享',
                job:'招聘',
                ask:'问答',
                weex:'weex',
            },
            length:1
        }
    },
    created(){
        this.getArticles();
    },
    methods:{
        getArticles(){
            getAll(this.$store.state.tab,this.page).then(res=>{
                this.$store.commit('loading',false)
                if(res.data.data.length){
                    this.articles = [ ...this.articles , ...res.data.data ];
                }else{
                    this.length = res.data.length
                }
            })
        },
        loadMore(){
            this.page++;
            this.getArticles();
        },
        change(tab){ 
            this.$store.commit('changeTab',{tab});
            this.$store.commit('loading',true);
            this.page = 1;
            this.articles = [];
            this.length = 1;
            getAll(this.$store.state.tab,this.page).then(res=>{
                this.$store.commit('loading',false)
                if(res.data.data.length){
                    this.articles = [ ...this.articles , ...res.data.data ]
                }else{
                    this.length = res.data.length
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
.container{
    padding:0 5px;
    max-width:1170px;
    margin:120px auto 0;
    font-size:14px;
}
.topp{
  position: fixed;
  top:0;
  left:0;
  width:100%;
  background:#2196F3;
  color:#fff;
  z-index:1;
}
header{
  line-height: 80px;
  font-size:28px;
  text-align: center;
}
nav{
  display:flex;
  a{
    flex:1;
    color:#fff;
    text-align: center;
    padding-bottom:10px;
    font-size:13px;
    &.active{
      border-bottom:3px solid #ff4081;
    }
  }
}
.item{
    padding:10px 0;
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
                width:70%;
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
.more{
    text-align: center;
    line-height: 50px;
}
</style>
