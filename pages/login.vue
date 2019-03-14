
<template>
  <div class="login">
      <div class="loginFrom">
          <p><span>用户名：</span><input type="text" v-model="userName"></p>
          <p><span>密&nbsp;&nbsp;&nbsp;码：</span><input type="passWord" v-model="passWord" @keyup.enter="loginIn"></p>
          <input type="button" @click="loginIn" value="登录" id="submit" class="loginBtn">
      </div>
  </div>
</template>

<script>
import api from '~/api'
let Base64 = require('js-base64').Base64;
import { setCoolie } from '~/util'
export default {
    name: 'login',
    // middleware: 'auth',
  data () {
    return {
        userName: '',
        passWord: ''
    };
  },
  asyncData () {
    //   console.log(localStorage.getItem('token'), 'jkjkjkkkjkjkj')
  },
  methods: {
      loginIn () {
          if (this.userName.trim() === '') {
            
                    this.$message.error('请输入用户名')
                    return
                }
                if (this.passWord.trim() === '') {
                    
                    this.$message.error('请输入密码')
                    return
                }
                let obj = `BASIC ${Base64.encode(this.userName +  ":"+ this.passWord)}`
                
                 api.login.userLogin(obj).then(res => {
                     console.log(res, 'chenggong')
                    let aid = 'request-token'
                    setCoolie('token', res[aid])
                    if (res[aid] !== '') {
                        this.$router.push('/')
                    }
                    this.$message.success("登录成功，欢迎使用 Drore 智慧旅游云平台")
                    this.getUseRole()
                    // this.$store.commit('SET_USER_DETAIL_INFO', res)
                    // this.getUserDetailInfo(this.username)
                }).catch(err => {
                    console.log(err, '登录失败')
                    this.$message.info('用户名或密码错误')
                    this.checkCode = ''
                })
      },
      getUseRole () {
          api.login.getUserInfo().then(res => {
              console.log(res, '用戶詳情')
          }).catch(err => {
              console.log(err, 'kokokokoko')
          })
      }
  }
}

</script>
<style lang='scss'>
.login{
    width: 100%;
    height: 100%;
    background: greenyellow;
    position: relative;
    .loginFrom{
        width: rem(300);
        height: rem(300);
        border: 1px solid #ccc;
        border-radius: rem(5);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        p{
            width: 100%;
            height: rem(40);
            input{
                background:none;  
	            outline:none;  
                border:0px;
                border: 1px solid #ccc;
                border-radius: rem(3);
                padding: rem(5) rem(5);
            }
        }
        .loginBtn{
           background:none;  
	            outline:none;  
               border: 1px solid #ccc;
               padding: rem(5) rem(10);
               cursor: pointer;

        }
    }
}
</style>