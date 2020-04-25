import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonModule } from "@angular/material/button";

import { AppComponent } from "./app.component";
import { RouterModule, Routes } from "@angular/router";
import { ObservablesPageComponent } from "./observables-page/observables-page.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { WelcomePageComponent } from "./welcome-page/welcome-page.component";

const routes: Routes = [
  { path: "observables", component: ObservablesPageComponent },
  { path: "", component: WelcomePageComponent }
];

@NgModule({
  declarations: [AppComponent, ObservablesPageComponent, WelcomePageComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatExpansionModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
