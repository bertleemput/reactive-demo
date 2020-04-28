import { Directive, ElementRef, AfterViewInit } from "@angular/core";

import hljs from "highlight.js/lib/core";

@Directive({
  selector: "[reactiveDemoCodeBlock]"
})
export class CodeBlockDirective implements AfterViewInit {
  constructor(private ref: ElementRef) {}

  ngAfterViewInit(): void {
    hljs.highlightBlock(this.ref.nativeElement);
  }
}
