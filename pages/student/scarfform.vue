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
      <a-button block class="upload__style" @click="UploadForm()">
        <span class="upload-btn"> Upload</span>
      </a-button>
    </a-row>
  </div>
</template>
<script>
export default {
  layout: "studAuthPage",
  data() {
    return {};
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
      const status = info.file.status;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        this.$message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    UploadForm() {}
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
