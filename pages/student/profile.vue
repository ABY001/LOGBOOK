<template>
  <div class="card_container">
    <a-card :bordered="false" class="profile_card" style="height:100%">
      <a-row type="flex" justify="center">
        <a-card :border="false" class="profile-details">
          <a-form-model
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            style="margin:10px 20px"
          >
            <a-form-model-item label="Full name">
              <a-input size="large" v-model="name" />
            </a-form-model-item>
            <a-form-model-item label="Email">
              <a-input size="large" v-model="email" :disabled="email" />
            </a-form-model-item>
            <a-form-model-item label="Phone">
              <a-input size="large" v-model="phone" />
            </a-form-model-item>
            <a-form-model-item label="Company name">
              <a-input size="large" v-model="companyname" />
            </a-form-model-item>
            <a-form-model-item label="Position">
              <a-input size="large" v-model="matricNumber" />
            </a-form-model-item>
            <a-form-model-item label="Department">
              <a-input size="large" v-model="department" />
            </a-form-model-item>
            <a-form-model-item label="Gender">
              <a-select
                size="large"
                v-model="gender"
                :disabled="gender"
                :rules="[v => !!v || 'Please enter your gender']"
              >
                <a-select-option value="male"> Male </a-select-option>
                <a-select-option value="female">
                  Female
                </a-select-option>
              </a-select>
            </a-form-model-item>

            <a-form-model-item label="Profile Image">
              <!-- <a-row type="flex" justify="center" style="margin: 30px auto"> -->
              <a-upload
                name="avatar"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                :before-upload="beforeUpload"
                @change="handleChange"
              >
                <img
                  v-if="imageUrl"
                  :src="imageUrl"
                  alt="user"
                  style="width:100%"
                />
                <div v-else>
                  <a-icon :type="loading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">
                    Upload
                  </div>
                </div>
              </a-upload>
            </a-form-model-item>
          </a-form-model>
        </a-card>
      </a-row>
    </a-card>
    <a-row type="flex" justify="end">
      <a-button
        block
        class="update__style"
        @click="updateProfile()"
        :loading="btnloading"
      >
        <span class="update-btn"> Update</span>
      </a-button>
    </a-row>
  </div>
</template>

<script>
import user from "~/assets/img/user.png";
export default {
  layout: "studAuthPage",
  data() {
    return {
      user,
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
      name: "",
      email: "",
      phone: "",
      address: "",
      companyname: "",
      matricNumber: "",
      department: "",
      gender: undefined,
      imageUrl: "",
      loading: false,
      btnloading: false
    };
  },
  computed: {
    token() {
      return this.$store.state.login.login.token;
    },
    id() {
      return this.$store.state.studentDetails.user._id;
    }
  },
  methods: {
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        var file = info.file.originFileObj;
        var formData = new FormData();
        formData.append("image", file);
        this.uploadImg(formData);
      }
    },

    uploadImg(img) {
      this.$axios
        .put(`/api/v1/users/upload/${this.id}/profile-image`, img, {
          headers: {
            "x-access-token": this.token,
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(res => {
          const { data } = res;
          if (data.status == "OK") {
            this.imageUrl = data.payload;
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
            this.data = data.payload;
            console.log(this.data);
            this.imageUrl = this.data.profileImage;
            this.name = this.data.fullname;
            this.companyname = this.data.companyName;
            this.matricNumber = this.data.matricNumber;
            this.email = this.data.email;
            this.gender = this.data.gender;
            this.department = this.data.department;
            this.phone = this.data.phonenumber;
            this.$store.commit("studentDetails/setUser", data.payload);
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
    async updateProfile() {
      this.btnloading = true;
      this.$axios
        .put(
          `/api/v1/users/update/profile`,
          {
            fullname: this.name,
            companyName: this.companyname,
            matricNumber: this.matricNumber,
            department: this.department,
            phonenumber: this.phone
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
      this.btnloading = false;
    }
  },
  mounted() {
    this.getProfileDetails();
  }
};
</script>

<style>
.profile_card {
  background: #ffffff;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  box-shadow: 0px 10px 20px rgba(21, 170, 217, 0.3);
  border-radius: 30px;
}
.update__style {
  background: linear-gradient(269.08deg, #afffff 18.44%, #15aad9 72.16%);
  box-shadow: 0px 10px 20px rgba(21, 170, 217, 0.32);
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
.profile-details {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.31);
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 33px;
  width: 80%;
}
.ant-form-item label {
  position: relative;
  font-weight: 500;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.21);
}
</style>
