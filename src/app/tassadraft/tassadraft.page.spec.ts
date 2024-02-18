import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TassadraftPage } from './tassadraft.page';

describe('TassadraftPage', () => {
  let component: TassadraftPage;
  let fixture: ComponentFixture<TassadraftPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TassadraftPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TassadraftPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
