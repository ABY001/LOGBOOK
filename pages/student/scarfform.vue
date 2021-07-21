<template>
  <div style="background: #ffffff; padding: 75px">
    <a-row type="flex" justify="center">
      <div class="activities-heading">
        SCARF FORM
      </div></a-row
    >

    <a-row style="margin: 40px;">
      <a-upload-dragger name="file" :multiple="true" @change="handleChange">
        <p class="ant-upload-drag-icon">
          <a-icon type="picture" class="upload-icon" />
        </p>
        <p class="ant-upload-text">
          Click or drag file to this area to upload
        </p>
      </a-upload-dragger></a-row
    >
    <a-row type="flex" justify="end">
      <a-button
        block
        class="upload__style"
        @click="uploadImg(img)"
        :loading="loading"
      >
        <span class="upload-btn"> Upload</span>
      </a-button>
    </a-row>
  </div>
</template>
<script>
export default {
  layout: "studAuthPage",
  data() {
    return { img: "", loading: false };
  },
  computed: {
    token() {
      return this.$store.state.login.login.token;
    },
    id() {
      return this.$store.state.login.login.id;
    }
  },
  methods: {
    handleChange(info) {
      if (info.file.status === "uploading") {
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        var file = info.file.originFileObj;
        var formData = new FormData();
        formData.append("image", file);
        this.img = formData;
      }
    },

    uploadImg(img) {
      this.loading = true;
      this.$axios
        .put(`/api/v1/users/upload/${this.id}/image`, img, {
          headers: {
            "x-access-token": this.token,
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })

        .then(res => {
          const { data } = res;
          if (data.status == "OK") {
            this.$notification.success({
              message: "Success",
              description: data.message
            });
            this.img = "";
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
      this.loading = false;
    }
  }
};
</script>

<style>
.ant-upload.ant-upload-drag p.ant-upload-drag-icon .anticon {
  color: rgba(21, 170, 217, 0.46);
  font-size: 300px;
}
.activities-heading {
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
}
.upload__style {
  background: linear-gradient(269.08deg, #afffff 18.44%, #15aad9 72.16%);
  box-shadow: 0px 10px 20px rgba(21, 170, 217, 0.32);
  border-radius: 5px;
  margin: 20px 0;
  height: 44.16px;
  width: 90px;
}
.upload-btn {
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
  color: #ffffff;
}
</style>
