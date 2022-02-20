import Autobind from '../decorators/Autobind';
import Validatable from '../interfaces/IValidatable';
import ProjectState from './ProjectState';
import { v4 as uuidv4 } from 'uuid';
import Component from './Component';
import ProjectType from '../enums/ProjectType';
/**
 * Render the form to add the project
 */
class ProjectInput extends Component<HTMLFormElement> {
  titleInputEl: HTMLInputElement;
  descriptionInputEl: HTMLInputElement;
  peopleInputEl: HTMLInputElement;

  constructor() {
    super('project-input', 'app', 'afterbegin', '');

    this.titleInputEl = this.element.querySelector(
      '#title'
    ) as HTMLInputElement;
    this.descriptionInputEl = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.peopleInputEl = this.element.querySelector(
      '#people'
    ) as HTMLInputElement;

    this.registerEvents();
  }

  private gatherInputs(): [string, string, number] {
    return [
      this.titleInputEl.value,
      this.descriptionInputEl.value,
      +this.peopleInputEl.value,
    ];
  }

  private clearInputs() {
    this.titleInputEl.value = '';
    this.descriptionInputEl.value = '';
    this.peopleInputEl.value = '';
  }

  private validate(validatable: Validatable): boolean {
    let isValid = true;

    const { value, required, minLength, maxLength, min, max } = validatable;

    if (validatable.required) {
      isValid = isValid && value.toString().trim() !== '';
    }
    if (minLength != null && typeof value === 'string') {
      isValid = isValid && value.trim().length >= minLength;
    }
    if (maxLength != null && typeof value === 'string') {
      isValid = isValid && value.trim().length <= maxLength;
    }
    if (min != null && typeof value === 'number') {
      isValid = isValid && value >= min;
    }
    if (max != null && typeof value === 'number') {
      isValid = isValid && value <= max;
    }

    return isValid;
  }

  @Autobind
  private handleFormSubmit(event: Event) {
    event.preventDefault();

    const [title, description, peopleCount] = this.gatherInputs();

    /**
     * Validate each input
     * If at least one is invalid, show alert and stop
     * Else clear inputs and proceed
     */
    if (
      !this.validate({ value: title, required: true }) ||
      !this.validate({ value: description, required: true, minLength: 5 }) ||
      !this.validate({ value: peopleCount, required: true, min: 1, max: 5 })
    ) {
      alert('Please enter correct values');
    } else {
      this.clearInputs();

      const projectState = ProjectState.getInstance();
      projectState.addProject({
        id: uuidv4(),
        title,
        description,
        numOfPeople: peopleCount,
        type: ProjectType.ACTIVE,
      });
    }
  }

  renderContent(): void {}

  registerEvents() {
    this.element.addEventListener('submit', this.handleFormSubmit);
  }
}

export default ProjectInput;
