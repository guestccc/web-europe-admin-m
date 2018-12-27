<template>
  <div class="container">
    <div class="top">
      <img
        src="../assets/images/pic_logo1.png"
        width="187px">
    </div>
    <div class="main">
      <div class="login-box">
        <div class="title-box-login">
          <span class="title">管理员登陆</span>
        </div>
        <div class="edit-main">
          <div class="edit-box">
            <img
              class="icon"
              src="../assets/images/ic_login_account.png">
            <div class="boder-one"/>
            <input
              class="input"
              placeholder="请输入账号" >
          </div>
          <div class="edit-box">
            <img
              class="icon"
              src="../assets/images/ic_login_password.png">
            <div class="boder-one"/>
            <input
              class="input"
              type="password"
              placeholder="请输入密码" >
          </div>
          <div class="verify-box">
            <div
              class="edit-box">
              <img
                class="icon"
                src="../assets/images/ic_login_check_code.png">
              <div class="boder-one"/>
              <input
                class="input"
                style="width: 0"
                placeholder="请输入验证码"
                maxlength="4" >
            </div>
            <img
              class="img-verify"
              arc="code"
              id="code"
              @click="event().onVerifyImgClicked()">
          </div>
          <el-button
            class="login-btn"
            @click="event().onLogin()">登录
          </el-button>
        </div>
      </div>
    </div>
    <div class="foot">
      <p>千色集团</p>
      <p>服务电话：400-888-888</p>
    </div>
  </div>
</template>

<script>

import { encrypt } from '../filters/filter'
import { SET_OPERATIONS_MAP } from '@/vuex/modules/base/mutation-types'

export default {
  data() {
    return {
      code: '',
      permissionList: [
        {
          name: '样例管理',
          children: [
            {
              name: '批量下载',
            },
            {
              name: '操作权限控制',
            },
          ],
        },
      ],
      operationList: [{
        name: '样例管理',
        operations: ['编辑', '删除', '导出'],
      }],
    };
  },

  created() {},

  mounted() {
    this.handler().refreshCode();
  },

  methods: {

    event() {
      const self = this;
      return {
        onVerifyImgClicked() {
          self.handler().refreshCode();
        },

        onLogin() {
          const jsonStrPer = JSON.stringify(self.permissionList)
          // 对权限列表进行加密
          const encryptPer = encrypt(jsonStrPer).toString()
          sessionStorage.setItem('permission', encryptPer)
          // 存储操作列表到store
          self.$store.commit(SET_OPERATIONS_MAP, self.operationList)
          self.$router.push({
            path: 'index',
          });
        },
      };
    },

    network() {
      return {
        getListA() {},
      };
    },

    handler() {
      const self = this;
      return {
        refreshCode() {
          // eslint-disable-next-line no-undef
          const res = verifyCode();
          const img = document.getElementById('code');
          img.src = res.dataURL;
          self.code = res.code;
        },
        list2Map(list) {
          const map = new Map()
          list.forEach((value) => {
            map.set(value.name, value.operations)
          })
          return map
        },
      };
    },
  },
  watch: {},
  computed: {},
};
</script>

<style scoped lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    .top {
      height: 95px;
      width: 100%;
      align-items: center;
      display: flex;
      img{
        margin-left: 26%;
        display: inline-block;
      }
    }
    .main {
      flex: 1;
      padding: 147px 0 138px 0;
      background: url(../assets/images/backgrou-img.jpg) center center fixed;
      background-size: cover;
      .login-box {
        width: 371px;
        height: 341px;
        margin: auto auto;
        background-color: #ffffff;
        .title-box-login {
          background: url(../assets/images/Oval_Copy_3@3x.png)  no-repeat;
          width: 100%;
          height: 58px;
          span.title {
            margin: 0 21px;
            line-height: 58px;
            font-size: 16px;
            color: #ffffff
          }
        }
        .edit-main{
          padding: 18px 17px 28px;
          .edit-box {
            display: flex;
            align-items: center;
            width: 312px;
            height: 45px;
            margin-bottom: 16px;
            padding: 0 12px;
            border-radius: 3px;
            border:1px solid rgba(32,53,128,0.16);
            img.icon {
              width: 17px;
              margin-right: 14px;
            }
            div.boder-one{
              width:0px;
              height:24px;
              border-left:1px solid rgba(216,221,233,1);
            }
            input.input {
              padding:0 14px;
              flex: 1;
              outline: none;
              border: none;
              font-size: 12px;
            }
          }
          .verify-box {
            position: relative;
            height: 40px;
            width: 336px;
            .edit-box {
              width: 160px;
              float: left;
              display: flex;
              align-items: center;
              height: 40px;
              margin: 0 auto;
              padding: 0 12px;
              border-radius: 3px;
              border:1px solid rgba(32,53,128,0.16);
              img.icon {
                width: 17px;
                margin-right: 14px;
              }
              div.boder-one{
                width:0px;
                height:24px;
                border-left:1px solid rgba(216,221,233,1);
              }
              input.input {
                flex: 1;
                outline: none;
                border: none;
              }
            }
            img#code.img-verify {
              float: left;
              width: 100px;
              height: 40px;
              margin-left: 20px;
            }
          }
          .login-btn {
            margin: 27px auto 28px auto;
            width:336px;
            height:45px;
            background:linear-gradient(90deg,rgba(192,0,0,1),rgba(153,0,0,1))!important;
            border-radius:3px;
            color: #ffffff;
          }
        }
      }
    }
    .foot {
      height: 54px;
      display: flex;
      padding: 27px 0 33px;
      font-size: 14px;
      flex-direction: column;
      align-items: center;
      p:first-child{
        margin: 0;
      }
      p:last-child{
        margin-top: 12px;
      }
    }
  }
</style>
