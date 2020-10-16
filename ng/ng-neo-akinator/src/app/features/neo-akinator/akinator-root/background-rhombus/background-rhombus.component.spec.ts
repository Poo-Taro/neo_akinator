import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundRhombusComponent } from './background-rhombus.component';

describe('BackgroundRhombusComponent', () => {
  let component: BackgroundRhombusComponent;
  let fixture: ComponentFixture<BackgroundRhombusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackgroundRhombusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundRhombusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
