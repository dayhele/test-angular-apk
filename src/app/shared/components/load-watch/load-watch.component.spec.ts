/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoadWatchComponent } from './load-watch.component';

describe('LoadWatchComponent', () => {
  let component: LoadWatchComponent;
  let fixture: ComponentFixture<LoadWatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadWatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
