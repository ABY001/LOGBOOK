<template>
  <div style="background-color: #e8e8e8; padding: 20px;">
    <a-row :gutter="16">
      <a-col :span="4" :offset="0" v-for="user in users" :key="user._id">
        <a-tooltip placement="bottom">
          <template slot="title">
            <span>Click to view more details</span>
          </template>

          <a-card
            :bordered="false"
            @click="displayDetails(user)"
            style="padding:5px"
          >
            <a-row type="flex" justify="space-between" style="margin: 5px 0;">
              <div class="week">No. of weeks: {{ user.logbook.length }}</div>
              <!-- <div class="tag" v-if="user.isApproved == 'approved'">
                <img :src="approved" alt="tag" />
              </div>
              <div class="tag" v-else>
                <img :src="pending" alt="tag" />
              </div> -->
            </a-row>
            <a-row style="margin: 5px 0;">
              <span class="student-name">{{ user.fullname }}</span>
            </a-row>
            <a-row style="margin: 5px 0;">
              <span class="student-name">{{ user.matricNumber }}</span>
            </a-row>
          </a-card></a-tooltip
        >
      </a-col>
    </a-row>

    <a-modal
      :visible="isVisible"
      :footer="null"
      @cancel="handleCancel"
      width="75%"
    >
      <a-form-model
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        style="margin:2px 20px"
      >
        <a-form-model-item label="Fullname">
          <a-input size="large" disabled v-model="singleStudent.fullname" />
        </a-form-model-item>
        <a-form-model-item label="Company Name">
          <a-input size="large" disabled v-model="singleStudent.companyName" />
        </a-form-model-item>
        <a-form-model-item label="Email">
          <a-input size="large" disabled v-model="singleStudent.email" />
        </a-form-model-item>
        <a-form-model-item label="Gender">
          <a-input size="large" disabled v-model="singleStudent.gender" />
        </a-form-model-item>
        <a-form-model-item label="Matric Number">
          <a-input size="large" disabled v-model="singleStudent.matricNumber" />
        </a-form-model-item>
        <a-form-model-item label="Department">
          <a-input size="large" disabled v-model="singleStudent.department" />
        </a-form-model-item>
        <a-form-model-item label="Phonenumber">
          <a-input size="large" disabled v-model="singleStudent.phonenumber" />
        </a-form-model-item>
        <a-form-model-item label="Start Date">
          <a-input size="large" disabled v-model="startDate" />
        </a-form-model-item>
        <a-form-model-item label="Student's available weeks">
          <br />
          <a-row v-for="(log, index) in singleStudent.logbook" :key="index">
            <a-form-model-item :label="`Week ${++index}`"
              ><br />
              <a-form-model-item label="Project">
                <a-input size="large" disabled v-model="log.project" />
              </a-form-model-item>
              <a-form-model-item label="Comment">
                <a-input size="large" disabled v-model="log.comments" />
              </a-form-model-item>
              <a-form-model-item label="Available days">
                <a-input size="large" disabled v-model="log.days.length" />
              </a-form-model-item>
              <span v-if="log.isApproved != 'approved' && showBtn">
                <a-button
                  block
                  class="approve__style"
                  :loading="apploading"
                  @click="approve(log)"
                >
                  <span class="approve-btn">Approve</span>
                </a-button>
              </span>
            </a-form-model-item>
            <br />
          </a-row>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import moment from "moment";
import user from "~/assets/img/user.png";
import approved from "~/assets/img/approved.png";
import pending from "~/assets/img/pending.png";
export default {
  layout: "supAuthPage",
  data() {
    return {
      user,
      approved,
      pending,
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
      singleStudent: {},
      isVisible: false,
      apploading: false,
      startDate: null,
      showBtn: true
    };
  },
  computed: {
    token() {
      return this.$store.state.login.login.token;
    },
    users() {
      return this.$store.state.user.user;
    },
    id() {
      return this.$store.state.login.login.id;
    }
  },
  methods: {
    timeTransform(time) {
      if (!time) return;

      const m = moment(time);

      return m.format("L");
    },
    handleCancel() {
      this.isVisible = false;
    },
    displayDetails(user) {
      this.singleStudent = user;
      this.startDate = this.timeTransform(this.singleStudent.startDate);
      console.log(user);
      this.isVisible = true;
    },
    async approve(log) {
      this.apploading = true;
      log;
      this.$axios
        .put(
          `/api/v1/users/update/status`,
          {
            userID: this.singleStudent._id,
            documentID: log._id,
            status: "approved"
          },
          {
            headers: {
              "x-supervisor-token": this.token
            }
          }
        )
        .then(res => {
          const { data } = res;
          if (data.status == "OK") {
            this.$notification.success({
              message: "Success",
              description: data.message
            });
            this.showBtn = false;
            this.getUsers();
            this.apploading = false;
          } else {
            this.$notification.error({
              message: "Error",
              description: data.message
            });
          }
        })
        .catch(err => {
          const { response } = err;
          this.$notification.error({
            message: "Error",
            description: response.data.message || "Network Error"
          });
        });
    },
    getUsers() {
      this.$axios
        .get(
          "/api/v1/users",
          {
            params: {
              id: this.id
            }
          },
          {
            headers: {
              "x-supervisor-token": this.token
            }
          }
        )
        .then(res => {
          const { data } = res;
          if (data.status == "OK") {
            this.users = data.payload;
            this.$store.commit("logUser/setUser", this.users);
          } else if (data.status == "ERROR") {
            this.$notification.error({
              message: "Error",
              description: data.message
            });
            return;
          }
        })
        .catch(err => {
          // this.loading = false;
          const { response } = err;

          // this.authFailed = true;

          this.$notification.error({
            message: "Error",
            description: response
          });
        });
    }
  }
};
</script>

<style>
.profile_picture {
  width: 30px;
  height: 30px;
}
.student-name {
  font-weight: 600;
  font-size: 12px;
  color: #15aad9;
}
.week {
  font-weight: 600;
  font-size: 12px;
}
.approve__style {
  background: linear-gradient(269.08deg, #afffff 18.44%, #15aad9 72.16%);
  box-shadow: 0px 10px 20px rgba(21, 170, 217, 0.32);
  border-radius: 5px;
  margin: 20px 0;
  height: 44.16px;
  max-width: 150px;
}
.approve-btn {
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
  color: #ffffff;
}
</style>
