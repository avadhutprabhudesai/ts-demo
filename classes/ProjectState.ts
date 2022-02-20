import ProjectType from '../enums/ProjectType';
import Project from '../interfaces/IProject';

type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listener: Listener<T>): void {
    this.listeners.push(listener);
  }
}

class ProjectState extends State<Project> {
  projects: Project[] = [];

  static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance(): ProjectState {
    if (!this.instance) {
      this.instance = new ProjectState();
    }
    return this.instance;
  }

  private updateListeners() {
    for (const l of this.listeners) {
      l(this.projects.slice());
    }
  }

  addProject(project: Project) {
    this.projects.push(project);
    this.updateListeners();
  }
  moveProject(id: string, type: ProjectType) {
    const projToMove = this.projects.find((p) => p.id === id);
    if (projToMove) {
      projToMove.type = type;
    }
    this.updateListeners();
  }
}

export default ProjectState;
