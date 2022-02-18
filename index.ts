import ProjectInput from './classes/ProjectInput';
import ProjectList from './classes/ProjectList';
import './style.css';

const projInput = new ProjectInput();
const activeProjects = new ProjectList('active');
const finishedProjects = new ProjectList('finished');
