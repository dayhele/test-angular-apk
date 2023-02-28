import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NsportsWaitModalComponent } from './nsports-wait-modal.component';

describe('NsportsWaitModalComponent', () => {
  let component: NsportsWaitModalComponent;
  let fixture: ComponentFixture<NsportsWaitModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NsportsWaitModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NsportsWaitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
