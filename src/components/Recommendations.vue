<script>
export default {
  name: 'Recommendations',
  props: {
    recommendations: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<template>
  <div class="recommendations">
    <div class="section-title">推荐歌单</div>
    <div class="recommendation-grid">
      <div class="recommendation-card" v-for="item in recommendations" :key="item.id">
        <div class="card-cover">
          <img :src="item.cover" :alt="item.title">
          <div class="play-overlay">
            <el-button type="primary" circle size="large">
              <span style="font-size: 18px;">▶</span>
            </el-button>
          </div>
          <div class="play-count">{{ item.playCount }}</div>
        </div>
        <div class="card-info">
          <div class="card-title">{{ item.title }}</div>
          <div class="card-description">{{ item.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recommendations {
  margin-bottom: 40px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}

.recommendation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
}

.recommendation-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  cursor: pointer;
}

.recommendation-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.card-cover {
  position: relative;
  overflow: hidden;
}

.card-cover img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  transition: transform 0.3s;
}

.recommendation-card:hover .card-cover img {
  transform: scale(1.05);
}

.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.recommendation-card:hover .play-overlay {
  opacity: 1;
}

.play-count {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.card-info {
  padding: 15px;
}

.card-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-description {
  font-size: 12px;
  color: #666;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 