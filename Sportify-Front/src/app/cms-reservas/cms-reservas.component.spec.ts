import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsReservasComponent } from './cms-reservas.component';

describe('CmsReservasComponent', () => {
  let component: CmsReservasComponent;
  let fixture: ComponentFixture<CmsReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmsReservasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
