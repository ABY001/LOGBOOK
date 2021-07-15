<template>
  <a-layout id="components-layout-demo-responsive" style="height: 100vh">
    <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
    >
      <div>
        <a-row type="flex" justify="center" style="margin: 10px 0">
          <img :src="companyLogo"
        /></a-row>

        <div class="dp">
          <a-row type="flex" justify="center" style="padding: 50px 3px 20px">
            <img :src="user" style="margin:0 10px" />
            <span class="userfullname username"
              >{{ userDetails.fullname }}<br />{{
                timeTransform(det.startDate)
              }}</span
            >
          </a-row>
        </div>

        <div>
          <a-row type="flex" justify="center" class="usertype">
            <span style="margin:0 10px"> User Type:</span>
            <span class="username">Student</span>
          </a-row>
          <a-row type="flex" justify="center" class="usertype">
            <span style="margin:0 10px"> User Name: </span>
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>{{ userDetails.email }}</span>
              </template>
              <span class="username truncate">{{
                userDetails.email
              }}</span></a-tooltip
            >
          </a-row>
          <a-row type="flex" justify="center" class="usertype">
            <span style="margin:0 10px"> Matric Number: </span>
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>{{ det.matricNumber }}</span>
              </template>
              <span class="username truncate">{{
                det.matricNumber
              }}</span></a-tooltip
            >
          </a-row>
        </div>
      </div>
      <a-menu
        mode="inline"
        :default-selected-keys="['1']"
        style="margin-top: 8vh"
      >
        <a-menu-item key="1" @click="gotoPage('/student/my-logbook')">
          <img :src="icon2" class="navlink" />
          <span class="nav-text username">My Logbook</span>
        </a-menu-item>

        <a-menu-item key="2" @click="gotoPage('/student/record')">
          <img :src="icon4" class="navlink" />
          <span class="nav-text username">Daily activities</span>
        </a-menu-item>

        <a-menu-item key="3" @click="gotoPage('/student/profile')">
          <img :src="icon1" class="navlink" />
          <span class="nav-text username">Student's Profile</span>
        </a-menu-item>

        <a-menu-item key="4" @click="gotoPage('/student/scarfform')">
          <img :src="icon3" class="navlink" />
          <span class="nav-text username">Scaf Form</span>
        </a-menu-item>
      </a-menu>

      <div class="">
        <a-row type="flex" justify="center">
          <a-button
            block
            class="logout__style"
            @click="logOut()"
            :loading="loadingLog"
            v-if="showLogout"
          >
            <span class="logout"> Log out</span>
          </a-button>
        </a-row>
      </div>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 }">
        <a-row type="flex" justify="end">
          <a-button
            icon="search"
            disabled
            class="search-btn"
            style="height:46px; width: 150px; margin: 10px; font-size: 18px"
          >
            Search
          </a-button>
        </a-row>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div
          :style="{ padding: '24px', background: '#e8e8e8', height: '100%' }"
        >
          <Nuxt />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import moment from "moment";
import companyLogo from "~/assets/img/companyLogo.png";
import user from "~/assets/img/user.png";
import icon1 from "~/assets/data/icon1.svg";
import icon2 from "~/assets/data/icon2.svg";
import icon3 from "~/assets/data/icon3.svg";
import icon4 from "~/assets/data/icon4.svg";
export default {
  data() {
    return {
      companyLogo,
      user,
      icon1,
      icon2,
      icon3,
      icon4,
      showLogout: true,
      loadingLog: false
    };
  },
  computed: {
    userDetails() {
      return this.$store.state.login.login;
    },
    det() {
      return this.$store.state.studentDetails.user;
    }
  },
  methods: {
    timeTransform(time) {
      if (!time) return;

      const m = moment(time);

      return m.format("L");
    },
    onCollapse(collapsed, type) {
      collapsed ? (this.showLogout = false) : (this.showLogout = true);
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    },
    gotoPage(route) {
      this.$router.replace(route);
    },
    async logOut() {
      this.loadingLog = true;
      await this.$axios
        .post(`/api/v1/users/logout`)
        .then(res => {
          const { data } = res;
          this.loadingLog = false;
          console.log("payload", data);
          if (data.status == "OK") {
            this.$store.commit("login/setLogin", "");
            this.$notification.success({
              message: "Success",
              description: data.message
            });
            this.$router.replace(`/login`);
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
          this.loadingLog = false;
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
.ant-layout {
  background: #e8e8e8;
}
.ant-btn:hover,
.ant-btn:focus,
.ant-btn:active,
.ant-btn.active {
  text-decoration: none;
  background: #15aad9 !important;
  color: rgba(84, 79, 79, 0.42);
}
#components-layout-demo-responsive .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.ant-layout-content {
  height: calc(100vh - 64px) !important;
}
.ant-layout-sider {
  background: linear-gradient(180deg, #77eeee 0%, #15aad9 100%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.56);
  border-radius: 0px 20px 20px 0px;
  /* width: 312px !important;
  flex: 0 0 312px !important;
  max-width: 312px !important;
  min-width: 0px !important; */
}
.nav_name {
  font-weight: 500;
}
.ant-menu,
.ant-menu::after {
  background: linear-gradient(180deg, #77eeee 0%, #15aad9 100%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.56);
  border-radius: 0px 20px 20px 0px;
}
.usertype {
  margin: 15px 0;
  color: rgba(138, 134, 134, 0.46);
}
.userfullname {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: start;
}
.username {
  color: #ffffff;
}
.navlink {
  margin: -5px 10px 0px 10px;
}
.logout__style {
  background: linear-gradient(269.08deg, #afffff 18.44%, #15aad9 72.16%);
  box-shadow: 0px 10px 20px rgba(21, 170, 217, 0.32);
  border-radius: 5px;
  margin: 20px 0;
  height: 44.16px;
  width: 90px;
  position: absolute;
  bottom: 4vh;
}
.logout {
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
  color: #ffffff;
}
button.search-btn.ant-btn {
  color: rgba(21, 170, 217, 0.46);
  border: 2px solid rgba(21, 170, 217, 0.46);
  box-sizing: border-box;
  filter: drop-shadow(0px 4px 96px #e6e8ec);
}
.truncate {
  white-space: nowrap;
  max-width: 125px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ant-layout-sider-zero-width-trigger {
  background: linear-gradient(269.08deg, #afffff 18.44%, #15aad9 72.16%);
}
.ant-layout-sider-zero-width-trigger:hover
  .ant-layout-sider-zero-width-trigger:focus,
.ant-layout-sider-zero-width-trigger:active {
  background: linear-gradient(269.08deg, #afffff 18.44%, #15aad9 72.16%);
}
.ant-drawer-title {
  color: #15aad9;
  font-size: 26px;
}
.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
  background-color: #e6f7ff45;
}
</style>
