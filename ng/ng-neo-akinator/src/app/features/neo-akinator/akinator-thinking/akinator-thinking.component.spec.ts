import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AkinatorThinkingComponent } from './akinator-thinking.component';

describe('AkinatorThinkingComponent', () => {
  let component: AkinatorThinkingComponent;
  let fixture: ComponentFixture<AkinatorThinkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AkinatorThinkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AkinatorThinkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
