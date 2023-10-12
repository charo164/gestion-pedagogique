import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpInscriptionComponent } from './rp-inscription.component';

describe('RpInscriptionComponent', () => {
  let component: RpInscriptionComponent;
  let fixture: ComponentFixture<RpInscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RpInscriptionComponent]
    });
    fixture = TestBed.createComponent(RpInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
