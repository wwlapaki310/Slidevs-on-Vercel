# Slidevs-on-Vercel

🎪 **在单个仓库中管理多个 Slidev 演示文稿的系统**

本项目演示了如何使用 pnpm workspace 和 Vercel 自动化部署在单个仓库中高效管理多个 [Slidev](https://sli.dev/) 演示文稿。

[English](README.md) | **简体中文** | [日本語](README.ja.md)

## 🌐 在线演示

- **主站**: *待更新至新的 Vercel URL*
- **Slidev 系统演示**: *待更新至新的 Vercel URL/slidev-system/*

## ✨ 功能特性

- 🏗️ **多演示文稿管理**: 在一个仓库中管理多个 Slidev 演示文稿
- 🚀 **自动部署**: GitHub → Vercel 集成自动化部署
- 🎤 **演讲者模式**: 在 `/{slide-name}/presenter/` 访问演讲者模式
- 📋 **概览模式**: 在 `/{slide-name}/overview/` 访问概览模式
- 📱 **响应式设计**: 移动端和桌面端优化
- 🔄 **高效开发**: 使用 pnpm workspace 的流程化工作流

## 🏗️ 架构

```
Slidevs-on-Vercel/
├── slides/
│   └── slidev-system/           # 演示文稿: 系统概述
│       └── src/
│           ├── slides.md        # Slidev markdown 内容
│           └── package.json     # 演示文稿特定配置
├── scripts/
│   ├── build-index.js          # 生成主页
│   ├── create-slide.js         # 创建新演示文稿脚本
│   └── slide-metadata.json     # 演示文稿元数据
├── dist/                       # 构建输出目录
├── package.json               # 根包配置
├── pnpm-workspace.yaml        # pnpm workspace 配置
└── vercel.json               # Vercel 部署设置
```

## 🚀 快速开始

### 前置要求

- Node.js 18+
- pnpm 8+

### 安装

```bash
# 克隆仓库
git clone https://github.com/wwlapaki310/Slidevs-on-Vercel.git
cd Slidevs-on-Vercel

# 安装依赖
pnpm install
```

### 开发

```bash
# 启动 slidev-system 演示文稿的开发服务器
pnpm dev:slidev-system

# 演示文稿将在以下地址可用:
# http://localhost:3030
```

### 构建

```bash
# 构建所有演示文稿并生成索引页面
pnpm build

# 构建输出将在 ./dist/ 目录中
```

## 📝 添加新演示文稿

### 方法 1: 使用 create-slide 脚本

```bash
pnpm create-slide
```

### 方法 2: 手动设置

1. 创建新目录: `slides/{your-slide-name}/src/`
2. 添加 `slides.md` 和 `package.json`
3. 更新根目录 `package.json` 脚本:
   ```json
   {
     "scripts": {
       "build": "npm run build:{your-slide-name} && npm run build:index",
       "build:{your-slide-name}": "cd slides/{your-slide-name}/src && npm run build",
       "dev:{your-slide-name}": "cd slides/{your-slide-name}/src && npm run dev"
     }
   }
   ```
4. 在 `vercel.json` 中添加路由:
   ```json
   {
     "rewrites": [
       { "source": "/{your-slide-name}/:path*", "destination": "/{your-slide-name}/:path*" }
     ]
   }
   ```
5. 使用您的演示文稿信息更新 `scripts/slide-metadata.json`

## ⚙️ 技术栈

- **前端**: [Slidev](https://sli.dev/) (基于 Vue.js)
- **托管**: [Vercel](https://vercel.com/)
- **包管理器**: [pnpm](https://pnpm.io/) with workspace
- **构建系统**: 自定义 Node.js 脚本
- **样式**: [Tailwind CSS](https://tailwindcss.com/)

## 🔧 配置

### pnpm Workspace

项目使用 pnpm workspace 管理多个演示文稿:

```yaml
# pnpm-workspace.yaml
packages:
  - "slides/*/src"
```

### Vercel 部署

自动部署通过以下配置:

- **构建命令**: `pnpm build`
- **输出目录**: `dist`
- **Node.js 版本**: 18.x

## 📊 演示文稿结构

每个演示文稿遵循以下结构:

```
slides/{presentation-name}/
└── src/
    ├── slides.md           # 主要演示文稿内容
    ├── package.json        # 构建配置
    ├── components/         # 可选: 自定义 Vue 组件
    └── assets/            # 可选: 图片和资源
```

演示文稿的 `package.json` 示例:

```json
{
  "name": "your-presentation",
  "private": true,
  "scripts": {
    "build": "slidev build --base /your-presentation/ --out ../../../dist/your-presentation",
    "dev": "slidev --open",
    "export": "slidev export"
  },
  "dependencies": {
    "@slidev/cli": "^0.49.0",
    "@slidev/theme-default": "latest"
  }
}
```

## 🎯 使用场景

- **技术会议**: 管理多个会议演示文稿
- **培训材料**: 组织课程材料和研讨会
- **团队演示**: 跨团队分享知识
- **作品集**: 展示您的演示技能
- **文档**: 交互式文档和教程

## 🤝 贡献

欢迎贡献! 请随时提交 Pull Request。

## 📄 许可证

本项目采用 MIT 许可证 - 详情请查看 [LICENSE](LICENSE) 文件。

## 🔗 链接

- **Slidev 文档**: https://sli.dev/
- **Vercel 文档**: https://vercel.com/docs
- **pnpm Workspace**: https://pnpm.io/workspaces

---

**使用 ❤️ 构建，采用 Slidev + Vercel + pnpm workspace**
