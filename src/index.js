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
    e.preventDefault();
    if (!this.isDroppable(e.dataTransfer)) return;

    this.counter++;
    this.toggleClass(e.dataTransfer, true);
  }

  leave(e) {
    e.preventDefault();
    if (!this.isDroppable(e.dataTransfer)) return;

    this.counter--;
    if (this.counter == 0) this.toggleClass(e.dataTransfer, false);
  }

  drop(e) {
    e.preventDefault();
    if (!this.isDroppable(e.dataTransfer)) return;

    this.counter = 0;
    this.toggleClass(e.dataTransfer, false);

    let input = this.input;
    if (input) {
      input.files = e.dataTransfer.files;
      input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
      input.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
    }
    this.dispatch('dropped', { detail: { files: e.dataTransfer.files } });
  }

  toggleClass(dataTransfer, dragover) {
    if (dragover && this.isDroppable(dataTransfer)) {
      this.element.classList.add('st-dropzone--dragover');
    } else {
      this.element.classList.remove('st-dropzone--dragover');
    }
  }

  overDoc(e) {
    e.preventDefault();
    if (!this.isDroppable(e.dataTransfer)) return;

    this.dragging = true;
    this.dragin()
  }

  leaveDoc(e) {
    e.preventDefault();
    if (!this.isDroppable(e.dataTransfer)) return;

    this.dragging = false;
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (!this.dragging) this.dragout();
    } , 200);
  }

  dropDoc(e) {
    e.preventDefault();
    if (!this.isDroppable(e.dataTransfer)) return;

    this.dragging = false;
    this.dragout();
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

  isDroppable(dataTransfer) {
    return dataTransfer.items.length && dataTransfer.items[0].kind == 'file' && this.isAllowedByInput(dataTransfer);
  }

  isAllowedByInput(dataTransfer) {
    let input = this.input;
    return !input || input.hasAttribute('multiple') || dataTransfer.items.length == 1;
  }
}
