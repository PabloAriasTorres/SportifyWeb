import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsUsuariosComponent } from './cms-usuarios.component';

describe('CmsUsuariosComponent', () => {
  let component: CmsUsuariosComponent;
  let fixture: ComponentFixture<CmsUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmsUsuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
