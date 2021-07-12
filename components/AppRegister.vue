<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header style="height:64px"
        ><img :src="companyLogo"
      /></a-layout-header>

      <a-layout-content>
        <div style="background-color: #F5F5F5; padding: 20px">
          <a-row :gutter="16">
            <a-card :bordered="false" class="card__style">
              <a-col :lg="{ span: 12 }" :xs="{ span: 24 }">
                <a-row
                  type="flex"
                  justify="end"
                  :style="
                    !registerIsVisible
                      ? { margin: '15px 20px' }
                      : { margin: '15px 20px 5px 20px' }
                  "
                >
                  <a-button
                    class="registration-toggleon"
                    type="link"
                    @click="activateLogin"
                  >
                    Login
                  </a-button>
                  <a-button
                    type="link"
                    class="registration-toggleon"
                    @click="activateSignup"
                  >
                    Sign up
                  </a-button>
                </a-row>
                <span v-if="registerIsVisible">
                  <a-row>
                    <div class="login-text">REGISTER</div>
                  </a-row>
                  <a-row>
                    <a-form style="margin-top: 12px">
                      <a-row dense class="ma-0 pa-3">
                        <a-input
                          size="large"
                          v-model="fullname"
                          placeholder="Full Name"
                          :rules="[v => !!v || 'Fullname is required']"
                        >
                        </a-input>
                      </a-row>

                      <a-row dense class="ma-3 pa-3">
                        <a-input
                          size="large"
                          v-model="adminEmail"
                          placeholder="Email"
                          type="email"
                          :rules="[
                            v => !!v || 'Email is required',
                            v => emailValidation(v) || 'Email is invalid'
                          ]"
                        >
                        </a-input>
                      </a-row>
                      <a-row dense class="ma-0 pa-3">
                        <a-input
                          size="large"
                          v-model="phonenumber"
                          placeholder="Phone Number"
                          :rules="[v => !!v || 'Please enter your phonenumber']"
                        >
                        </a-input>
                      </a-row>
                      <a-row dense class="ma-0 pa-3">
                        <a-input
                          size="large"
                          v-model="companyName"
                          placeholder="Company Name"
                          :rules="[
                            v => !!v || 'Please enter your company name'
                          ]"
                        >
                        </a-input>
                      </a-row>
                      <a-row dense class="ma-0 pa-3">
                        <a-input
                          size="large"
                          v-model="position"
                          placeholder="Position"
                          :rules="[v => !!v || 'Please enter your position']"
                        >
                        </a-input>
                      </a-row>
                      <a-row dense class="ma-0 pa-3">
                        <a-input
                          size="large"
                          v-model="department"
                          placeholder="Department"
                          :rules="[v => !!v || 'Please enter your department']"
                        >
                        </a-input> </a-row
                      ><a-row>
                        <a-select
                          size="large"
                          v-model="gender"
                          placeholder="Gender"
                          :rules="[v => !!v || 'Please enter your gender']"
                        >
                          <a-select-option value="male"> Male </a-select-option>
                          <a-select-option value="female">
                            Female
                          </a-select-option>
                        </a-select>
                      </a-row>
                      <a-row>
                        <a-input-password
                          size="large"
                          class="passworded"
                          v-model="password"
                          placeholder="New Password"
                          :rules="[
                            v => !!v || 'Password is required',
                            v =>
                              (!!v && v.length >= 8) ||
                              'Password must be more than 8 characters'
                          ]"
                        >
                        </a-input-password>
                      </a-row>
                      <!-- <a-row>
                        <a-input-password
                          size="large"
                          class="passworded"
                          v-model="password2"
                          placeholder="Retype Password"
                          :rules="[
                            v => !!v || 'Passwords don\'t match',
                            v => v == password || 'Passwords don\'t match'
                          ]"
                        >
                        </a-input-password>
                      </a-row> -->
                      <a-row type="flex" justify="start">
                        <a-button
                          :loading="loading"
                          large
                          block
                          class="button__style"
                          @click="processSupervisor()"
                        >
                          <span class="register"> Register</span>
                        </a-button>
                      </a-row>
                    </a-form></a-row
                  ></span
                >
                <span v-else style="align-items:center;">
                  <a-row>
                    <div class="login-text">SIGN IN</div>
                  </a-row>
                  <a-row>
                    <div class="login-subtext">
                      Sign in to continue our application as?
                    </div>
                  </a-row>

                  <a-row style="margin-top:20px">
                    <a-col :span="12">
                      <a-button block class="sign-in__style" @click="supBtn">
                        <span class="sign-in"> A SUPERVISOR</span>
                      </a-button></a-col
                    >
                    <a-col :span="12">
                      <a-button block class="sign-in__style" @click="stud">
                        <span class="sign-in"> A STUDENT</span>
                      </a-button></a-col
                    ></a-row
                  >
                  <a-row>
                    <a-form style="margin-top: 30px">
                      <a-row dense class="ma-3 pa-3">
                        <a-input
                          size="large"
                          v-model="adminEmail"
                          :disabled="!enableField"
                          placeholder="Email"
                          type="email"
                          :rules="[
                            v => !!v || 'Email is required',
                            v => emailValidation(v) || 'Email is invalid'
                          ]"
                        >
                        </a-input>
                      </a-row>
                      <a-row>
                        <a-input-password
                          size="large"
                          class="passworded"
                          v-model="password"
                          :disabled="!enableField"
                          placeholder="New Password"
                          :rules="[
                            v => !!v || 'Password is required',
                            v =>
                              (!!v && v.length >= 8) ||
                              'Password must be more than 8 characters'
                          ]"
                        >
                        </a-input-password>
                      </a-row>
                      <a-row type="flex" justify="start">
                        <a-button
                          :disabled="
                            password === '' || adminEmail === '' || !enableField
                          "
                          :loading="loading"
                          large
                          block
                          class="button__style"
                          @click="login()"
                        >
                          <span class="register"> Sign in {{ signIn }}</span>
                        </a-button>
                      </a-row>
                    </a-form></a-row
                  >
                </span>
              </a-col>

              <a-col
                :lg="{ span: 12 }"
                :xs="{ span: 0 }"
                style="background: linear-gradient(180deg, #77EEEE 0%, #15AAD9 100%); border-radius: 0px 10px 10px 0px; height:100%"
              >
                <div class="register-img">
                  <a-row type="flex" justify="center">
                    <img :src="sideImage" class="image-style"
                  /></a-row>
                </div> </a-col
            ></a-card>
          </a-row></div></a-layout-content
    ></a-layout>
  </div>
