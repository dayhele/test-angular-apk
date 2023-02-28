import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioOptionsComponent } from './audio-options.component';

describe('AudioOptionsComponent', () => {
  let component: AudioOptionsComponent;
  let fixture: ComponentFixture<AudioOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
