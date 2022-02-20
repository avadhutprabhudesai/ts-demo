import Autobind from '../decorators/Autobind';
import Draggable from '../interfaces/IDraggable';
import Project from '../interfaces/IProject';
import Component from './Component';

class ProjectItem extends Component<HTMLLIElement> implements Draggable {
  constructor(hostElId: string, private project: Project) {
    super('single-project', hostElId, 'beforeend', project.id);
    this.renderContent();
    this.registerEvents();
  }

  get persons() {
    return `Team will be of ${String(this.project.numOfPeople)} developers`;
  }

  renderContent(): void {
    const title = this.element.querySelector('h2') as HTMLHeadElement;
    const description = this.element.querySelector('h3') as HTMLHeadElement;
    const people = this.element.querySelector('p') as HTMLParagraphElement;

    title.innerText = this.project.title;
    description.innerText = this.project.description;
    people.innerText = String(this.persons);
  }

  registerEvents(): void {
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  @Autobind
  dragStartHandler(e: DragEvent): void {
    e.dataTransfer!.setData('text/plain', this.project.id);
    e.dataTransfer!.effectAllowed = 'move';
  }
  @Autobind
  dragEndHandler(e: DragEvent): void {}
}

export default ProjectItem;