</template>
<script>
import sideImage from "~/assets/img/register-image.png";
import { emailValidation } from "~/assets/js/validation";
import companyLogo from "~/assets/img/companyLogo.png";
export default {
  name: "AppRegister",
  data() {
    return {
      companyLogo,
      sideImage,
      adminEmail: "",
      fullname: "",
      phonenumber: "",
      companyName: "",
      position: "",
      department: "",
      gender: undefined,
      password: "",
      // password2: "",
      loading: false,
      registerIsVisible: false,
      isStudent: false,
      enableField: false,
      signIn: ""
    };
  },
  methods: {
    emailValidation,
    activateSignup() {
      this.registerIsVisible = true;
    },
    activateLogin() {
      this.registerIsVisible = false;
    },
    supBtn() {
      this.isStudent = false;
      this.enableField = true;
      this.signIn = "as supervisor";
    },
    stud() {
      this.isStudent = true;
      this.enableField = true;
      this.signIn = "as student";
    },
    async processSupervisor() {
      this.loading = true;
      if (
        this.adminEmail == "" ||
        this.password == "" ||
        // this.password2 == "" ||
        this.fullname == "" ||
        this.phonenumber == "" ||
        this.companyName == "" ||
        this.position == "" ||
        this.department == "" ||
        this.gender == undefined
      ) {
        this.$notification.error({
          message: "Warning",
          description: "Kindly fill all the fields"
        });
        this.loading = false;
        return;
        // } else if (this.password2 != this.password) {
        //   this.$notification.error({
        //     message: "Error",
        //     description: "Password do not match"
        //   });
        //   this.loading = false;
        //   return;
      } else {
        await this.$axios
          //https:logbook-backend.herokuapp.com/api/v1/supervisors
          .post("/api/v1/supervisors", {
            email: this.adminEmail,
            password: this.password,
            fullname: this.fullname,
            phonenumber: this.phonenumber,
            companyName: this.companyName,
            position: this.position,
            department: this.department,
            gender: this.gender
          })
          .then(res => {
            const { data } = res;
            this.loading = false;
            // console.log("res", res);
            if (res.data.status == "OK") {
              this.$notification.success({
                message: "Success",
                description: data.message
              });
              this.activateLogin();

              // this.$router.replace(`/admin/overview`);
            } else if (res.data.status == "ERROR") {
              this.authFailed = true;
              this.$notification.error({
                message: "Error",
                description: data.message
              });
            }
          })
          .catch(err => {
            this.loading = false;
            console.log("res", err);
            // const { response, message } = err;
            this.authFailed = true;
            this.$notification.error({
              message: "Error",
              description: "Network error"
            });

            // this.$store.commit("admin/setAdmin", null, false);
          });
      }
    },
    async login() {
      this.loading = true;
      await this.$axios
        .post(`/api/v1/${this.isStudent ? "users" : "supervisors"}/login`, {
          email: this.adminEmail,
          password: this.password
        })
        .then(res => {
          const { data } = res;
          this.loading = false;
          console.log("payload", data);
          if (data.status == "OK") {
            this.$store.commit("login/setLogin", data.payload);
            if (data.payload.isSupervisor)
              this.$router.replace(`/supervisor/my-students`);
            else this.$router.replace(`/student/my-logbook`);
            this.$notification.success({
              message: "Success",
              description: data.message
            });

            // this.$router.replace(`/admin/overview`);
          } else if (data.status == "ERROR") {
            this.authFailed = true;
            // this.$store.commit("admin/setAdmin", null, false);
            this.$notification.error({
              message: "Error",
              description: data.message
            });
            return;
          }
        })
        .catch(err => {
          this.loading = false;
          const { response } = err;
          if (response.data.message == "Authorization Denied/Invalid Token") {
            this.$notification.error({
              message: "Error",
              description: "You need to log in first"
            });
            // this.$router.replace(`/login`);
          } else
            this.$notification.error({
              message: "Error",
              description: response.data.message || "Network Error"
            });

          // this.$store.commit("admin/setAdmin", null, false);
        });
    }
  }
};
</script>
<style>
.button__style {
  background: linear-gradient(269.08deg, #afffff 18.44%, #15aad9 72.16%);
  box-shadow: 0px 10px 20px rgba(21, 170, 217, 0.32);
  border-radius: 5px;
  margin: 20px 0;
  height: 44.16px;
}
.register-img {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 100%;
  box-sizing: border-box;
}
.ant-card-body {
  padding: 0px !important;
  height: 100%;
}
.register {
  color: #ffffff;
  font-weight: bold;
  font-size: 20px;
}
.image-style {
  width: 80%;
}
.card__style {
  background: #ffffff;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  height: calc(80vh - 54px);
  margin: 10vh 10vw;
}
.ant-input {
  margin: 2px auto;
}
.ant-select {
  margin: 2px auto;
}
.ant-layout-header {
  background: #ffffff;
}
.ant-layout-content {
  height: calc(100vh - 64px) !important;
}
.login-text {
  font-weight: bold;
  font-size: 23px;
  line-height: 34px;
  color: #544f4f;
}
.login-subtext {
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: rgba(138, 134, 134, 0.85);
}
.registration-toggleon {
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  color: #15aad9;
  margin: 5px;
}
.registration-toggleoff {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: rgba(84, 79, 79, 0.42);
  margin: 5px;
}
</style>
