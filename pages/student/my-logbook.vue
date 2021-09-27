<template>
  <div style="background-color: #e8e8e8; padding: 20px;">
    <a-row :gutter="16">
      <a-col :span="4" :offset="0" v-for="log in logbook" :key="log._id">
        <a-tooltip placement="bottom">
          <template slot="title">
            <span>Click to view more details</span>
          </template>

          <a-card
            :bordered="false"
            @click="displayDetails(log)"
            style="padding:5px; margin: 10px"
          >
            <a-row type="flex" justify="space-between" style="margin: 15px 0;">
              <div class="week">Week {{ log.weekNumber }}</div>
              <div class="tag" v-if="log.isApproved == 'approved'">
                <img :src="approved" alt="tag" />
              </div>
              <div class="tag" v-else>
                <img :src="pending" alt="tag" />
              </div>
            </a-row>
          </a-card>
        </a-tooltip>
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
        <a-form-model-item label="Month of Commencement">
          <a-input
            size="large"
            disabled
            v-model="singlelogbook.monthOfCommencement"
          />
        </a-form-model-item>
        <a-form-model-item label="Week Number">
          <a-input size="large" disabled v-model="singlelogbook.weekNumber" />
        </a-form-model-item>
        <a-form-model-item label="Approved?">
          <a-input size="large" disabled v-model="singlelogbook.isApproved" />
        </a-form-model-item>
        <a-form-model-item label="Project">
          <a-input size="large" disabled v-model="singlelogbook.project" />
        </a-form-model-item>
        <a-form-model-item label="Department">
          <a-input size="large" disabled v-model="singlelogbook.department" />
        </a-form-model-item>
        <a-form-model-item label="Comments">
          <a-input size="large" disabled v-model="singlelogbook.comments" />
        </a-form-model-item>
        <a-form-model-item label="Days">
          <br />
          <a-row v-for="(day, index) in singlelogbook.days" :key="index">
            <a-form-model-item :label="`Day ${++index}`">
              <a-input size="large" disabled v-model="day.day" />
            </a-form-model-item>
            <a-form-model-item label="Content">
              <a-input
                size="large"
                disabled
                v-model="day.contents"
              /> </a-form-model-item
            ><br />
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
  layout: "studAuthPage",
  data() {
    return {
      user,
      approved,
      pending,
      isVisible: false,
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
      monthOfCommencement: "",
      email: "",
      project: "",
      department: "",
      comments: "",
      days: [],
      singlelogbook: {}
    };
  },
  computed: {
    logbook() {
      return this.$store.state.studentDetails.user.logbook;
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
    displayDetails(log) {
      this.singlelogbook = log;
      // console.log(log);
      this.isVisible = true;
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
</style>
