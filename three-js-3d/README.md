# Three.js 3D Tower Animation

A lightweight, standalone 3D interactive cylinder tower animation built with pure Three.js and WebGL.

## 📁 Clean Structure

```
├── index.html            # Minimal full-screen canvas container
├── js/
│   ├── three.min.js      # Three.js WebGL library
│   └── hero-tower.js     # 3D cylindrical tower animation & pointer interactions
├── static/
│   └── components/       # 3D card textures (0.jpeg - 4.jpeg)
├── package.json          # Project metadata
├── server.py             # Optional local HTTP server
└── README.md
```

## 🚀 How to Run

### Option 1: Python Server
```bash
python server.py
```
Open [http://localhost:3000](http://localhost:3000).

### Option 2: Node / Serve
```bash
npm start
# or
npx serve .
```

### Controls
- **Auto-rotation**: Continuously rotates in place.
- **Drag & Spin**: Click/touch and drag horizontally to spin the tower with momentum and inertia.
