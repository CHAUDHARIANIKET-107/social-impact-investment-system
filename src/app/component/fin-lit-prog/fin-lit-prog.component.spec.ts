import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinLitProgComponent } from './fin-lit-prog.component';

describe('FinLitProgComponent', () => {
  let component: FinLitProgComponent;
  let fixture: ComponentFixture<FinLitProgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinLitProgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinLitProgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
