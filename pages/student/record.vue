<template>
  <div style="background: #ffffff; padding: 75px">
    <a-row type="flex" justify="center">
      <div class="activities-heading">
        STUDENT’S DAILY RECORD OF ACTIVITIES
      </div></a-row
    >
    <a-row class="subheading">
      <a-col :span="7">
        <div>
          Month of Siwes Commencement:
        </div></a-col
      ><a-col :span="7">
        <div>
          <a-input
            class="weekly__job"
            placeholder="..............................................................................................................................................................................................................................................................."
            :disabled="month"
            v-model="month"
          /></div
      ></a-col>

      <a-col :span="5"> <div>&ensp; Week No:</div></a-col
      ><a-col :span="5">
        <div>
          <a-input
            class="weekly__job"
            placeholder="..............................................................................................................................................................................................................................................................."
            :disabled="week"
            v-model="week"
          /></div
      ></a-col>
    </a-row>

    <a-row type="flex" justify="center">
      <a-card>
        <a-card-grid style="width:15%;text-align:center" :hoverable="false">
          <span class="card-heading "> DAYS</span>
        </a-card-grid>
        <a-card-grid style="width:85%;text-align:center" :hoverable="false">
          <span class="card-heading "> NATURE OF WORK</span>
        </a-card-grid>

        <a-card-grid style="width:15%;text-align:center" :hoverable="false">
          <span class="days"> MONDAY</span>
        </a-card-grid>
        <a-card-grid
          style="width:85%;text-align:center"
          class="activity"
          :hoverable="false"
        >
          <a-input class="activity_input" v-model="monday" :disabled="monday" />
        </a-card-grid>

        <a-card-grid style="width:15%;text-align:center" :hoverable="false">
          <span class="days"> TUESDAY</span>
        </a-card-grid>
        <a-card-grid
          style="width:85%;text-align:center"
          class="activity"
          :hoverable="false"
        >
          <a-input
            class="activity_input"
            v-model="tuesday"
            :disabled="tuesday"
          />
        </a-card-grid>

        <a-card-grid style="width:15%;text-align:center" :hoverable="false">
          <span class="days"> WEDNESDAY</span>
        </a-card-grid>
        <a-card-grid
          style="width:85%;text-align:center"
          class="activity"
          :hoverable="false"
        >
          <a-input
            class="activity_input"
            v-model="wednesday"
            :disabled="wednesday"
          />
        </a-card-grid>

        <a-card-grid style="width:15%;text-align:center" :hoverable="false">
          <span class="days"> THURSDAY</span>
        </a-card-grid>
        <a-card-grid
          style="width:85%;text-align:center"
          class="activity"
          :hoverable="false"
        >
          <a-input
            class="activity_input"
            v-model="thursday"
            :disabled="thursday"
          />
        </a-card-grid>

        <a-card-grid style="width:15%;text-align:center" :hoverable="false">
          <span class="days">FRIDAY</span>
        </a-card-grid>
        <a-card-grid
          style="width:85%;text-align:center"
          class="activity"
          :hoverable="false"
        >
          <a-input class="activity_input" v-model="friday" :disabled="friday" />
        </a-card-grid>
      </a-card>
    </a-row>

    <a-row>
      <a-row class="baseheading">
        <a-col :span="7">
          <div>
            Project/Job for the week(if any):
          </div></a-col
        ><a-col :span="17">
          <div>
            <a-input
              class="weekly__job"
              placeholder="..............................................................................................................................................................................................................................................................."
              :disabled="project"
              v-model="project"
            /></div
        ></a-col>
      </a-row>

      <a-row class="baseheading">
        <a-col :span="7">
          <div>
            Unit/Section/Department:
          </div></a-col
        ><a-col :span="17">
          <div>
            <a-input
              class="weekly__job"
              placeholder="..............................................................................................................................................................................................................................................................."
              :disabled="dept"
              v-model="dept"
            /></div
        ></a-col>
      </a-row>

      <a-row class="baseheading">
        <a-col :span="7">
          <div>
            Comment by Student:
          </div></a-col
        ><a-col :span="17">
          <div>
            <a-input
              class="weekly__job"
              placeholder="..............................................................................................................................................................................................................................................................."
              :disabled="comment"
              v-model="comment"
            /></div
        ></a-col>
      </a-row>
    </a-row>

    <a-row type="flex" justify="space-between">
      <a-button
        block
        class="submit__style"
        :loading="loading"
        @click="createLogbook"
      >
        <span class="logout"> Create new logbook</span>
      </a-button>
      <a-button
        block
        class="submit__style"
        :loading="btnloading"
        @click="updateActivities"
      >
        <span class="logout"> Update daily activities</span>
      </a-button>
    </a-row>
  </div>
