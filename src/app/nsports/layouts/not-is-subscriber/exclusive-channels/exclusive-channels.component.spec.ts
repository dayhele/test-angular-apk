import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExclusiveChannelsComponent } from './exclusive-channels.component';

describe('ExclusiveChannelsComponent', () => {
  let component: ExclusiveChannelsComponent;
  let fixture: ComponentFixture<ExclusiveChannelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExclusiveChannelsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExclusiveChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
