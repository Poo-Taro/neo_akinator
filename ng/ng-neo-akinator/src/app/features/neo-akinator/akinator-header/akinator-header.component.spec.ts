import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AkinatorHeaderComponent } from './akinator-header.component';

describe('AkinatorHeaderComponent', () => {
  let component: AkinatorHeaderComponent;
  let fixture: ComponentFixture<AkinatorHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AkinatorHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AkinatorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
