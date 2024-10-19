import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonToTopComponent } from './button-to-top.component';

describe('ButtonToTopComponent', () => {
  let component: ButtonToTopComponent;
  let fixture: ComponentFixture<ButtonToTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonToTopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonToTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
