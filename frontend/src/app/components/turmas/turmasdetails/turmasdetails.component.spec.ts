import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurmasdetailsComponent } from './turmasdetails.component';

describe('TurmasdetailsComponent', () => {
  let component: TurmasdetailsComponent;
  let fixture: ComponentFixture<TurmasdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurmasdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurmasdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
