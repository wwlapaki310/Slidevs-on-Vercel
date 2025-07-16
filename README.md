# My Slidev Presentations

This repository contains multiple Slidev presentations hosted on Vercel.

## 📁 Structure

```
.
├── SRE-NEXT-2025/          # SRE NEXT 2025 presentation
│   └── slides.md            # Main slides content
├── scripts/
│   └── build-index.js       # Script to build index page
├── package.json             # Dependencies and build scripts
├── vercel.json              # Vercel configuration
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/wwlapaki310/my-slidev-presentations.git
cd my-slidev-presentations

# Install dependencies
npm install
```

### Development

```bash
# Start development server for a specific presentation
npx slidev SRE-NEXT-2025/slides.md

# Or use the dev script
npm run dev
```

### Building

```bash
# Build all presentations
npm run build

# This will:
# 1. Build each presentation with the correct base path
# 2. Generate an index page listing all presentations
```

## 📊 Available Presentations

- **SRE NEXT 2025**: NoCスタッフをやった話 & 講演紹介
  - Path: `/sre-next-2025/`
  - Source: `SRE-NEXT-2025/slides.md`

## 🌐 Deployment

This repository is configured for automatic deployment to Vercel:

1. **Manual Deployment**: Simply connect this repository to Vercel
2. **Vercel Integration**: Configured via `vercel.json`
3. **Multiple Routes**: Each presentation is accessible via its own path

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 🔧 Adding New Presentations

1. Create a new folder for your presentation (e.g., `MY-NEW-TALK/`)
2. Add your `slides.md` file in that folder
3. Update `scripts/build-index.js` to include your new presentation
4. Update the build script in `package.json` to include your presentation
5. Commit and push - automatic deployment will handle the rest!

### Example: Adding a new presentation

```bash
# 1. Create new presentation folder
mkdir MY-NEW-TALK

# 2. Create slides
echo '---\ntheme: default\n---\n\n# My New Talk\n\nContent here...' > MY-NEW-TALK/slides.md

# 3. Update build script in package.json
# Add: && slidev build MY-NEW-TALK/slides.md --out dist/my-new-talk --base /my-new-talk/

# 4. Update scripts/build-index.js
# Add your presentation to the presentations array

# 5. Test locally
npm run build
npx serve dist

# 6. Deploy
git add .
git commit -m "Add new presentation: My New Talk"
git push
```

## 🛠️ Technical Details

### Slidev Configuration
- **Theme**: Default theme with custom styling
- **Features**: Code highlighting, transitions, interactive elements
- **Export**: PDF export available for each presentation

### Vercel Configuration
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Rewrites**: Configured for multiple presentations and SPA routing

## 📝 License

MIT License - feel free to use this structure for your own presentations!

## 🤝 Contributing

Feel free to open issues or submit pull requests if you have suggestions for improvements!
