abstract class Component<T extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  element: T;
  hostElement: HTMLDivElement;

  constructor(
    templateElementId: string,
    hostElementId: string,
    insertAt: string,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateElementId
    )! as HTMLTemplateElement;

    this.hostElement = document.getElementById(
      hostElementId
    )! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    )!;

    this.element = importedNode.firstElementChild! as T;

    if (newElementId) {
      this.element.id = newElementId;
    }
    this.attach(insertAt);
  }

  private attach(insertAt: string) {
    this.hostElement.insertAdjacentElement(
      insertAt as InsertPosition,
      this.element
    );
  }

  abstract renderContent(): void;
  abstract registerEvents(): void;
}

export default Component;
