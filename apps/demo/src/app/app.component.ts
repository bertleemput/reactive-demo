import typescript from 'highlight.js/lib/languages/typescript';
import { Component, OnInit } from '@angular/core';
import hljs from 'highlight.js/lib/core';

import 'highlight.js/styles/github.css';

@Component({
  selector: 'reactive-demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'demo';

  ngOnInit(): void {
    hljs.registerLanguage('typescript', typescript);
  }
}
