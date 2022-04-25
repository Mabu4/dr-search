import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogThemesComponent } from './dialog-themes.component';

describe('DialogThemesComponent', () => {
  let component: DialogThemesComponent;
  let fixture: ComponentFixture<DialogThemesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogThemesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogThemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
