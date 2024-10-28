<template>
  <div v-show="auth" class="model">
    <!-- 遮罩层 -->
    <div class="mod" @click="close"></div>
    <div class="main">
      <!-- 弹窗登录 -->
      <div class="sign" v-if="auth == 'sign'">
        <div class="close">
          <div class="img" @click.stop="close">
            <img src="/close.png" />
          </div>
        </div>
        <div class="u-flex title">
          <template v-if="formType == 'login'">
            <div
              :class="{ active: !active }"
              class="u-m-r-40"
              @click.stop="active = 0"
            >
              账号登录
            </div>
            <div :class="{ active: active == 1 }" @click="active = 1">
              短信登录
            </div>
          </template>
          <template v-else>
            <div class="bold" v-if="formType == 'register'">注册</div>
            <div class="bold" v-if="formType == 'changepwd'">修改密码</div>
          </template>
        </div>
        <div class="form">
          <div class="flex-1">
            <div class="item" v-for="item in list[active]">
              <img :src="`/${item.icn}.png`" />
              <input
                class="flex-1"
                :type="item.type"
                v-model="form[item.key]"
                :placeholder="item.placeholder"
                @keyup.enter="submit()"
              />
              <div class="code" @click="getCode()" v-if="item.key == 'code'">
                {{ codeText }}
              </div>
            </div>
            <div class="u-flex u-m-t-10">
              <el-radio v-model="radio" :label="1"
                >我已阅读并同意
                <a
                  class="cc"
                  @click="
                    (radio = 1),
                      $router.push({
                        path: '/user/richHtml',
                        query: { path: 'index/userAgreement' },
                      })
                  "
                  >《用户协议》</a
                >和
                <a
                  class="cc"
                  @click="
                    (radio = 1),
                      $router.push({
                        path: '/user/richHtml',
                        query: { path: 'index/privacyAgreement' },
                      })
                  "
                  >《隐私政策》</a
                ></el-radio
              >
            </div>
          </div>
          <div class="foot">
            <div class="btn" @click="submit()">登录</div>
            <div class="u-flex u-row-between" v-if="formType == 'login'">
              <span class="c9" @click="(formType = 'register'), (active = 2)"
                >立即注册</span
              >
              <span class="c9" @click="(formType = 'changepwd'), (active = 2)"
                >修改密码</span
              >
            </div>
            <div class="u-flex u-row-center" v-else>
              <span class="c9" @click="(formType = 'login'), (active = 0)"
                >返回登录</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      formType: "login",
      codeText: "获取验证码",
      time: 0,
      form: {},
      list: [
        [
          {
            type: "text",
            key: "account",
            placeholder: "请输入账号",
            icn: 9,
          },
          {
            type: "password",
            key: "password",
            placeholder: "请输入密码",
            icn: 10,
          },
        ],
        [
          {
            type: "number",
            key: "mobile",
            placeholder: "请输入手机号",
            icn: 9,
          },
          {
            type: "text",
            key: "code",
            placeholder: "请输入验证码",
            icn: 2,
          },
        ],
        [
          {
            type: "number",
            key: "mobile",
            placeholder: "请输入手机号",
            icn: 9,
          },
          {
            type: "text",
            key: "code",
            placeholder: "请输入验证码",
            icn: 2,
          },
          {
            type: "password",
            key: "password",
            placeholder: "请输入密码",
            icn: 10,
          },
          {
            type: "password",
            key: "password2",
            placeholder: "请重复输入新密码",
            icn: 10,
          },
        ],
      ],
      radio: 0,
      routeList: ["/color-service/video", "/color-service/learn"],
    };
  },
  computed: {
    auth() {
      return this.$store.state.user.auth;
    },
  },
  methods: {
    close() {
      console.log(this.$route.path, this.routeList.includes(this.$route.path));

      if (this.routeList.includes(this.$route.path)) {
        this.$router.go(-1);
      }

      this.$store.commit("user/init", {
        key: "auth",
        data: false,
      });
    },
    submit() {
      let that = this,
        path = "";
      if (that.formType == "login") {
        path = "user/login";
        if (that.active) path = "user/mobilelogin";
      }
      if (that.formType == "register") path = "user/register";
      if (that.formType == "changepwd") path = "user/resetpwd";

      that.$axios.post(path, that.form).then((res) => {
        if (res.data.code) {
          that.$store.commit("user/init", {
            key: "userInfo",
            data: res.data.data.userinfo,
          });
          localStorage.setItem("user", JSON.stringify(res.data.data.userinfo));
          that.close();
        } else {
          console.log(res.data.msg);
          this.$confirm(res.data.msg, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          });
        }
      });
    },
    // 验证码
    getCode() {
      let that = this;
      console.log(that.form.mobile);

      if (that.time || !that.form.mobile) return;
      let obj = {
        event: that.formType,
        mobile: that.form.mobile,
      };
      that.$axios.post("/sms/send", obj).then((res) => {
        if (res.data.code) {
          that.time = 60;
          let timerId = setInterval(function () {
            that.codeText = that.time + "s后重新发送";
            that.time--;
            if (!that.time) {
              clearInterval(timerId);
              that.codeText = "重新发送";
            }
          }, 1000);

          // 清除定时器
        } else {
          console.log(res.data.msg);
        }
      });
    },
    jump(index) {
      sessionStorage.setItem("clr_active_id", index);
      this.$router.push("/color-service");
    },
  },
};
</script>

<style lang="scss" scoped>
.model {
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #7e7e7ead;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;

  .mod {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  .main {
    position: relative;
    z-index: 99;
  }
}

.sign {
  width: 439.1px;
  display: flex;
  flex-flow: column;
  min-height: 414.06px;
  border-radius: 13px;
  background: #ffffff;
  padding: 20px;
  margin: 0 auto;
  .title {
    width: 100%;
    justify-content: center;
    div {
      padding-bottom: 15px;
      font-family: Source Han Sans CN;
      font-size: 20px;
      line-height: 20px;
      color: #0b0807;
    }
    .active {
      border-bottom: 3px solid #0b0807;
      font-weight: bold;
    }
  }
  .form {
    width: 335.49px;
    flex: 1;
    padding: 10px 0;
    margin: 0 auto;
    position: relative;
    display: flex;
    flex-flow: column;
    justify-content: space-between;

    .foot {
      width: 100%;
      .btn {
        height: 49.25px;
        margin-bottom: 10px;
      }
    }
    .item {
      margin-top: 20px;
    }
    input,
    .item {
      display: flex;
      align-items: center;
      height: 42px;
      border-radius: 8px;
      background: #f0f4f7;
      padding: 0 10px;
      img {
        width: 14px;
        height: 14px;
      }
    }
  }
}

.close {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  .img {
    float: right;
    height: 25px;
    width: 25px;
    padding: 5px;
    box-sizing: border-box;
  }
  img {
    width: auto;
    height: 100%;
  }
}
</style>
