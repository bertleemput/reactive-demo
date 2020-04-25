import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ObservablesPageComponent } from "./observables-page.component";

describe("ObservablesPageComponent", () => {
  let component: ObservablesPageComponent;
  let fixture: ComponentFixture<ObservablesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ObservablesPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservablesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
