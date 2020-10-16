import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AkinatorTopComponent } from './akinator-top.component';

describe('AkinatorTopComponent', () => {
  let component: AkinatorTopComponent;
  let fixture: ComponentFixture<AkinatorTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AkinatorTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AkinatorTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
