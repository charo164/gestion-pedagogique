import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpClasseComponent } from './rp-classe.component';

describe('RpClasseComponent', () => {
  let component: RpClasseComponent;
  let fixture: ComponentFixture<RpClasseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RpClasseComponent]
    });
    fixture = TestBed.createComponent(RpClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
