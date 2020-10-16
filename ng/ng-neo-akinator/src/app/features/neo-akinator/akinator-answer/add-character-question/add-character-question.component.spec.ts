import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCharacterQuestionComponent } from './add-character-question.component';

describe('AddCharacterQuestionComponent', () => {
  let component: AddCharacterQuestionComponent;
  let fixture: ComponentFixture<AddCharacterQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCharacterQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCharacterQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
