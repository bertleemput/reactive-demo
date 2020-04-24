import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { timer, Observable } from 'rxjs';

import hljs from 'highlight.js/lib/core';

@Component({
  selector: 'reactive-demo-demo-one',
  templateUrl: './demo-one.component.html',
  styleUrls: ['./demo-one.component.scss']
})
export class DemoOneComponent implements OnInit, AfterViewInit {
  @ViewChild('code')
  codeElement: ElementRef;

  constructor() {}

  demo1Code = `const interval$ = timer(0, 5000);

  const subscription = interval$.subscribe(x => {
    console.log('number: ', x);
  });
  `;

  ngOnInit(): void {
    this.demo1();
  }

  private demo1() {
    const interval$ = timer(0, 5000);

    const subscription = interval$.subscribe(x => {
      console.log('number: ', x);
    });

    // button click unsubscribe
  }

  private demo2() {
    const sequence$ = new Observable(observer => {
      observer.next(1);
      observer.next(2);

      timer(3000, 1000).subscribe(x => {
        observer.next(x + 3);
      });
    });

    console.log('Before subscription');
    const subscription = sequence$.subscribe(x => console.log('Receiving', x));
    console.log('After subscription');
  }

  ngAfterViewInit(): void {
    hljs.highlightBlock(this.codeElement.nativeElement);
  }
}
