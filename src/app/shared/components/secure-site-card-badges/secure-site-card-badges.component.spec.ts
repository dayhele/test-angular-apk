import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureSiteCardBadgesComponent } from './secure-site-card-badges.component';

describe('SecureSiteCardBadgesComponent', () => {
  let component: SecureSiteCardBadgesComponent;
  let fixture: ComponentFixture<SecureSiteCardBadgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecureSiteCardBadgesComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecureSiteCardBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
