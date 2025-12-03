import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Marketdashboard } from './marketdashboard';

describe('Marketdashboard', () => {
  let component: Marketdashboard;
  let fixture: ComponentFixture<Marketdashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Marketdashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Marketdashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
