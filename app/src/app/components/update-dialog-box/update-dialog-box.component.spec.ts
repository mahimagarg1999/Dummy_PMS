import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDialogBoxComponent } from './update-dialog-box.component';

describe('UpdateDialogBoxComponent', () => {
  let component: UpdateDialogBoxComponent;
  let fixture: ComponentFixture<UpdateDialogBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDialogBoxComponent]
    });
    fixture = TestBed.createComponent(UpdateDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
