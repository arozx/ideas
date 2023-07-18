export function filterByDifficulty(data) {
  let difficulty = "none";
  const projects = JSON.parse(data);

  if (difficulty !== "none") {
  // return a list of projects that have a difficulty equal to the difficulty selected
  const filteredProjects = projects.filter(project => project.difficulty === difficulty);
  console.log(filteredProjects);

  const randomProject = filteredProjects[Math.floor(Math.random() * filteredProjects.length)];
  return randomProject;
  } else {
    const randomProject = projects[Math.floor(Math.random() * projects.length)];
    return randomProject;
  }
}
