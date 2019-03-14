
<template>
  <div class="name">
      {{test}}
      <nuxt-link to="/">主页</nuxt-link>
  </div>
</template>

<script>
import api from '~/api'
export default {
    // middleware: 'auth',
  data () {
    return {
      test: []
    };
  },
  created () {
    console.log(this.$route, 'route')
  },
  head(){
      return{
        title:'測試頁面',
        meta:[
          {hid:'names',name:'news',content:'This is news page',id: 8}
        ]
      }
    },
    mounted() {
       api.tts.getAllConsume().then(res => {
         console.log(res, '成功')
         this.test = res
       }).catch(err => {
         console.log(err, '失败')
       })
    },
}

</script>
<style lang='scss' scoped>
.name{
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;

}
</style>