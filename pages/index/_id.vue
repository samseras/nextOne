
<template>
  <div class="files">
      <div class="fileCrumba">
         <p v-for="(item, index) in crumbList" :key="index" @click="getCrumbItem(item, index)">
                <span>{{item.name}}</span>
                <span v-if="index !== crumbList.length - 1"> > </span>
         </p>
      </div>
      <div class="fileHeaders">
          <Header></Header>
      </div>
      <div class="fileContent">
          <Document></Document>
      </div>
  </div>
</template>

<script>
import api from '~/api'
import Header from '~/components/header'
import Document from '~/components/document'
export default {
    // middleware: 'auth',
    asyncData (context) {
    },
  data () {
    return {
        id: this.$route.params.id,
        crumbList: []
    };
  },
  watch: {
      '$route' () {
          this.id = this.$route.params.id
          this.getFileType()
      },
      '$store.state.file.crumbaList' () {
          this.crumbList = [...this.crumbList,...this.$store.state.file.crumbaList]
          console.log(this.crumbList, '结构后的')
      }
  },
  methods: {
      getFileType () {
        api.file.getFileType().then(res => {
        console.log(res, '请求成功')
        res.forEach(item => {
            item.name = item.type
            if (item.id === this.id) {
                this.crumbList.push(item)
            }
        })
      }).catch(err => {
        console.log(err, '请求失败')
        })
      },
      getCrumbItem (item, index) {
          if (index === this.crumbList.length - 1 && this.crumbList.length > 1) {
                    return
             }
             this.crumbList = this.crumbList.slice(0, index + 1)
             item.time = new Date().getTime()
             this.$store.commit('file/SetClickCrumba', item)
      }
  },
  mounted () {
      console.log(this.$route, 'route')
      this.getFileType()
  },
  components: {
      Header,
      Document
  }
}

</script>
<style lang='scss' scoped>
.files{
    width: 100%;
    height: 100%;
    .fileCrumba{
            width: 100%;
            padding: rem(16) 0 rem(17) rem(15);
            box-sizing: border-box;
            font-size: rem(16);
            color: #26bbf0;
            border-bottom:  1px solid #ccc;
            p{
                display: inline-block;
                margin-right: rem(5);
                cursor: pointer;
            }
        }
    .fileHeaders{
        width: 100%;
        height: rem(40);
        border-bottom: 2px solid #ccc;
    }
    .fileContent{
        width: 100%;
        height: calc(100% - 120px);
    }
}
</style>