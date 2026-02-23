import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rehistro } from './rehistro';

describe('Rehistro', () => {
  let component: Rehistro;
  let fixture: ComponentFixture<Rehistro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rehistro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rehistro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
