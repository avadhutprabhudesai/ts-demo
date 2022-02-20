import ProjectInput from './classes/ProjectInput';
import ProjectList from './classes/ProjectList';
import ProjectType from './enums/ProjectType';
import './style.css';

const projInput = new ProjectInput();
const activeProjects = new ProjectList(ProjectType.ACTIVE);
const finishedProjects = new ProjectList(ProjectType.FINISHED);
