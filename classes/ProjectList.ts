/**
 * Render type wise lists of projects
 */

import ProjectTypes from '../enums/ProjectTypes';
import Project from '../interfaces/IProject';
import Component from './Component';
import ProjectState from './ProjectState';

class ProjectList extends Component<HTMLElement> {
  projects: Project[] = [];
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;

  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', 'beforeend', `${type}-projects`);

    this.renderContent();

    const projState = ProjectState.getInstance();

    projState.addListener((projects: Project[]) => {
      this.projects = projects.filter((p) =>
        this.type === ProjectTypes.ACTIVE ? p.isActive : !p.isActive
      );

      this.renderProjects();
    });
  }

  registerEvents(): void {}

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
      // create a list item
      const listItem = document.createElement('li');
      listItem.textContent = project.title;
      // append it to the list
      listEl?.appendChild(listItem);
    }
  }
}

export default ProjectList;
