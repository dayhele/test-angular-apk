import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultSectionFullChannelComponent } from './default-section-full-channel.component';

describe('DefaultSectionFullChannelComponent', () => {
  let component: DefaultSectionFullChannelComponent;
  let fixture: ComponentFixture<DefaultSectionFullChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefaultSectionFullChannelComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultSectionFullChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
