<script>
export default {
  name: 'FMView',
  data() {
    return {
      currentChannel: null,
      channels: [
        { id: 1, name: "私人FM", description: "根据您的口味推荐音乐", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop" },
        { id: 2, name: "华语FM", description: "精选华语音乐", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop" },
        { id: 3, name: "欧美FM", description: "流行欧美音乐", cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&fit=crop" },
        { id: 4, name: "轻音乐FM", description: "舒缓放松的音乐", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop" }
      ]
    }
  }
}
</script>

<template>
  <div class="fm-view">
    <div class="page-header">
      <h2>私人FM</h2>
      <p class="description">发现更多你喜欢的音乐</p>
    </div>

    <div class="channels-grid">
      <div v-for="channel in channels" :key="channel.id" class="channel-card">
        <div class="channel-cover">
          <img :src="channel.cover" :alt="channel.name">
          <div class="play-overlay">
            <el-button type="primary" circle size="large">
              <span style="font-size: 18px;">▶</span>
            </el-button>
          </div>
        </div>
        <div class="channel-info">
          <h3>{{ channel.name }}</h3>
          <p>{{ channel.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fm-view {
  padding: 20px;
}

.page-header {
  margin-bottom: 30px;
}

.page-header h2 {
  font-size: 24px;
  color: #333;
  font-weight: 600;
  margin-bottom: 8px;
}

.description {
  color: #666;
  font-size: 14px;
}

.channels-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.channel-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  cursor: pointer;
}

.channel-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.channel-cover {
  position: relative;
  overflow: hidden;
}

.channel-cover img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s;
}

.channel-card:hover .channel-cover img {
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

.channel-card:hover .play-overlay {
  opacity: 1;
}

.channel-info {
  padding: 15px;
}

.channel-info h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
}

.channel-info p {
  font-size: 14px;
  color: #666;
  margin: 0;
}
</style> 