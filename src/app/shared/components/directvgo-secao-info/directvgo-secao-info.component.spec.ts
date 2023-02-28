import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectvgoSecaoInfoComponent } from './directvgo-secao-info.component';

describe('DirectvgoSecaoInfoComponent', () => {
  let component: DirectvgoSecaoInfoComponent;
  let fixture: ComponentFixture<DirectvgoSecaoInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectvgoSecaoInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectvgoSecaoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
