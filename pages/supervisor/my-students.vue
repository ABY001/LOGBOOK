<template>
  <div>
    <a-row type="flex" justify="end">
      <a-row type="flex" justify="end">
        <a-button block class="create_style" @click="openDrawer()">
          <span class="update-btn">Create student account </span>
        </a-button>
      </a-row>
    </a-row>

    <a-drawer
      :title="`${isViewMode ? 'View' : 'Create'}   Student Account`"
      :width="windowWidth >= 576 ? '75%' : '90%'"
      :visible="IsVisible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onCloseDrawer"
    >
      <a-form layout="vertical" hide-required-mark>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Student Full Name">
              <a-input
                size="large"
                v-model="fullname"
                :disabled="isViewMode"
                :rules="[v => !!v || 'Please enter student name']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Email">
              <a-input
                size="large"
                v-model="email"
                :disabled="isViewMode"
                :rules="[v => !!v || 'Please enter meal cost']"
              />
            </a-form-item> </a-col
        ></a-row>

        <a-row :gutter="16">
          <a-col :span="12" v-if="!isViewMode">
            <a-form-item label="Password">
              <a-input-password
                size="large"
                v-model="password"
                :rules="[
                  v => !!v || 'Password is required',
                  v =>
                    (!!v && v.length >= 8) ||
                    'Password must be more than 8 characters'
                ]"
              >
              </a-input-password></a-form-item
          ></a-col>

          <a-col :span="12" v-if="isViewMode">
            <a-form-item label="No. of logbook filled">
              <a-input
                size="large"
                v-model="logbook"
                disabled
                :rules="[v => !!v || 'Please enter meal cost']"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="Start date">
              <a-date-picker
                size="large"
                :disabled="isViewMode"
                style="width: 100%"
                v-model="startDate"
                :rules="[v => !!v || 'Please enter student start date']"
            /></a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Gender">
              <a-select
                size="large"
                :disabled="isViewMode"
                v-model="gender"
                :rules="[v => !!v || 'Please enter your gender']"
              >
                <a-select-option value="male"> Male </a-select-option>
                <a-select-option value="female">
                  Female
                </a-select-option>
              </a-select></a-form-item
            ></a-col
          >

          <a-col :span="12">
            <a-form-item label="Student Matric Number">
              <a-input
                size="large"
                :disabled="isViewMode"
                v-model="matricNumber"
                :rules="[v => !!v || 'Please enter Company Name']"
              />
            </a-form-item> </a-col
        ></a-row>

        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Company Name">
              <a-input
                size="large"
                :disabled="isViewMode"
                v-model="companyName"
                :rules="[v => !!v || 'Please enter Company Name']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Position">
              <a-input
                size="large"
                :disabled="isViewMode"
                v-model="position"
                :rules="[v => !!v || 'Please enter position']"
              />
            </a-form-item> </a-col
        ></a-row>

        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Department">
              <a-input
                size="large"
                :disabled="isViewMode"
                v-model="department"
                :rules="[v => !!v || 'Please enter department']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Student Phone Number">
              <a-input
                size="large"
                :disabled="isViewMode"
                v-model="phonenumber"
                :rules="[v => !!v || 'Please enter student phonenumber']"
              />
            </a-form-item> </a-col
        ></a-row>
      </a-form>
      <div
        v-if="!isViewMode"
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1
        }"
      >
        <a-button block class="cancel_style" @click="onCloseDrawer">
          <span class="cancel-btn"> Cancel</span>
        </a-button>
        <a-button
          block
          class="update__style"
          :loading="loading"
          @click="submit"
        >
          <span class="update-btn"> Submit</span>
        </a-button>
      </div>
    </a-drawer>

    <a-row style="margin: 30px 0px">
      <a-table :columns="columns" :data-source="users">
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="startDate" slot-scope="text">{{
          timeTransform(text)
        }}</span>
        <template slot="operation" slot-scope="text, record">
          <a-tooltip placement="bottom">
            <template slot="title">
              <span>Click to view more details</span>
            </template>
            <span style="margin:3px 0">
              <a-icon type="eye" @click="onView(record)"
            /></span>
          </a-tooltip>

          <a-tooltip placement="bottom">
            <template slot="title">
              <span>Click to delete this record</span>
            </template>
            <span style="margin:3px 0">
              <a-icon type="delete" @click="onDelete(record)"/></span
          ></a-tooltip>
        </template> </a-table
    ></a-row>
  </div>
</template>

