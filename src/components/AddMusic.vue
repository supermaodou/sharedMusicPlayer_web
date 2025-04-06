<script setup>
import { ref } from 'vue'
import { addMusic } from '@/api/music'
import { ElMessage } from 'element-plus'

const form = ref({
  title: '',
  artist: '',
  url: ''
})

const submitForm = async () => {
  try {
    await addMusic(form.value)
    ElMessage.success('添加成功')
    form.value = { title: '', artist: '', url: '' }
  } catch (error) {
    ElMessage.error('添加失败')
  }
}
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>添加音乐</span>
      </div>
    </template>
    
    <el-form :model="form" label-width="80px">
      <el-form-item label="歌曲名">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="艺术家">
        <el-input v-model="form.artist" />
      </el-form-item>
      <el-form-item label="音乐链接">
        <el-input v-model="form.url" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">添加</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>