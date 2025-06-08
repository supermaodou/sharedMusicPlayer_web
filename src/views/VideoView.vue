<script>
export default {
  name: 'VideoView',
  data() {
    return {
      videos: [
        { 
          id: 1, 
          title: "周杰伦 - 最伟大的作品", 
          cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop",
          duration: "4:32",
          views: "1.2万",
          uploader: "周杰伦官方频道"
        },
        { 
          id: 2, 
          title: "Taylor Swift - Anti-Hero", 
          cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=225&fit=crop",
          duration: "3:45",
          views: "8.5千",
          uploader: "Taylor Swift"
        },
        { 
          id: 3, 
          title: "林俊杰 - 不为谁而作的歌", 
          cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=225&fit=crop",
          duration: "4:15",
          views: "2.3万",
          uploader: "林俊杰官方频道"
        },
        { 
          id: 4, 
          title: "Ed Sheeran - Shape of You", 
          cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop",
          duration: "3:53",
          views: "5.6万",
          uploader: "Ed Sheeran"
        }
      ]
    }
  }
}
</script>

<template>
  <div class="video-view">
    <div class="page-header">
      <h2>音乐视频</h2>
      <p class="description">发现更多精彩音乐视频</p>
    </div>

    <div class="videos-grid">
      <div v-for="video in videos" :key="video.id" class="video-card">
        <div class="video-cover">
          <img :src="video.cover" :alt="video.title">
          <div class="duration">{{ video.duration }}</div>
          <div class="play-overlay">
            <el-button type="primary" circle size="large">
              <span style="font-size: 18px;">▶</span>
            </el-button>
          </div>
        </div>
        <div class="video-info">
          <h3>{{ video.title }}</h3>
          <div class="video-meta">
            <span class="uploader">{{ video.uploader }}</span>
            <span class="views">{{ video.views }} 次观看</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.video-view {
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

.videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.video-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  cursor: pointer;
}

.video-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.video-cover {
  position: relative;
  overflow: hidden;
}

.video-cover img {
  width: 100%;
  height: 169px;
  object-fit: cover;
  transition: transform 0.3s;
}

.video-card:hover .video-cover img {
  transform: scale(1.05);
}

.duration {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
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

.video-card:hover .play-overlay {
  opacity: 1;
}

.video-info {
  padding: 15px;
}

.video-info h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.video-meta {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 14px;
}

.uploader {
  color: #409EFF;
}

.views {
  color: #999;
}
</style> 