/**
 * Render type wise lists of projects
 */

import Autobind from '../decorators/Autobind';
import ProjectType from '../enums/ProjectType';
import DragTarget from '../interfaces/iDragTarget';
import Project from '../interfaces/IProject';
import Component from './Component';
import ProjectItem from './ProjectItem';
import ProjectState from './ProjectState';

class ProjectList extends Component<HTMLElement> implements DragTarget {
  projects: Project[] = [];
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;

  constructor(private type: ProjectType) {
    super('project-list', 'app', 'beforeend', `${type}-projects`);

    this.renderContent();

    const projState = ProjectState.getInstance();

    projState.addListener((projects: Project[]) => {
      this.projects = projects.filter((p) => this.type === p.type);

      this.renderProjects();
      this.registerEvents();
    });
  }

  @Autobind
  dragOverHandler(e: DragEvent): void {
    if (e.dataTransfer && e.dataTransfer.types[0] === 'text/plain') {
      e.preventDefault();
      const list = this.element.querySelector('ul')! as HTMLUListElement;
      list.classList.add('droppable');
    }
  }
  @Autobind
  dropHandler(e: DragEvent): void {
    e.stopImmediatePropagation();
    const data = e.dataTransfer?.getData('text/plain');
    console.log(data);
    const projState = ProjectState.getInstance();
    projState.moveProject(data!, this.type);
  }

  @Autobind
  dragLeaveHandler(e: DragEvent): void {
    const list = this.element.querySelector('ul')! as HTMLUListElement;
    list.classList.remove('droppable');
  }

  registerEvents(): void {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('drop', this.dropHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
  }

  renderContent() {
    const heading = this.element.querySelector('h2')!;
    heading.textContent = `${this.type.toUpperCase()} PROJECTS`;
    const list = this.element.querySelector('ul')! as HTMLUListElement;
    list.id = `${this.type}-projects-list`;
  }

  private renderProjects() {
    const listEl = document
      .getElementById(`${this.type}-projects`)!
      .querySelector('ul')! as HTMLUListElement;

    listEl.innerHTML = '';

    for (const project of this.projects) {
      const projectItem = new ProjectItem(
        `${this.type}-projects-list`,
        project
      );
    }
  }
}

export default ProjectList;
