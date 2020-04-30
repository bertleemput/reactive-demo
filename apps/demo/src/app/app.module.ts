import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonModule } from "@angular/material/button";
import { InlineSVGModule } from "ng-inline-svg";

import { AppComponent } from "./app.component";
import { RouterModule, Routes } from "@angular/router";
import { ObservablesPageComponent } from "./observables-page/observables-page.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { WelcomePageComponent } from "./welcome-page/welcome-page.component";
import { SubjectsPageComponent } from "./subjects-page/subjects-page.component";
import { HttpClientModule } from "@angular/common/http";
import { OperatorsPageComponent } from "./operators-page/operators-page.component";
import { CodeBlockDirective } from "./directives/code-block.directive";
import { MarbleDiagramComponent } from "./marble-diagram/marble-diagram.component";

const routes: Routes = [
  { path: "subjects", component: SubjectsPageComponent },
  { path: "observables", component: ObservablesPageComponent },
  { path: "operators", component: OperatorsPageComponent },
  { path: "", pathMatch: "full", component: WelcomePageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ObservablesPageComponent,
    WelcomePageComponent,
    SubjectsPageComponent,
    OperatorsPageComponent,
    CodeBlockDirective,
    MarbleDiagramComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpClientModule,
    InlineSVGModule.forRoot(),
    MatExpansionModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
