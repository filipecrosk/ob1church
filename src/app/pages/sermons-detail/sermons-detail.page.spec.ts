import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SermonsDetailPage } from './sermons-detail.page';

describe('SermonsDetailPage', () => {
  let component: SermonsDetailPage;
  let fixture: ComponentFixture<SermonsDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SermonsDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SermonsDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
