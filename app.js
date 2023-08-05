import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { filterByDifficulty } from './public/filterByDifficulty.js';

const app = express();
const port = 3000;
const projectsFile = 'projects.json';

// Get the current file's directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));


// Route to get a random project as HTML
app.get('/project', (req, res) => {
  fs.readFile(projectsFile, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      let randomProject;
      randomProject= filterByDifficulty(data);

      // Convert the random project to an HTML string
      const html = `
        <head>
          <meta charset="UTF-8">
          <title>Random Idea</title>
          <link rel="stylesheet" href="style.css">
        </head>
        <body>
          <main>
            <div class="content">
              <button id="beginner">Beginner</button>
              <h2>${randomProject.name}</h2>
              <p>Description: ${randomProject.description}</p>
              <p>Difficulty: ${randomProject.difficulty}</p>
              <p>Tags: ${randomProject.tags}</p>
            </div>
            <div class="toggle-dark-mode">
              <img src="moon.svg" onclick="toggleDarkMode()" alt="Darkmode toggle">
            </div>
          </main>
          <footer>
            <p>Created by <a href="https://github.com/arozx/ideas">arozx</a></p>
          </footer>
          <script src="script.js"></script>
        </body>
      `;
      // Set the Content-Type header to indicate HTML response
      res.setHeader('Content-Type', 'text/html');
      // Send the HTML string as the response
      res.send(html);
    }
  });
});

// Route to serve the projects as HTML
app.get('/projects', (req, res) => {
  fs.readFile(projectsFile, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const projects = JSON.parse(data);
      const projectsHTML = projects
        .map(
          project => `
            <div>
              <h2>${project.name}</h2>
              <p>${project.description}</p>
            </div>
          `
        )
        .join('');

      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Projects</title>
            <link rel="stylesheet" href="style.css">
          </head>
          <body>
            <header>
              <nav>
                <h1>Projects</h1>
              </nav>
            </header>
            <main>
              <div class="content">
                <p>A list of projects</p>
                ${projectsHTML}
              </div>
              <div class="toggle-dark-mode">
                <img src="moon.svg" onclick="toggleDarkMode()" alt="Darkmode toggle">
              </div>
            </main>
            <footer>
              <p>Created by <a href="https://github.com/arozx/ideas">arozx</a></p>
            </footer>
            <script src="script.js"></script>
          </body>
        </html>
      `;

      res.send(html);
    }
  });
});

// Route to handle adding a project
app.get('/add-project', (req, res) => {
  const addProjectFilePath = path.join(__dirname, 'public', 'add-project.html');

  fs.readFile(addProjectFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.setHeader('Content-Type', 'text/html');
      res.send(data);
    }
  });
});

// Route to handle adding a project
app.post('/add-project', (req, res) => {
  const { name, description, difficulty, tags } = req.body;

  // Input validation
  if (!name || !description || !difficulty || !tags) {
    return res.status(400).send('All fields are required');
  }

  const maxNameLength = 50;
  if (name.length > maxNameLength) {
    return res.status(400).send(`Project name should be up to ${maxNameLength} characters long`);
  }

  const maxDescriptionLength = 200;
  if (description.length > maxDescriptionLength) {
    return res.status(400).send(`Project description should be up to ${maxDescriptionLength} characters long`);
  }

  const maxDifficultyLength = 12;
  if (difficulty.length > maxDifficultyLength) {
    return res.status(400).send(`Project difficulty should be up to ${maxDifficultyLength} characters long`);
  }

  const maxTagLength = 50;
  if (tags.length > maxTagLength) {
    return res.status(400).send(`Project tags should be up to ${maxTagLength} characters long`);
  }

  const newProject = {
    name,
    description,
    difficulty,
    tags,
  };

  fs.readFile(projectsFile, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const projects = JSON.parse(data);
      projects.push(newProject);

      fs.writeFile(projectsFile, JSON.stringify(projects), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        } else {
          // Instead of redirecting, return JSON response with the redirection URL
          res.status(200).json({ redirectUrl: '/project' });
        }
      });
    }
  });
});


export default app;