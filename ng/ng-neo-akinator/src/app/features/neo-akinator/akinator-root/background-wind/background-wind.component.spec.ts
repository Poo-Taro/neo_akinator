import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundWindComponent } from './background-wind.component';

describe('BackgroundWindComponent', () => {
  let component: BackgroundWindComponent;
  let fixture: ComponentFixture<BackgroundWindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackgroundWindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundWindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
