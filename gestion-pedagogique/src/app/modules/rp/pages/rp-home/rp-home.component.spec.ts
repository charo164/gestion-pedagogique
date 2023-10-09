import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpHomeComponent } from './rp-home.component';

describe('RpHomeComponent', () => {
  let component: RpHomeComponent;
  let fixture: ComponentFixture<RpHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RpHomeComponent]
    });
    fixture = TestBed.createComponent(RpHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
