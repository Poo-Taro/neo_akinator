import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AkinatorAnswerComponent } from './akinator-answer.component';

describe('AkinatorAnswerComponent', () => {
  let component: AkinatorAnswerComponent;
  let fixture: ComponentFixture<AkinatorAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AkinatorAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AkinatorAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
