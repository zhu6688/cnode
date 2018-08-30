import Vue from 'vue'


import moment from 'moment'
moment.locale('zh-cn')

Vue.filter('date',function(str){
    return moment(str).fromNow()
})








