# Professional B.Tech CSE-AIDS Portfolio

A sleek, modern, interactive, and responsive portfolio designed for final-year students specializing in **Computer Science & Engineering - Artificial Intelligence & Data Science (CSE-AIDS)**. Tailored to impress recruiters for placements and jobs.

## 🚀 Live Demo & Interactive Features

- **Futuristic Minimalist Mono Theme**: Stark black and grey palette with electric blue highlights and glowing interactive states.
- **Interactive Neural Network Backdrop**: A custom HTML5 Canvas rendering fluid, cursor-interactive node connections simulating neural nets.
- **AI Playpen (Linear Regression)**: An in-browser interactive math sandbox. Clicking on the canvas plots data points, and the Ordinary Least Squares (OLS) algorithm fits a regression line ($\hat{y} = \theta_0 + \theta_1 x$) and calculates $R^2$ in real-time.
- **Filterable Projects Grid**: Recruiter-focused design category selector to toggle between AI/Deep Learning, Data Science, and Software Engineering projects.
- **Responsive Layout**: Designed from the ground up for desktop, tablet, and mobile browsers.

---

## 📂 Project Structure

```
PortFolio/
├── index.html          # Core HTML markup (Structure, Sections, Metadata)
├── styles.css          # CSS Styling (Variables, Transitions, Glassmorphism, Responsive Grid)
├── script.js           # Interactive Features (Canvas Net, Typewriter, regression math, filtering)
├── assets/
│   ├── profile.png     # Your profile picture (replace with your photo)
│   └── resume.pdf      # Your placement resume (replace with your PDF resume)
└── README.md           # This guide
```

---

## ✍️ How to Personalize Your Portfolio

You do not need any compilation tools (like npm or bundlers). All modifications are done in a single file: `index.html`.

### 1. Change Your Name and Tagline
Open [index.html](file:///c:/Users/jmsin/Desktop/PortFolio/index.html) and edit:
- **Title Tag** (Line 7): `<title>Professional CSE-AIDS Portfolio</title>`
- **Hero Title** (Line 48): `<h1>Hello, I'm <span class="highlight-text">Your Name</span></h1>`
- **Hero Description** (Line 52)
- **Footer Copyright** (Line 427)

### 2. Update About & Education Details
Locate the `<section id="about">` block (Lines 63-88):
- Change the intro text to align with your career goals.
- Replace `Your University / College Name` and set your graduation year and current CGPA (Line 77-80).

### 3. Customize Your Skills Matrix
Locate the `<section id="skills">` block (Lines 91-168):
- For each skill (e.g., Python, SQL, PyTorch):
  - Change the name or percentage label (e.g., `95%`).
  - Edit the data attribute `data-width="95%"` in the `<div class="skill-bar">` tag. The bar will automatically fill to that percentage when scrolled into view.

### 4. Edit or Add Projects
Locate the `<section id="projects">` block (Lines 171-331):
- Each project card is represented by a `<div class="project-card" data-category="...">`.
- Available category values for filtering: `ml-dl`, `data-science`, or `software`.
- Update the Title, Description, GitHub repo links, live demo links, and project tag pills.

### 5. Personalize Experience and Timeline
Locate the `<section id="timeline">` block (Lines 357-399):
- Change dates, roles (e.g., Internships, Research), and descriptive bullet points.

### 6. Set Up Your Contact Info
Locate the `<section id="contact">` block (Lines 402-423):
- Change email address, LinkedIn profile URI, and GitHub username.
- Set your email in the mailto links so recruiters can message you directly.

---

## 🖼️ Replacing Assets

1. **Profile Picture**: Replace the file inside `assets/profile.png` with a square headshot of yourself. Maintain the file name `profile.png` or edit the path in `index.html` (Line 83).
2. **Resume**: Export your professional resume as a PDF. Rename it to `resume.pdf` and copy it into the `assets/` directory (replacing the placeholder).

---

## 🌐 How to Deploy to GitHub Pages (Free)

Since this website is built using static client-side web technologies, you can host it for free in 2 minutes:

1. Create a new repository on GitHub (e.g., `my-portfolio`).
2. Push all these files (`index.html`, `styles.css`, `script.js`, `assets/`) to the repository.
3. On GitHub, go to your repository **Settings** -> **Pages** (under Code and automation).
4. Set the **Source** to `Deploy from a branch`, choose `main` or `master` branch and the root directory `/`, then click **Save**.
5. Your portfolio will be live at `https://<your-username>.github.io/my-portfolio/`!
