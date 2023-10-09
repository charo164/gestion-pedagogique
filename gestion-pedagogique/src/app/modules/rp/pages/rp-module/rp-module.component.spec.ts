import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpModuleComponent } from './rp-module.component';

describe('RpModuleComponent', () => {
  let component: RpModuleComponent;
  let fixture: ComponentFixture<RpModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RpModuleComponent]
    });
    fixture = TestBed.createComponent(RpModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
