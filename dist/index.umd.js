!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("@hotwired/stimulus"),require("@kanety/stimulus-static-actions")):"function"==typeof define&&define.amd?define(["@hotwired/stimulus","@kanety/stimulus-static-actions"],t):(e||self).StimulusDropzone=t(e.Stimulus)}(this,function(e){class t extends e.Controller{get input(){return this.scope.findElement("input[type=file]")}connect(){this.counter=0}enter(e){this.counter++,this.element.classList.add("st-dropzone--dragover"),e.preventDefault()}leave(e){this.counter--,0==this.counter&&this.element.classList.remove("st-dropzone--dragover"),e.preventDefault()}drop(e){this.counter=0,this.element.classList.remove("st-dropzone--dragover");var t=this.input;t&&(t.files=e.dataTransfer.files,t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0})),t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0}))),this.dispatch("dropped",{detail:{files:e.dataTransfer.files}}),e.preventDefault()}overDoc(e){this.dragging=!0,this.dragin(),e.preventDefault()}leaveDoc(e){this.dragging=!1,this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout(()=>{this.dragging||this.dragout()},200),e.preventDefault()}dropDoc(e){this.dragging=!1,this.dragout(),e.preventDefault()}dragin(){this.element.classList.add("st-dropzone--dragin"),this.growWidthValue&&(this.element.style.minWidth=this.growWidthValue),this.growHeightValue&&(this.element.style.minHeight=this.growHeightValue)}dragout(){this.element.classList.remove("st-dropzone--dragin"),this.growWidthValue&&(this.element.style.minWidth=""),this.growHeightValue&&(this.element.style.minHeight="")}}return t.values={growWidth:String,growHeight:String},t.actions=[["element","dragenter->enter"],["element","dragleave->leave"],["element","drop->drop"],["element","dragover@document->overDoc"],["element","dragleave@document->leaveDoc"],["element","drop@document->dropDoc"]],t});
//# sourceMappingURL=index.umd.js.map
