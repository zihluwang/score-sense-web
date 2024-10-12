<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { getExamQuestionListReq } from "@/api/examQuestion";
import { message } from "@/utils/message";

const route = useRoute();

console.log("配置试题");

let examId = "";

const getExamQuestionList = async () => {
  try {
    const res = await getExamQuestionListReq(examId);
    console.log("获取试题列表成功", res);
  } catch (e) {
    console.error("获取试题列表失败", e);
    message("获取试题列表失败", { type: "error" });
  }
};

onMounted(() => {
  // 获取页面地址中的path参数
  examId = route.params.examId as string;
  // 发请求获取这个 examId 下属的所有试题
  getExamQuestionList();
});
</script>

<template>
  <div>配置试题</div>
</template>

<style scoped lang="scss">
.nbdhjewbhedw {
  width: 100%;
}
</style>
