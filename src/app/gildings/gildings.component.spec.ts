import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GildingsComponent } from './gildings.component';

describe('GildingsComponent', () => {
  let component: GildingsComponent;
  let fixture: ComponentFixture<GildingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GildingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GildingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
