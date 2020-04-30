import { Component, Input } from "@angular/core";

@Component({
  selector: "reactive-demo-marble-diagram",
  templateUrl: "./marble-diagram.component.html",
  styleUrls: ["./marble-diagram.component.scss"]
})
export class MarbleDiagramComponent {
  @Input()
  diagram: string;
}
