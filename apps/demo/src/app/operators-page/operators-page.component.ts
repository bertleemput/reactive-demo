import { Component, OnDestroy } from "@angular/core";
import {
  timer,
  fromEvent,
  combineLatest,
  merge,
  from,
  of,
  Subject
} from "rxjs";
import {
  scan,
  mapTo,
  withLatestFrom,
  map,
  debounceTime,
  tap,
  distinctUntilChanged,
  filter,
  takeUntil,
  take
} from "rxjs/operators";

@Component({
  selector: "reactive-demo-operators-page",
  templateUrl: "./operators-page.component.html",
  styleUrls: ["./operators-page.component.scss"]
})
export class OperatorsPageComponent implements OnDestroy {
  destroySubject = new Subject();
  inputSubject = new Subject<string>();

  combineLatestDemoCode = `
  const timer$ = timer(0, 1000);
  const click$ = fromEvent(document, "mousedown").pipe(
    scan(acc => acc + 1, 0)
  );

  combineLatest([timer$, click$])
    .subscribe(([timerTicks, clicks]) =>
      console.log(
        \`We have received \${timerTicks} timer ticks and \${clicks} clicks\`
      )
    );
  `;

  mergeDemoCode = `
  const timerOne$ = timer(3000).pipe(mapTo("A"));
  const timerTwo$ = timer(1000).pipe(mapTo(1));
  const timerThree$ = timer(2000).pipe(mapTo({ name: "Rxjs Demo" }));

  merge(timerOne$, timerTwo$, timerThree$).subscribe({
    next: value => console.log("Merge:", value),
    complete: () => console.log("Merge completed")
  });
  `;

  withLatestFromDemoCode = `
  const timer$ = timer(5000, 1000);

  const click$ = fromEvent(document, "mousedown").pipe(
    scan(acc => acc + 1, 0)
  );

  click$
    .pipe(withLatestFrom(timer$))
    .subscribe(([clicks, timerTicks]) =>
      console.log(
        \`We have received \${timerTicks} timer ticks and \${clicks} clicks\`
      )
    );
  `;

  fromDemoCode = `
  from([0, 1, 2, 3, 4]).subscribe(value =>
    console.log("From array: ", value)
  );

  const promise = new Promise(resolve => {
    timer(5000).subscribe(() => resolve(Math.random()));
  });

  from(promise).subscribe(value => console.log("From promise: ", value));
  `;

  ofDemoCode = `
  of(1, "b", "c", { name: "RxJS demo" }, 5).subscribe({
    next: value => console.log("Of:", value),
    complete: () => console.log("Of completed")
  });
  `;

  debounceDemoCode = `
  this.inputSubject
  .pipe(debounceTime(1000))
  .subscribe(x => console.log("Debounce: " + x));
  `;

  distinctUntilChangedDemoCode = `
  const keyPresses$ = fromEvent(document, "keydown").pipe(
    map((x: KeyboardEvent) => x.key),
    distinctUntilChanged()
  );

  keyPresses$.subscribe(x => console.log("Distinct: " + x));
  `;

  filterDemoCode = `
  const filteredTimer = timer(0, 1000).pipe(
    filter(x => x % 2 === 0)
  );

  filteredTimer.subscribe(x => console.log("Filter: " + x));
  `;

  takeDemoCode = `
  const values$ = of(0, 1, 2, 3, 4, 5, 6).pipe(take(3));

  values$.subscribe({
    next: value => console.log("Take:", value),
    complete: () => console.log("Take completed")
  });
  `;

  handleInput(event: InputEvent) {
    const element = event.target as HTMLInputElement;
    this.inputSubject.next(element.value);
  }

  startCombineLatestDemo() {
    const timer$ = timer(0, 1000);
    const click$ = fromEvent(document, "mousedown").pipe(
      scan(acc => acc + 1, 0)
    );

    combineLatest([timer$, click$])
      .pipe(takeUntil(this.destroySubject))
      .subscribe(([timerTicks, clicks]) =>
        console.log(
          `We have received ${timerTicks} timer ticks and ${clicks} clicks`
        )
      );
  }

  startMergeDemo() {
    const timerOne$ = timer(3000).pipe(mapTo("A"));
    const timerTwo$ = timer(1000).pipe(mapTo(1));
    const timerThree$ = timer(2000).pipe(mapTo({ name: "Rxjs Demo" }));

    merge(timerOne$, timerTwo$, timerThree$).subscribe({
      next: value => console.log("Merge:", value),
      complete: () => console.log("Merge completed")
    });
  }

  startWithLatestFromDemo() {
    const timer$ = timer(5000, 1000);

    const click$ = fromEvent(document, "mousedown").pipe(
      scan(acc => acc + 1, 0),
      takeUntil(this.destroySubject)
    );

    click$
      .pipe(withLatestFrom(timer$), takeUntil(this.destroySubject))
      .subscribe(([clicks, timerTicks]) =>
        console.log(
          `We have received ${timerTicks} timer ticks and ${clicks} clicks`
        )
      );
  }

  startFromDemo() {
    from([0, 1, 2, 3, 4]).subscribe({
      next: value => console.log("From array:", value),
      complete: () => console.log("From array completed")
    });

    const promise = new Promise(resolve => {
      timer(5000).subscribe(() => resolve(Math.random()));
    });

    from(promise).subscribe({
      next: value => console.log("From promise:", value),
      complete: () => console.log("From promise completed")
    });
  }

  startOfDemo() {
    of(1, "b", "c", { name: "RxJS demo" }, 5).subscribe({
      next: value => console.log("of:", value),
      complete: () => console.log("of completed")
    });
  }

  startDebounceTimeDemo() {
    this.inputSubject
      .pipe(debounceTime(1000), takeUntil(this.destroySubject))
      .subscribe(x => console.log("Debounce: " + x));
  }

  startDistinctUntilChangedDemo() {
    const keyPresses$ = fromEvent(document, "keydown").pipe(
      map((x: KeyboardEvent) => x.key),
      distinctUntilChanged(),
      takeUntil(this.destroySubject)
    );

    keyPresses$.subscribe(x => console.log("Distinct: " + x));
  }

  startFilterDemo() {
    const filteredTimer = timer(0, 1000).pipe(
      filter(x => x % 2 === 0),
      takeUntil(this.destroySubject)
    );

    filteredTimer.subscribe(x => console.log("Filter: " + x));
  }

  startTakeDemo() {
    const values$ = of(0, 1, 2, 3, 4, 5, 6).pipe(take(3));

    values$.subscribe({
      next: value => console.log("Take:", value),
      complete: () => console.log("Take completed")
    });
  }

  stop() {
    this.destroySubject.next();
    console.clear();
  }

  ngOnDestroy(): void {
    this.stop();
  }
}
