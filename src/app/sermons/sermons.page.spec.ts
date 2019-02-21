import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SermonsPage } from './sermons.page';

describe('SermonsPage', () => {
  let component: SermonsPage;
  let fixture: ComponentFixture<SermonsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SermonsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SermonsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
