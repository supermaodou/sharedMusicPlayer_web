<script>
export default {
  name: 'FriendsView',
  data() {
    return {
      friends: [
        {
          id: 1,
          name: "张三",
          avatar: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop",
          status: "在线",
          lastActive: "刚刚",
          currentSong: "正在听：周杰伦 - 晴天"
        },
        {
          id: 2,
          name: "李四",
          avatar: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=100&h=100&fit=crop",
          status: "离线",
          lastActive: "2小时前",
          currentSong: "最近听过：Taylor Swift - Anti-Hero"
        },
        {
          id: 3,
          name: "王五",
          avatar: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop",
          status: "在线",
          lastActive: "刚刚",
          currentSong: "正在听：林俊杰 - 不为谁而作的歌"
        }
      ]
    }
  }
}
</script>

<template>
  <div class="friends-view">
    <div class="page-header">
      <h2>音乐好友</h2>
      <p class="description">与好友一起分享音乐</p>
    </div>

    <div class="friends-list">
      <div v-for="friend in friends" :key="friend.id" class="friend-card">
        <div class="friend-avatar">
          <img :src="friend.avatar" :alt="friend.name">
          <div class="status-indicator" :class="friend.status === '在线' ? 'online' : 'offline'"></div>
        </div>
        <div class="friend-info">
          <div class="friend-name">
            <h3>{{ friend.name }}</h3>
            <span class="status">{{ friend.status }}</span>
          </div>
          <p class="current-song">{{ friend.currentSong }}</p>
          <span class="last-active">{{ friend.lastActive }}</span>
        </div>
        <div class="friend-actions">
          <el-button type="primary" text>发送消息</el-button>
          <el-button type="success" text>一起听</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.friends-view {
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

.friends-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.friend-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.friend-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.friend-avatar {
  position: relative;
  width: 60px;
  height: 60px;
}

.friend-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.status-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
}

.status-indicator.online {
  background-color: #67C23A;
}

.status-indicator.offline {
  background-color: #909399;
}

.friend-info {
  flex: 1;
}

.friend-name {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
}

.friend-name h3 {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.status {
  font-size: 12px;
  color: #666;
}

.current-song {
  font-size: 14px;
  color: #666;
  margin: 0 0 5px 0;
}

.last-active {
  font-size: 12px;
  color: #999;
}

.friend-actions {
  display: flex;
  gap: 10px;
}
</style> 