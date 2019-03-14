<template>
  <div class="drore">
    <div class="leftMenu">
      <nuxt-link class="typeMenu" v-for="item in fileType" :key="item.id" :to="{params: {id: item.id}}">{{item.type}}</nuxt-link>
      <nuxt-link :to="{name: 'login'}">登录</nuxt-link>
      <nuxt-link :to="{name: 'name'}">测试</nuxt-link>
    </div>
    <div class="content">
      <nuxt/>
    </div>
  </div>
</template>

<script>
import api from '~/api'
export default {
// middleware: 'auth',
data () {
  return {
    fileType: []
  }
},
methods: {
  getFileType () {
    api.file.getFileType().then(res => {
      console.log(res, '请求成功')
      this.fileType = res
    }).catch(err => {
      console.log(err, '请求失败')
    })
  }
},
mounted() {
  this.getFileType()
},
}
</script>

<style lang="scss" scoped>
.drore{
    width: 100%;
    height: 100%;
    .leftMenu{
      width: rem(200);
      height: 100%;
      float: left;
      border-right: 1px solid #ccc;
      box-sizing: border-box;
      .typeMenu{
        display: block;
        width: 100%;
        height: rem(24);
        text-align: center;
        line-height: rem(24);
      }
    }
    .content{
      width: calc(100% - 200px);
      height: 100%;
      float: right;
    }
  }
</style>
