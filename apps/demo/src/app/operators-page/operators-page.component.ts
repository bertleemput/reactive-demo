import { Component } from "@angular/core";
import { timer, fromEvent, combineLatest, merge } from "rxjs";
import { scan, mapTo, withLatestFrom } from "rxjs/operators";

@Component({
  selector: "reactive-demo-operators-page",
  templateUrl: "./operators-page.component.html",
  styleUrls: ["./operators-page.component.scss"]
})
export class OperatorsPageComponent {
  combineLatestDemoCode = `
  const timer$ = timer(0, 1000);
  const click$ = fromEvent(document, "mousedown").pipe(
    scan(acc => acc + 1, 0)
  );

  combineLatest([timer$, click$]).subscribe(([timerTicks, clicks]) =>
    console.log(
      \`We have received \${timerTicks} timer ticks and \${clicks} clicks\`
    )
  );
  `;

  mergeDemoCode = `
  const timerOne$ = timer(3000).pipe(mapTo("A"));
  const timerTwo$ = timer(1000).pipe(mapTo(1));
  const timerThree$ = timer(2000).pipe(mapTo({ name: "Rxjs Demo" }));

  merge(timerOne$, timerTwo$, timerThree$).subscribe(value =>
    console.log(value)
  );
  `;

  withLatestFromDemoCode = `
  const timer$ = timer(5000, 1000);

  const click$ = fromEvent(document, "mousedown").pipe(
    scan(acc => acc + 1, 0)
  );

  click$
    .pipe(withLatestFrom(timer$))
    .subscribe(([click, t]) => console.log(click, t));
  `;

  startCombineLatestDemo() {
    const timer$ = timer(0, 1000);
    const click$ = fromEvent(document, "mousedown").pipe(
      scan(acc => acc + 1, 0)
    );

    combineLatest([timer$, click$]).subscribe(([timerTicks, clicks]) =>
      console.log(
        `We have received ${timerTicks} timer ticks and ${clicks} clicks`
      )
    );
  }

  startMergeDemo() {
    const timerOne$ = timer(3000).pipe(mapTo("A"));
    const timerTwo$ = timer(1000).pipe(mapTo(1));
    const timerThree$ = timer(2000).pipe(mapTo({ name: "Rxjs Demo" }));

    merge(timerOne$, timerTwo$, timerThree$).subscribe(value =>
      console.log(value)
    );
  }

  startWithLatestFromDemo() {
    const timer$ = timer(5000, 1000);

    const click$ = fromEvent(document, "mousedown").pipe(
      scan(acc => acc + 1, 0)
    );

    click$
      .pipe(withLatestFrom(timer$))
      .subscribe(([click, t]) => console.log(click, t));
  }
}