<script>
import moment from "moment";
const columns = [
  // {
  //   title: "S/N",
  //   dataIndex: "index",
  //   key: "_id"
  // },
  {
    title: "Fullname",
    dataIndex: "fullname",
    key: "fullname"
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
    scopedSlots: { customRender: "startDate" }
  },
  {
    title: "Department",
    dataIndex: "department",
    key: "department"
  },
  {
    title: "Phone Number",
    dataIndex: "phonenumber",
    key: "phonenumber"
  },
  {
    title: "Matric Number",
    dataIndex: "matricNumber",
    key: "matricNumber"
  },
  {
    title: "Action",
    dataIndex: "operation",
    width: "20%",
    scopedSlots: { customRender: "operation" }
  }
];
export default {
  layout: "supAuthPage",
  data() {
    return {
      columns,
      users: [],
      isViewMode: false,
      IsVisible: false,
      loading: false,
      fullname: "",
      email: "",
      password: "",
      gender: undefined,
      startDate: "",
      matricNumber: "",
      companyName: "",
      position: "Intern",
      department: "",
      phonenumber: "",
      logbook: null
    };
  },
  computed: {
    windowWidth() {
      console.log("Ho", window.innerWidth);
      return window.innerWidth;
    },
    token() {
      return this.$store.state.login.login.token;
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
    onView(record) {
      this.fullname = record.fullname;
      this.department = record.department;
      this.email = record.email;
      this.logbook = record.logbook.length;
      this.startDate = record.startDate;
      this.phonenumber = record.phonenumber;
      this.matricNumber = record.matricNumber;
      this.gender = record.gender;
      this.companyName = record.companyName;
      this.isViewMode = true;
      this.IsVisible = true;
    },
    async onDelete(record) {
      try {
        this.$axios
          .delete(`/api/v1/users/${record._id}`, {
            headers: {
              "x-supervisor-token": this.token
            }
          })
          .then(res => {
            const { data } = res;
            if (data.status == "OK") {
              this.$notification.success({
                message: "Success",
                description: data.message
              });
              this.loading = false;
              this.IsVisible = false;
              this.getUsers();
            } else {
              // this.$store.commit("meal/setMeal", null, false);
              this.$notification.error({
                message: "Error",
                description: data.message
              });
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
              this.$router.replace(`/login`);
            } else {
              this.$notification.error({
                message: "Error",
                description: response.data.message || "Network Error"
              });
            }
          });
      } catch (ex) {
        console.log(ex);
      }
    },
    onCloseDrawer() {
      const $this = this;
      this.$confirm({
        title: "Are you sure you want to cancel?",
        onOk() {
          $this.IsVisible = false;
          // $this.imageUrlResolved = "";
          // $this.mealName = "";
        },
        onCancel() {}
      });
    },
    openDrawer() {
      this.fullname = "";
      this.department = "";
      this.startDate = "";
      this.phonenumber = "";
      this.matricNumber = "";
      this.position = "Intern";
      this.email = "";
      this.companyName = "";
      this.gender = undefined;
      this.isViewMode = false;
      this.IsVisible = true;
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
            this.$notification.success({
              message: "Success",
              description: data.message
            });
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
    },
    async submit() {
      try {
        this.loading = true;
        const whole = {
          fullname: this.fullname,
          email: this.email,
          password: this.password,
          gender: this.gender,
          startDate: this.startDate,
          matricNumber: this.matricNumber,
          companyName: this.companyName,
          position: this.position,
          department: this.department,
          phonenumber: this.phonenumber
        };
        this.$axios
          .post(`/api/v1/users`, whole, {
            headers: {
              "x-supervisor-token": this.token
            }
          })
          .then(res => {
            const { data } = res;
            if (data.status == "OK") {
              // this.$store.commit("meal/setMeal", data.payload);
              this.$notification.success({
                message: "Success",
                description: data.message
              });
              this.loading = false;
              this.IsVisible = false;
              this.getUsers();
            } else {
              // this.$store.commit("meal/setMeal", null, false);
              this.$notification.error({
                message: "Error",
                description: data.message
              });
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
              this.$router.replace(`/login`);
            } else {
              this.$notification.error({
                message: "Error",
                description: response.data.message || "Network Error"
              });
            }
          });
      } catch (ex) {
        console.log(ex);
      }
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>

<style>
tbody.ant-table-tbody {
  background: #fafafaaa;
}
.create_style {
  background: linear-gradient(269.08deg, #afffff 18.44%, #15aad9 72.16%);
  box-shadow: 0px 10px 20px rgba(21, 170, 217, 0.32);
  border-radius: 5px;
  margin: 20px 0;
  height: 44.16px;
}
.update-btn {
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
  color: #ffffff;
}
.update__style {
  background: linear-gradient(269.08deg, #afffff 18.44%, #15aad9 72.16%);
  box-shadow: 0px 10px 20px rgba(21, 170, 217, 0.32);
  border-radius: 5px;
  margin: 20px 0;
  height: 44.16px;
  width: 90px;
}
.cancel_style {
  border-radius: 5px;
  margin: 20px 0;
  height: 44.16px;
  width: 90px;
}
.update-btn {
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
  color: #ffffff;
}
.cancel-btn {
  font-size: 14px;
  line-height: 21px;
}
</style>
