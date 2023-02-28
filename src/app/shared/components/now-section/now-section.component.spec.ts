import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NowSectionComponent } from './now-section.component';

describe('NowSectionComponent', () => {
  let component: NowSectionComponent;
  let fixture: ComponentFixture<NowSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NowSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NowSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
