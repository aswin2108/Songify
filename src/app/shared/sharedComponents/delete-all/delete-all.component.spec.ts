import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAllComponent } from './delete-all.component';

describe('DeleteAllComponent', () => {
  let component: DeleteAllComponent;
  let fixture: ComponentFixture<DeleteAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteAllComponent]
    });
    fixture = TestBed.createComponent(DeleteAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
