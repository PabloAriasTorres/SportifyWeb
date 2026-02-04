import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsClubsComponent } from './cms-clubs.component';

describe('CmsClubsComponent', () => {
  let component: CmsClubsComponent;
  let fixture: ComponentFixture<CmsClubsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmsClubsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsClubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
