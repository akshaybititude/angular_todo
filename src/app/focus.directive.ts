import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective {

  constructor(private el:ElementRef) { }

  ngOnInit(){
    this.el.nativeElement.focus();
  }
}
