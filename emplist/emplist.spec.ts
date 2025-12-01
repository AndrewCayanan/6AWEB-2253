import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Emplist } from './emplist';

describe('Emplist', () => {
  let component: Emplist;
  let fixture: ComponentFixture<Emplist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Emplist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Emplist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
