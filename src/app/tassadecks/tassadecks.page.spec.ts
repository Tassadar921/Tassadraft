import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TassadecksPage } from './tassadecks.page';

describe('TassadecksPage', () => {
  let component: TassadecksPage;
  let fixture: ComponentFixture<TassadecksPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TassadecksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
