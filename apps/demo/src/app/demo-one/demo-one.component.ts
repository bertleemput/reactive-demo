import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChildren,
  QueryList
} from "@angular/core";
import { timer, Observable, Subscription, throwError, of } from "rxjs";
import { mergeMap } from "rxjs/operators";

import hljs from "highlight.js/lib/core";

@Component({
  selector: "reactive-demo-demo-one",
  templateUrl: "./demo-one.component.html",
  styleUrls: ["./demo-one.component.scss"]
})
export class DemoOneComponent implements AfterViewInit {
  private intervalDemoSubscription: Subscription;

  @ViewChildren("code")
  codeSnippets: QueryList<ElementRef>;

  intervalDemoStart = `
  // Start the timer
  const interval$ = timer(0, 2000);

  this.intervalDemoSubscription = interval$.subscribe(data => {
    console.log("Received: ", data);
  });`;

  intervalDemoStop = `
  // Stop the timer
  if (this.intervalDemoSubscription) {
    this.intervalDemoSubscription.unsubscribe();
  }`;

  completeDemoStart = `
  const interval$ = timer(2000);

  interval$.subscribe({
    next: data => console.log(data),
    complete: () => console.log("Observable completed")
  });`;

  errorDemoStart = `
  timer(0, 1000)
    .pipe(mergeMap(x => (x === 3 ? throwError("OOPS") : of(x))))
    .subscribe({
      next: data => console.log(data),
      complete: () => console.log("Observable completed"),
      error: error => console.error("Error occurred:" + error)
    });
  `;

  asyncDemoStart = `
  const sequence$ = new Observable(observer => {
    observer.next(1);
    observer.next(2);

    timer(3000).subscribe(x => {
      observer.next(3);
      observer.complete();
    });
  });

  console.log("Before subscription");
  sequence$.subscribe(x =>
    console.log("Data: ", x)
  );
  console.log("After subscription");
  `;

  startIntervalDemo() {
    const interval$ = timer(0, 2000);

    this.intervalDemoSubscription = interval$.subscribe(data => {
      console.log("Received: ", data);
    });
  }

  stopIntervalDemo() {
    if (this.intervalDemoSubscription) {
      this.intervalDemoSubscription.unsubscribe();
    }
  }

  startCompleteDemo() {
    const interval$ = timer(2000);

    interval$.subscribe({
      next: data => console.log(data),
      complete: () => console.log("Observable completed")
    });
  }

  startErrorDemo() {
    timer(0, 1000)
      .pipe(mergeMap(x => (x === 3 ? throwError("OOPS") : of(x))))
      .subscribe({
        next: data => console.log(data),
        complete: () => console.log("Observable completed"),
        error: error => console.error("Error occurred:" + error)
      });
  }

  startAsyncDemo() {
    const sequence$ = new Observable(observer => {
      observer.next(1);
      observer.next(2);

      timer(3000).subscribe(x => {
        observer.next(3);
        observer.complete();
      });
    });

    console.log("Before subscription");
    sequence$.subscribe(x => console.log("Data: ", x));
    console.log("After subscription");
  }

  ngAfterViewInit(): void {
    this.codeSnippets.forEach(x => hljs.highlightBlock(x.nativeElement));
  }
}
