<template>
  <div id="app">
    
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="less">
.markdown-text{
  font-size:14px;
  padding:5px;
  padding-bottom:10px;
  overflow: hidden;
  white-space: pre-line;
  word-break: break-all;
  h2,h3{
    margin:5px 0;
  }
}
.markdown-text p{
    line-height: 24px;
    text-indent:2em;
    margin-bottom:5px;
}
</style>
