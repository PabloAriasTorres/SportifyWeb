import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsUsuariosModificarComponent } from './cms-usuarios-modificar.component';

describe('CmsUsuariosModificarComponent', () => {
  let component: CmsUsuariosModificarComponent;
  let fixture: ComponentFixture<CmsUsuariosModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmsUsuariosModificarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsUsuariosModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
