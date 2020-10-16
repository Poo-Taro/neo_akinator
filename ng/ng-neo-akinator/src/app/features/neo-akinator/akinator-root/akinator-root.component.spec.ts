import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AkinatorRootComponent } from './akinator-root.component';

describe('AkinatorRootComponent', () => {
  let component: AkinatorRootComponent;
  let fixture: ComponentFixture<AkinatorRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AkinatorRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AkinatorRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
