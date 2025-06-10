# 🌌 3D Solar System Simulation

A modern, interactive 3D Solar System built using **Three.js** and **Vite**. Features real-time animation, speed control, planet zoom, tooltips, dark/light mode, Saturn's rings, background stars, and a minimap.

## 🎥 Demo Video

🔗 [Watch the Demo](https://drive.google.com/file/d/1-Ab8Fhy-3uBOj4JEUVNC4I9udfkz6w7R/view?usp=sharing)  


## 🚀 Features

- ✅ Real-time orbit animation of all **8 planets**
- ✅ Individual **speed control sliders** for each planet
- ✅ **Pause/Resume** animation button
- ✅ **Click to zoom** into any planet
- ✅ **Tooltips** and **labels** on hover
- ✅ **Dark/Light mode** toggle
- ✅ Realistic **Saturn's rings**
- ✅ **Minimap** showing planet positions
- ✅ **Background stars** for immersive space feel
- ✅ Clean, modern UI with responsive layout


## 📁 Folder Structure

solar-system/

├── index.html # Entry HTML file (root level)

├── vite.config.js # Vite config

├── package.json # Dependencies and scripts

└── src/

├── main.js # Three.js scene setup and logic

├── style.css # Styling (modern and responsive)

└── utilis.js # Planet metadata (distance, speed, textures)


### 🔗 Live Demo

🌐(https://imyash-j.github.io/3d-solar-system/)


## 🛠️ Tech Stack

- [Three.js](https://threejs.org/)
- [Vite](https://vitejs.dev/)
- JavaScript (ES6)
- GSAP (for transitions)
- HTML/CSS

## 🧪 How It Works

- Each planet is placed at a different orbital radius from the sun.
- Orbit is simulated using trigonometric rotation in the animation loop.
- Speed control sliders dynamically update orbital speed.
- Hover events trigger tooltips and label rendering.
- Click events trigger smooth zoom-in camera transitions.
- A mini-map renders small planet dots in 2D overlay.
- Stars and Saturn’s rings add visual depth.

  ## 🖥️ Setup Instructions

```bash
# Clone the repository
git clone https://github.com/your-username/solar-system

# Navigate to the project
cd solar-system

# Install dependencies
npm install

# Run the development server
npm run dev


```

🧑‍💻 Author
Yash Javiya – @ImYash-J
