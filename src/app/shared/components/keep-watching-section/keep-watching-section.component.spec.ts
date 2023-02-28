import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeepWatchingSectionComponent } from './keep-watching-section.component';

describe('KeepWatchingSectionComponent', () => {
  let component: KeepWatchingSectionComponent;
  let fixture: ComponentFixture<KeepWatchingSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeepWatchingSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeepWatchingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
