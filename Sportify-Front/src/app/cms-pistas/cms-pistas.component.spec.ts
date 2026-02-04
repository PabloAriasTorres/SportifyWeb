import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsPistasComponent } from './cms-pistas.component';

describe('CmsPistasComponent', () => {
  let component: CmsPistasComponent;
  let fixture: ComponentFixture<CmsPistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmsPistasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsPistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
