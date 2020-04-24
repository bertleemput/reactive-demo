import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { DemoOneComponent } from './demo-one/demo-one.component';

const routes: Routes = [{ path: 'demo-1', component: DemoOneComponent }];

@NgModule({
  declarations: [AppComponent, DemoOneComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
