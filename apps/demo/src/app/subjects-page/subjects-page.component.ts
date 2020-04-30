import { Component } from "@angular/core";
import { Subject, timer } from "rxjs";
import { takeWhile } from "rxjs/operators";

@Component({
  selector: "reactive-demo-subjects-page",
  templateUrl: "./subjects-page.component.html",
  styleUrls: ["./subjects-page.component.scss"]
})
export class SubjectsPageComponent {
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
      subject.subscribe({
        next: data => console.log("Subscription 1: ", data),
        complete: () => console.log("Subscription 1 complete")
      });
    });

    timer(2000).subscribe(() => {
      subject.subscribe({
        next: data => console.log("Subscription 2: ", data),
        complete: () => console.log("Subscription 2 complete")
      });
    });
  }

  stop() {
    console.clear();
  }
}
