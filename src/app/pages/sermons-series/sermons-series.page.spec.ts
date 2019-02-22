import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SermonsSeriesPage } from './sermons-series.page';

describe('SermonsSeriesPage', () => {
  let component: SermonsSeriesPage;
  let fixture: ComponentFixture<SermonsSeriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SermonsSeriesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SermonsSeriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
