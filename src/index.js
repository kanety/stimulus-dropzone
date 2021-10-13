import { Controller } from '@hotwired/stimulus';
import '@kanety/stimulus-static-actions';
import './index.scss';

export default class extends Controller {
  static values = {
    growWidth: String,
    growHeight: String
  }
  static actions = [
    ['element', 'dragenter->enter'],
    ['element', 'dragleave->leave'],
    ['element', 'drop->drop'],
    ['element', 'dragover@document->overDoc'],
    ['element', 'dragleave@document->leaveDoc'],
    ['element', 'drop@document->dropDoc']
  ];

  get input() {
    return this.scope.findElement('input[type=file]');
  }

  connect() {
    this.counter = 0;
  }

  enter(e) {
    this.counter++;
    this.toggleClass(e.dataTransfer, true);
    e.preventDefault();
  }

  leave(e) {
    this.counter--;
    if (this.counter == 0) this.toggleClass(e.dataTransfer, false);
    e.preventDefault();
  }

  drop(e) {
    this.counter = 0;
    this.toggleClass(e.dataTransfer, false);

    if (this.droppable(e.dataTransfer)) {
      let input = this.input;
      if (input) {
        input.files = e.dataTransfer.files;
        input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
        input.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
      }
      this.dispatch('dropped', { detail: { files: e.dataTransfer.files } });
    }

    e.preventDefault();
  }

  toggleClass(dataTransfer, dragover) {
    if (dragover) {
      this.element.classList.add('st-dropzone--dragover');
      if (!this.droppable(dataTransfer)) {
        this.element.classList.add('st-dropzone--disable-drop');
      }
    } else {
      this.element.classList.remove('st-dropzone--dragover');
      if (!this.droppable(dataTransfer)) {
        this.element.classList.remove('st-dropzone--disable-drop');
      }
    }
  }

  overDoc(e) {
    this.dragging = true;
    this.dragin()
    e.preventDefault();
  }

  leaveDoc(e) {
    this.dragging = false;
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (!this.dragging) this.dragout();
    } , 200);
    e.preventDefault();
  }

  dropDoc(e) {
    this.dragging = false;
    this.dragout();
    e.preventDefault();
  }

  dragin() {
    this.element.classList.add('st-dropzone--dragin');
    if (this.growWidthValue) {
      this.element.style.minWidth = this.growWidthValue;
    }
    if (this.growHeightValue) {
      this.element.style.minHeight = this.growHeightValue;
    }
  }

  dragout() {
    this.element.classList.remove('st-dropzone--dragin');
    if (this.growWidthValue) {
      this.element.style.minWidth = '';
    }
    if (this.growHeightValue) {
      this.element.style.minHeight = '';
    }
  }

  droppable(dataTransfer) {
    let input = this.input;
    return !input || input.hasAttribute('multiple') || dataTransfer.items.length == 1;
  }
}
