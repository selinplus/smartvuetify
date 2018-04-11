<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>烟台国税</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="登录" type="text" v-model="username"></v-text-field>
                  <v-alert outline transition="scale-transition" type="error" :value="showUsernameTip">
                      {{usernameTip}}
                  </v-alert>
                  <v-text-field prepend-icon="lock" name="password" label="密码" id="password" type="password" v-model="password"></v-text-field>
                  <v-alert outline transition="scale-transition" type="error" :value="showPasswordTip">
                      {{passwordTip}}
                  </v-alert>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
      username: "",
      password: "",
      usernameTip: "",
      passwordTip: "",
      showUsernameTip: false,
      showPasswordTip: false
    }),
    props: {
      source: String
    },
    methods: {
        login() {
            if (this.username == "" && this.password != "") {
                this.usernameTip = "用户名不能为空！！！";
                this.showUsernameTip = true
            } else if (this.password == "" && this.username != "") {
                this.passwordTip = "密码不能为空！！！";
                this.showPasswordTip = true;
            } else if (this.password == "" && this.username == "") {
                this.passwordTip = "密码不能为空！！！";
                this.showPasswordTip = true;
                this.usernameTip = "用户名不能为空！！！";
                this.showUsernameTip = true
            } else {
                this.$router.push("/main");
                this.$http.post("/login", { "username": this.username, "password": this.password }
)                   .then(res => {
                        console.log(res.data);
                        if (res.data.isLogin) {
                            // 返回数据类型 ：
                            // { "isLogin": true, "msg": "登录成功！！！" }
                            // { "isLogin": false, "msg": "用户名不存在！！！" }
                            // { "isLogin": false, "msg": "密码错误！！！" }
                            this.$router.push("/main");
                        }
                    })
            }
        }
    }
  }
</script>