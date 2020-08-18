import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appInput]'
})
export class InputDirective {

  @Output() getPrompt = new EventEmitter<string>();
  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInput(event) {
    if (event.target === this.el.nativeElement) {
        this.getPrompt.emit(event.target.value);
    }
  }

}
