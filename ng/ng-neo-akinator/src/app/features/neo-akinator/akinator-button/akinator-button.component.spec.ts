import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AkinatorButtonComponent } from './akinator-button.component';

describe('AkinatorButtonComponent', () => {
  let component: AkinatorButtonComponent;
  let fixture: ComponentFixture<AkinatorButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AkinatorButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AkinatorButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
