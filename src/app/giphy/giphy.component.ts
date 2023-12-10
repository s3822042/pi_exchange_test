import {Component, OnInit} from '@angular/core';
import {GiphyService} from './giphy.service';
import {NgForOf, NgIf} from "@angular/common";
import {Gif} from "./giphy";
import {Subject, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';

import {FormsModule} from "@angular/forms";
import {GifItemComponent} from "../gif-item/gif-item.component";
import {GifModalComponent} from "../gif-modal/gif-modal.component";

@Component({
  selector: 'app-giphy',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    GifItemComponent,
    GifModalComponent,
    NgIf
  ],
  templateUrl: './giphy.component.html',
  styleUrl: './giphy.component.scss'
})
export class GiphyComponent implements OnInit {
  gifs: Gif[] = [];
  searchTerm: string = '';
  selectedGif: Gif | undefined;
  loading: boolean = false;

  private destroy$ = new Subject<void>();
  private searchSubscription?: Subscription;

  constructor(private giphyService: GiphyService) {
  }

  ngOnInit(): void {
    this.subscribeToSearchChanges();
    this.loadTrendingGifs();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  loadTrendingGifs() {
    this.giphyService
      .getTrendingGifs()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.gifs = data.data;
      });
  }

  search() {
    this.loading = true;
    if (this.searchTerm) {
      this.giphyService
        .searchGifs(this.searchTerm)
        .subscribe((data) => {
          this.gifs = data.data;
          this.loading = false;
        });
    } else {
      this.loadTrendingGifs();
      this.loading = false;
    }
  }

  openModal(gif: Gif) {
    this.selectedGif = gif;
  }

  closeModal() {
    this.selectedGif = undefined;
  }

  private subscribeToSearchChanges() {
    this.searchSubscription = this.giphyService
      .searchGifs(this.searchTerm)
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => {
        this.gifs = data.data;
      });
  }
}
