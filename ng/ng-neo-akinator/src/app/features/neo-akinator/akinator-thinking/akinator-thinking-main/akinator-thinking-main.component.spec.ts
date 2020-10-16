import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AkinatorThinkingMainComponent } from './akinator-thinking-main.component';

describe('AkinatorThinkingMainComponent', () => {
  let component: AkinatorThinkingMainComponent;
  let fixture: ComponentFixture<AkinatorThinkingMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AkinatorThinkingMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AkinatorThinkingMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
