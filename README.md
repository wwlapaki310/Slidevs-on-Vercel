# Slidevs-on-Vercel 

📚 **Write slides in Markdown. Host them on the Web. All from one Git repo.**

Manage and publish multiple Slidev presentations with Vercel —  
auto-deployed, shareable, and beautifully simple.

This project demonstrates how to efficiently manage multiple [Slidev](https://sli.dev/) presentations within a single repository using pnpm workspace and automated deployment with Vercel.

**English** | [简体中文](README.zh-CN.md) | [日本語](README.ja.md)

## 🌐 Live Demo

- **Main Site**: *To be updated with new Vercel URL*
- **Slidev System Demo**: *To be updated with new Vercel URL/slidev-system/*

## ✨ Features

- 🏗️ **Multi-Presentation Management**: Manage multiple Slidev presentations in one repository
- 🚀 **Auto Deployment**: Automated deployment with GitHub → Vercel integration
- 🎤 **Presenter Mode**: Access presenter mode at `/{slide-name}/presenter/`
- 📋 **Overview Mode**: Access overview mode at `/{slide-name}/overview/`
- 📱 **Responsive Design**: Mobile and desktop optimized
- 🔄 **Efficient Development**: Streamlined workflow with pnpm workspace

## 🏗️ Architecture

```
Slidevs-on-Vercel/
├── slides/
│   └── slidev-system/           # Presentation: System Overview
│       └── src/
│           ├── slides.md        # Slidev markdown content
│           └── package.json     # Presentation-specific config
├── scripts/
│   ├── build-index.js          # Generate main landing page
│   ├── create-slide.js         # Create new presentation script
│   └── slide-metadata.json     # Presentations metadata
├── dist/                       # Build output directory
├── package.json               # Root package configuration
├── pnpm-workspace.yaml        # pnpm workspace configuration
└── vercel.json               # Vercel deployment settings
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
# Clone the repository
git clone https://github.com/wwlapaki310/Slidevs-on-Vercel.git
cd Slidevs-on-Vercel

# Install dependencies
pnpm install
```

### Development

```bash
# Start development server for slidev-system presentation
pnpm dev:slidev-system

# The presentation will be available at:
# http://localhost:3030
```

### Building

```bash
# Build all presentations and generate index page
pnpm build

# Build output will be in ./dist/
```

## 📝 Adding New Presentations

### Method 1: Using the create-slide script

```bash
pnpm create-slide
```

### Method 2: Manual setup

1. Create a new directory: `slides/{your-slide-name}/src/`
2. Add your `slides.md` and `package.json`
3. Update root `package.json` scripts:
   ```json
   {
     "scripts": {
       "build": "npm run build:{your-slide-name} && npm run build:index",
       "build:{your-slide-name}": "cd slides/{your-slide-name}/src && npm run build",
       "dev:{your-slide-name}": "cd slides/{your-slide-name}/src && npm run dev"
     }
   }
   ```
4. Add routing in `vercel.json`:
   ```json
   {
     "rewrites": [
       { "source": "/{your-slide-name}/:path*", "destination": "/{your-slide-name}/:path*" }
     ]
   }
   ```
5. Update `scripts/slide-metadata.json` with your presentation information

## ⚙️ Tech Stack

- **Frontend**: [Slidev](https://sli.dev/) (Vue.js based)
- **Hosting**: [Vercel](https://vercel.com/)
- **Package Manager**: [pnpm](https://pnpm.io/) with workspace
- **Build System**: Custom Node.js scripts
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## 🔧 Configuration

### pnpm Workspace

The project uses pnpm workspace to manage multiple presentations:

```yaml
# pnpm-workspace.yaml
packages:
  - "slides/*/src"
```

### Vercel Deployment

Automatic deployment is configured through:

- **Build Command**: `pnpm build`
- **Output Directory**: `dist`
- **Node.js Version**: 18.x

## 📊 Presentation Structure

Each presentation follows this structure:

```
slides/{presentation-name}/
└── src/
    ├── slides.md           # Main presentation content
    ├── package.json        # Build configuration
    ├── components/         # Optional: Custom Vue components
    └── assets/            # Optional: Images and resources
```

Example `package.json` for a presentation:

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

## 🎯 Use Cases

- **Tech Conferences**: Manage multiple conference presentations
- **Training Materials**: Organize course materials and workshops
- **Team Presentations**: Share knowledge across teams
- **Portfolio**: Showcase your presentation skills
- **Documentation**: Interactive documentation and tutorials

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Slidev Documentation**: https://sli.dev/
- **Vercel Documentation**: https://vercel.com/docs
- **pnpm Workspace**: https://pnpm.io/workspaces

---

**Built with ❤️ using Slidev + Vercel + pnpm workspace**
