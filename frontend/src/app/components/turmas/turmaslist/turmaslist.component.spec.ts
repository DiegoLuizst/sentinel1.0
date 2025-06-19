import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurmaslistComponent } from './turmaslist.component';

describe('TurmaslistComponent', () => {
  let component: TurmaslistComponent;
  let fixture: ComponentFixture<TurmaslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurmaslistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurmaslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