</template>

<script>
export default {
  layout: "studAuthPage",
  data() {
    return {
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      project: "",
      dept: "",
      comment: "",
      month: "",
      week: "",
      loading: false,
      btnloading: false
    };
  },
  computed: {
    token() {
      return this.$store.state.login.login.token;
    },
    logbook() {
      return this.$store.state.studentDetails.user.logbook[
        this.$store.state.studentDetails.user.logbook.length - 1
      ];
    }
  },
  methods: {
    returnLastLogbook() {
      if (this.logbook) {
        this.month = this.logbook.monthOfCommencement;
        this.week = this.logbook.weekNumber;
        this.project = this.logbook.project;
        this.dept = this.logbook.department;
        this.comment = this.logbook.comments;

        // this.logbook.days.filter(e => e.day == "monday")
        //   ? (this.monday = this.logbook.days.filter(
        //       e => e.day == "monday"
        //     )[0].contents)
        //   : "";

        // this.logbook.days.filter(e => e.day == "tuesday")
        //   ? (this.tuesday = this.logbook.days.filter(
        //       e => e.day == "tuesday"
        //     )[0].contents)
        //   : "";

        // this.logbook.days.filter(e => e.day == "wednesday")
        //   ? (this.wednesday = this.logbook.days.filter(
        //       e => e.day == "wednesday"
        //     )[0].contents)
        //   : "";

        // this.logbook.days.filter(e => e.day == "thursday")
        //   ? (this.thursday = this.logbook.days.filter(
        //       e => e.day == "thursday"
        //     )[0].contents)
        //   : "";

        // this.logbook.days.filter(e => e.day == "friday")
        //   ? (this.friday = this.logbook.days.filter(
        //       e => e.day == "friday"
        //     )[0].contents)
        //   : "";
      } else {
        return;
      }
    },
    async getProfileDetails() {
      this.$axios
        .get("/api/v1/users/profile", {
          headers: {
            "x-access-token": this.token
          }
        })
        .then(res => {
          const { data } = res;
          if (data.status == "OK") {
            this.$store.commit("studentDetails/setUser", data.payload);
          } else if (data.status == "ERROR") {
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
            this.$router.push(`/login`);
          } else {
            this.$notification.error({
              message: "Error",
              description: response.data.message || "Network Error"
            });
          }
        });
    },
    async createLogbook() {
      this.loading = true;
      this.$axios
        .put(
          `/api/v1/users/update/logbook`,
          {
            month: this.month,
            week: this.week,
            department: this.dept,
            comments: this.comment,
            project: this.project
          },
          {
            headers: {
              "x-access-token": this.token
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
            this.getProfileDetails();
            this.loading = false;
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
    async updateActivities() {
      this.btnloading = true;
      this.$axios
        .put(
          `/api/v1/users/update/record`,
          {
            day:
              this.monday == ""
                ? "monday"
                : this.monday != ""
                ? "tuesday"
                : this.tuesday != ""
                ? "wednesday"
                : this.wednesday != ""
                ? "thursday"
                : "friday",
            contents:
              this.monday == ""
                ? this.monday
                : this.monday != ""
                ? this.tuesday
                : this.tuesday != ""
                ? this.wednesday
                : this.wednesday != ""
                ? this.thursday
                : this.friday,

            documentID: this.logbook._id
          },
          {
            headers: {
              "x-access-token": this.token
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
            this.getProfileDetails();
            this.btnloading = false;
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
    }
  },
  mounted() {
    this.returnLastLogbook();
  }
};
</script>

<style>
.submit__style {
  background: linear-gradient(269.08deg, #afffff 18.44%, #15aad9 72.16%);
  box-shadow: 0px 10px 20px rgba(21, 170, 217, 0.32);
  border-radius: 5px;
  margin: 20px 0;
  height: 44.16px;
  max-width: 200px;
}
.logout {
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
  color: #ffffff;
}
.days {
  font-weight: 500;
  font-size: 12px;
}
.card-heading {
  font-weight: 500;
  font-size: 16px;
}
.ant-input {
  margin: 0px auto;
}
.activities-heading {
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
}
.subheading {
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  margin: 40px;
}
.baseheading {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  margin: 20px;
}
.ant-card-grid {
  border: 1px solid #15aad9;
}
.activity.ant-card-grid {
  padding: 0px;
}
input.weekly__job.ant-input {
  height: 100%;
  border: none;
  width: 100%;
}
input.activity_input.ant-input {
  padding: 24px;
  height: 100%;
  border: 1px solid #15aad9;
  border-radius: 0px;
}
</style>
