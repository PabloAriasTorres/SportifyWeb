import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsHeaderComponent } from './cms-header.component';

describe('CmsHeaderComponent', () => {
  let component: CmsHeaderComponent;
  let fixture: ComponentFixture<CmsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmsHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
