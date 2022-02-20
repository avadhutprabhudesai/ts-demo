import ProjectType from '../enums/ProjectType';

interface Project {
  id: string;
  title: string;
  description: string;
  numOfPeople: number;
  type: ProjectType;
}

export default Project;
