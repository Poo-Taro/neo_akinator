import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AkinatorCommentComponent } from './akinator-comment.component';

describe('AkinatorCommentComponent', () => {
  let component: AkinatorCommentComponent;
  let fixture: ComponentFixture<AkinatorCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AkinatorCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AkinatorCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
