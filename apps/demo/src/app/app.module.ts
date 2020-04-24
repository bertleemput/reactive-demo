import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonModule } from "@angular/material/button";

import { AppComponent } from "./app.component";
import { RouterModule, Routes } from "@angular/router";
import { DemoOneComponent } from "./demo-one/demo-one.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

const routes: Routes = [{ path: "demo-1", component: DemoOneComponent }];

@NgModule({
  declarations: [AppComponent, DemoOneComponent],
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
