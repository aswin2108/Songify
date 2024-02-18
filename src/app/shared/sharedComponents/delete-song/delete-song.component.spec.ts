import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSongComponent } from './delete-song.component';

describe('DeleteSongComponent', () => {
  let component: DeleteSongComponent;
  let fixture: ComponentFixture<DeleteSongComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteSongComponent]
    });
    fixture = TestBed.createComponent(DeleteSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
