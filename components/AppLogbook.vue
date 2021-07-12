<template>
  <div style="background-color: #e8e8e8; padding: 20px;">
    <a-row :gutter="16">
      <a-col :span="4" :offset="0">
        <a-card :bordered="false">
          <a-row type="flex" justify="space-between" style="margin: 15px 0;">
            <div class="week">Week 1<br />Day 1</div>
            <div class="tag">
              <img :src="approved" alt="tag" />
            </div>
          </a-row>
          <a-row style="margin: 15px 0;">
            <span class="tag">
              <img :src="user" alt="profile picture" class="profile_picture" />
            </span>
            <span class="student-name">Jenny Wilson</span>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="4" :offset="1">
        <a-card :bordered="false">
          <a-row type="flex" justify="space-between" style="margin: 15px 0;">
            <div class="week">Week 1<br />Day 1</div>
            <div class="tag">
              <img :src="pending" alt="tag" />
            </div>
          </a-row>
          <a-row style="margin: 15px 0;">
            <span class="tag">
              <img :src="user" alt="profile picture" class="profile_picture" />
            </span>
            <span class="student-name">Jenny Wilson</span>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="4" :offset="1">
        <a-card :bordered="false">
          <a-row type="flex" justify="space-between" style="margin: 15px 0;">
            <div class="week">Week 1<br />Day 1</div>
            <div class="tag">
              <img :src="approved" alt="tag" />
            </div>
          </a-row>
          <a-row style="margin: 15px 0;">
            <span class="tag">
              <img :src="user" alt="profile picture" class="profile_picture" />
            </span>
            <span class="student-name">Jenny Wilson</span>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="4" :offset="1">
        <a-card :bordered="false">
          <a-row type="flex" justify="space-between" style="margin: 15px 0;">
            <div class="week">Week 1<br />Day 1</div>
            <div class="tag">
              <img :src="pending" alt="tag" />
            </div>
          </a-row>
          <a-row style="margin: 15px 0;">
            <span class="tag">
              <img :src="user" alt="profile picture" class="profile_picture" />
            </span>
            <span class="student-name">Jenny Wilson</span>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="4" :offset="1">
        <a-card :bordered="false">
          <a-row type="flex" justify="space-between" style="margin: 15px 0;">
            <div class="week">Week 1<br />Day 1</div>
            <div class="tag">
              <img :src="approved" alt="tag" />
            </div>
          </a-row>
          <a-row style="margin: 15px 0;">
            <span class="tag">
              <img :src="user" alt="profile picture" class="profile_picture" />
            </span>
            <span class="student-name">Jenny Wilson</span>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import user from "~/assets/img/user.png";
import approved from "~/assets/img/approved.png";
import pending from "~/assets/img/pending.png";
export default {
  data() {
    return {
      user,
      approved,
      pending
    };
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
