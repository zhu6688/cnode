<template>
    <div class="header">
        <span @click="$router.go(-1)">←</span>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped lang="less">
.header{
    height:40px;
    line-height: 40px;
    background:#2196F3;
    font-size:16px;
    color:#fff;
    text-align: center;
    padding-left:10px;
    margin-bottom:10px;
    position: relative;

    span{
        position: absolute;
        left:10px;
    }
}
</style>