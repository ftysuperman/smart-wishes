# 🐴 智能祝福文案生成器 - 马年专属版

一个基于 Vue 3 和 Node.js 的智能祝福语生成器，调用阿里云百炼大模型（通义千问）生成马年专属祝福语。

## ✨ 功能特性

- 🎯 **智能生成** - 基于阿里云百炼大模型，生成个性化马年祝福语
- 🌊 **流式输出** - 实时显示 AI 逐字生成过程，更有互动感
- 🎨 **精美界面** - 马年主题设计，红金配色，喜庆大气
- 📱 **响应式设计** - 完美适配 PC 端和移动端
- 📋 **一键复制** - 快速复制生成的祝福语
- ⚡ **实时生成** - 无需数据库，直接调用 AI 生成
- 🐳 **Docker 部署** - 一键部署，开箱即用

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn
- Docker（可选，用于容器化部署）

### 1. 获取阿里云百炼 API Key

1. 访问 [阿里云百炼控制台](https://bailian.console.aliyun.com/)
2. 注册/登录账号
3. 在 API Key 管理页面创建 API Key
4. 复制 API Key（格式：sk-xxxxxxxxxxxxxxxxxxxxxxxx）

### 2. 配置后端环境变量

编辑 `backend/.env` 文件，填入你的 API Key和模型名称：

```env
PORT=3000
DASHSCOPE_API_KEY=sk-你的_API_密钥
MODEL_NAME=qwen-max
```

### 3. 安装依赖

#### 前端

```bash
cd frontend
npm install
```

#### 后端

```bash
cd backend
npm install
```

### 4. 启动开发服务器

#### 启动后端

```bash
cd backend
npm start
```

后端将在 `http://localhost:3000` 运行

#### 启动前端

```bash
cd frontend
npm run dev
```

前端将在 `http://localhost:5173` 运行

### 5. 访问应用

打开浏览器访问 `http://localhost:5173`，开始使用！

## 🐳 Docker 部署

### 一键启动

```bash
# 确保 backend/.env 已正确配置
docker-compose up -d
```

访问 `http://localhost` 即可使用应用。

### 查看日志

```bash
docker-compose logs -f
```

### 停止服务

```bash
docker-compose down
```

## 📁 项目结构

```
.
├── frontend/                 # Vue 3 前端
│   ├── src/
│   │   ├── components/       # Vue 组件
│   │   │   ├── BlessingForm.vue      # 表单组件
│   │   │   ├── BlessingResult.vue    # 结果展示
│   │   │   └── CopyButton.vue        # 复制按钮
│   │   ├── api/             # API 封装
│   │   ├── App.vue          # 根组件
│   │   └── main.js          # 入口文件
│   ├── package.json
│   └── vite.config.js
├── backend/                 # Node.js 后端
│   ├── src/
│   │   ├── controllers/     # 控制器
│   │   ├── routes/          # 路由
│   │   ├── services/        # AI 服务
│   │   └── app.js           # Express 入口
│   ├── package.json
│   ├── .env                 # 环境变量
│   └── Dockerfile
├── docker-compose.yml      # Docker Compose
└── README.md
```

## 🔌 API 接口

### 生成祝福语

**接口**: `POST /api/blessings/generate`

**请求体**:

```json
{
  "target": "张三",
  "keywords": "新年,健康"
}
```

**响应**:

```json
{
  "success": true,
  "data": {
    "blessing": "马年到了，祝你龙马精神，马到成功！...",
    "target": "张三",
    "keywords": "新年,健康"
  }
}
```

**错误响应**:

```json
{
  "success": false,
  "error": "错误信息"
}
```

## 🎨 技术栈

### 前端

- **框架**: Vue 3
- **构建工具**: Vite
- **UI 框架**: Tailwind CSS
- **HTTP 客户端**: Axios

### 后端

- **框架**: Express.js
- **AI 服务**: 阿里云百炼（通义千问 qwen-plus）
- **HTTP 客户端**: OpenAI SDK
- **跨域**: CORS

### 部署

- **容器化**: Docker + Docker Compose
- **Web 服务器**: Nginx

## ⚙️ 配置说明

### 后端环境变量 (.env)

| 变量名            | 说明               | 示例                |
| ----------------- | ------------------ | ------------------- |
| PORT              | 服务器端口         | 3000                |
| DASHSCOPE_API_KEY | 阿里云百炼 API Key | sk-xxxxxxxxxxxxxxxx |

### 前端配置 (vite.config.js)

```javascript
server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true
    }
  }
}
```

## 📝 使用说明

1. **输入祝福对象**（必填）：例如"张三"、"李四"、"家人"、"朋友"
2. **输入关键词**（可选）：例如"新年"、"健康"、"工作顺利"
3. **点击生成按钮**：AI 将为您生成专属马年祝福语
4. **一键复制**：点击复制按钮快速复制祝福语

## 🔒 安全建议

1. **保护 API Key**：不要将 `.env` 文件提交到版本控制系统
2. **环境变量**：生产环境使用安全的密钥管理服务
3. **HTTPS**：生产环境启用 HTTPS 加密传输
4. **限流**：建议添加 API 调用频率限制

## 📄 许可证

MIT License

## 🙏 致谢

- [Vue.js](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express.js](https://expressjs.com/)
- [阿里云百炼](https://bailian.console.aliyun.com/)

## 📞 联系方式

如有问题或建议，欢迎提交 Issue 或 Pull Request。

---

**祝您马年大吉，万事如意！🎊🐴**
