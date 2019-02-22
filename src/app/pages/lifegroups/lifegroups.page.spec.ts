import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LifegroupsPage } from './lifegroups.page';

describe('LifegroupsPage', () => {
  let component: LifegroupsPage;
  let fixture: ComponentFixture<LifegroupsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifegroupsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifegroupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
