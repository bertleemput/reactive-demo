import { Component, OnDestroy } from "@angular/core";
import {
  timer,
  Observable,
  Subscription,
  throwError,
  of,
  fromEvent,
  Subject
} from "rxjs";
import { mergeMap, takeUntil, map } from "rxjs/operators";

@Component({
  templateUrl: "./observables-page.component.html",
  styleUrls: ["./observables-page.component.scss"]
})
export class ObservablesPageComponent implements OnDestroy {
  private destroySubject = new Subject();
  private intervalDemoSubscription: Subscription;

  intervalDemoStartCode = `
  // Code that is called on 'Start'
  const interval$ = timer(0, 2000);

  this.intervalDemoSubscription = interval$.subscribe(data => {
    console.log("Received: ", data);
  });`;

  intervalDemoStopCode = `
  // Code that is called on 'Stop'
  if (this.intervalDemoSubscription) {
    this.intervalDemoSubscription.unsubscribe();
  }`;

  completeDemoCode = `
  const interval$ = timer(2000);

  interval$.subscribe({
    next: data => console.log(data),
    complete: () => console.log("Observable completed")
  });
  `;

  errorDemoCode = `
  timer(0, 1000)
    .pipe(mergeMap(x => (x === 3 ? throwError("OOPS") : of(x))))
    .subscribe({
      next: data => console.log(data),
      complete: () => console.log("Observable completed"),
      error: error => console.error("Error occurred:" + error)
    });
  `;

  hotColdDemoCode = `
  const cold$ = new Observable(observer => {
    observer.next(Math.random());
    observer.complete();
  });

  cold$.subscribe(data => console.log("Cold 1", data));
  cold$.subscribe(data => console.log("Cold 2", data));

  const hot$ = fromEvent(document, "mousedown").pipe(
    map((e: MouseEvent) => e.screenX)
  );
  hot$.subscribe(data => console.log("Hot 1", data));
  hot$.subscribe(data => console.log("Hot 2", data));
  `;

  asyncDemoCode = `
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

    console.clear();
  }

  stop() {
    this.destroySubject.next();
    console.clear();
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

  startHotColdDemo() {
    const cold$ = new Observable(observer => {
      observer.next(Math.random());
      observer.complete();
    });

    cold$.subscribe(data => console.log("Cold 1", data));
    cold$.subscribe(data => console.log("Cold 2", data));

    const hot$ = fromEvent(document, "mousedown").pipe(
      map((e: MouseEvent) => e.screenX),
      takeUntil(this.destroySubject)
    );
    hot$.subscribe(data => console.log("Hot 1", data));
    hot$.subscribe(data => console.log("Hot 2", data));
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

  ngOnDestroy(): void {
    this.stop();
  }
}
