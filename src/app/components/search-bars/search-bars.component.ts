import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MusicDataService } from 'src/app/shared/services/music-data/music-data.service';

@Component({
  selector: 'app-search-bars',
  templateUrl: './search-bars.component.html',
  styleUrls: [
    './search-bars.component.scss',
    './../../shared/shared-styles/shared-styles.scss',
  ],
})
export class SearchBarsComponent implements OnInit {
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private songService: MusicDataService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Initializes the form with empty string in reactive forms
   */
  initializeForm(): void {
    this.searchForm = this.fb.group({
      songName: this.fb.control(''),
      artistName: this.fb.control(''),
    });
    this.valueChanges();
  }

  /**
   * This function subscribes to the reactive form based on value change
   * Then it passes to the trigger function in service file to push data into the subject
   */
  valueChanges(): void {
    this.searchForm.valueChanges.subscribe((newData) => {
      newData.songName = newData.songName.toLowerCase();
      newData.artistName = newData.artistName.toLowerCase();
      this.songService.searchFormTrigger(newData);
    });
  }
}
