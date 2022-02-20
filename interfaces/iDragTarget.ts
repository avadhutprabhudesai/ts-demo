interface DragTarget {
  dragOverHandler: (e: DragEvent) => void;
  dropHandler: (e: DragEvent) => void;
  dragLeaveHandler: (e: DragEvent) => void;
}

export default DragTarget;
