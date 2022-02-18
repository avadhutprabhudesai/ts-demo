import Project from '../interfaces/IProject';

class ProjectState {
  projects: Project[] = [];
  listeners: any[] = [];

  static instance: ProjectState;

  private constructor() {}

  static getInstance(): ProjectState {
    if (!this.instance) {
      this.instance = new ProjectState();
    }
    return this.instance;
  }

  addProject(project: Project) {
    this.projects.push(project);
    for (const l of this.listeners) {
      l(this.projects.slice());
    }
  }

  addListener(listener: Function) {
    this.listeners.push(listener);
  }
}

export default ProjectState;
