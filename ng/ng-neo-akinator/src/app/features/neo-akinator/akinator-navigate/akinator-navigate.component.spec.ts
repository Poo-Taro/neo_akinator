import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AkinatorNavigateComponent } from './akinator-navigate.component';

describe('AkinatorNavigateComponent', () => {
  let component: AkinatorNavigateComponent;
  let fixture: ComponentFixture<AkinatorNavigateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AkinatorNavigateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AkinatorNavigateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
