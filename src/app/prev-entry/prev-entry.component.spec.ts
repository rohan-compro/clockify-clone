import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevEntryComponent } from './prev-entry.component';

describe('PrevEntryComponent', () => {
  let component: PrevEntryComponent;
  let fixture: ComponentFixture<PrevEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrevEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrevEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
