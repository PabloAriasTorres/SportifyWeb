import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsClubsModificarComponent } from './cms-clubs-modificar.component';

describe('CmsClubsModificarComponent', () => {
  let component: CmsClubsModificarComponent;
  let fixture: ComponentFixture<CmsClubsModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmsClubsModificarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsClubsModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
