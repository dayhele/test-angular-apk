import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibertadoresSectionComponent } from './libertadores-section.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

describe('LibertadoresSectionComponent', () => {
  let component: LibertadoresSectionComponent;
  let fixture: ComponentFixture<LibertadoresSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibertadoresSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibertadoresSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
