import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TassacardsPage } from './tassacards.page';

describe('TassacardsPage', () => {
  let component: TassacardsPage;
  let fixture: ComponentFixture<TassacardsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TassacardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
