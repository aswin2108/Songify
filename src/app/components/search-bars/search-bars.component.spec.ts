import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarsComponent } from './search-bars.component';

describe('SearchBarsComponent', () => {
  let component: SearchBarsComponent;
  let fixture: ComponentFixture<SearchBarsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBarsComponent]
    });
    fixture = TestBed.createComponent(SearchBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
