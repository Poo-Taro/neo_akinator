import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AkinatorFooterComponent } from './akinator-footer.component';

describe('AkinatorFooterComponent', () => {
  let component: AkinatorFooterComponent;
  let fixture: ComponentFixture<AkinatorFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AkinatorFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AkinatorFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
