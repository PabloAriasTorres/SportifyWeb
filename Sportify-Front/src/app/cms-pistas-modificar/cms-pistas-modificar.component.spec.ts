import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsPistasModificarComponent } from './cms-pistas-modificar.component';

describe('CmsPistasModificarComponent', () => {
  let component: CmsPistasModificarComponent;
  let fixture: ComponentFixture<CmsPistasModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmsPistasModificarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsPistasModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
