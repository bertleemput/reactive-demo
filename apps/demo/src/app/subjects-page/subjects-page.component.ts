import {
  Component,
  QueryList,
  ElementRef,
  AfterViewInit,
  ViewChildren
} from "@angular/core";
import { Subject, timer } from "rxjs";
import { takeWhile } from "rxjs/operators";

import hljs from "highlight.js/lib/core";

@Component({
  selector: "reactive-demo-subjects-page",
  templateUrl: "./subjects-page.component.html",
  styleUrls: ["./subjects-page.component.scss"]
})
export class SubjectsPageComponent implements AfterViewInit {
  @ViewChildren("code")
  codeSnippets: QueryList<ElementRef>;

  subjectDemoCode = `
  const subject = new Subject<number>();

  // Timer is a cold observable
  timer(0, 1000)
    .pipe(takeWhile(x => x < 5))
    .subscribe(subject);

  timer(1000).subscribe(() => {
    subject.subscribe(data => console.log("Subscription 1: ", data));
  });

  timer(2000).subscribe(() => {
    subject.subscribe(data => console.log("Subscription 2: ", data));
  });
  `;

  startSubjectDemo() {
    const subject = new Subject<number>();

    // Timer is a cold observable
    timer(0, 1000)
      .pipe(takeWhile(x => x < 5))
      .subscribe(subject);

    timer(1000).subscribe(() => {
      subject.subscribe(data => console.log("Subscription 1: ", data));
    });

    timer(2000).subscribe(() => {
      subject.subscribe(data => console.log("Subscription 2: ", data));
    });
  }

  ngAfterViewInit(): void {
    this.codeSnippets.forEach(x => hljs.highlightBlock(x.nativeElement));
  }
}
