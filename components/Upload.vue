<template>
  <div class="">
    <el-upload
      action="https://admin.baiyisecai.com/index/ajax/upload/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <slot v-if="$slots.default"></slot>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    handleAvatarSuccess(res, file) {
      if (res.code) {
        this.$emit("handler", res.data.fullurl);
      } else {
        this.$confirm(res.data.msg, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
      }
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
  },
};
</script>
