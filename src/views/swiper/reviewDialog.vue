<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  name: "ReviewDialog"
});

const dialogVisible = ref(false);
const pics = ref<string[]>([]);

const open = (_pics: string[]) => {
  reset();
  dialogVisible.value = true;
  pics.value = _pics;
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
        <el-carousel-item v-for="item in pics" :key="item">
          <el-image style="width: 100%; height: 100%" :src="item" fit="cover" />
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
