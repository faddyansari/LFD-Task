import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcaViewComponent } from './rca-view.component';

describe('RcaViewComponent', () => {
  let component: RcaViewComponent;
  let fixture: ComponentFixture<RcaViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcaViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
