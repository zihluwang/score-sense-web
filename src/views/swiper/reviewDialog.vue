<script setup lang="ts">
import { getReviewSwiperReq, ISwiperListItem } from "@/api/swiper";
import { ref } from "vue";

defineOptions({
  name: "ReviewDialog"
});

const dialogVisible = ref(false);
const pics = ref<ISwiperListItem[]>([]);

const getReviewSwiper = async () => {
  try {
    const res = await getReviewSwiperReq();
    console.log("获取预览轮播图列表成功", res);
    pics.value = res;
  } catch (error) {
    console.error("获取预览轮播图列表失败", error);
  }
};

const open = async () => {
  reset();
  dialogVisible.value = true;
  // 发请求获取完整轮播图列表
  await getReviewSwiper();
};

const reset = () => {
  pics.value = [];
};

defineExpose({ open });
</script>

<template>
  <el-dialog v-model="dialogVisible" title="预览轮播图" width="50%">
    <div class="block text-center">
      <el-carousel>
        <el-carousel-item v-for="item in pics" :key="item.id">
          <el-image style="width: 100%; height: 100%" :src="item.imageUrl" fit="cover" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
}
</style>
