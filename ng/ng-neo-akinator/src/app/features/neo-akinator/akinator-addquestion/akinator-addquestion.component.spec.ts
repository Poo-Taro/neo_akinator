import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AkinatorAddquestionComponent } from './akinator-addquestion.component';

describe('AkinatorAddquestionComponent', () => {
  let component: AkinatorAddquestionComponent;
  let fixture: ComponentFixture<AkinatorAddquestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AkinatorAddquestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AkinatorAddquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
