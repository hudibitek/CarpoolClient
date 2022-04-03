import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs/internal/Subscription';
import { debounceTime } from 'rxjs/operators';
import { LoaderService } from 'services/app/http-loader.service';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'portal-layout-classic',
  templateUrl: './layout-classic.component.html',
  styleUrls: ['./layout-classic.component.scss']
})
export class LayoutClassicComponent implements OnInit, OnDestroy, AfterViewChecked {
  leftSidenavOpen: boolean;
  leftSidenavMode: string;
  mediaSubscription: Subscription;
  loading: boolean = false;
  loadingSubscription: Subscription;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private mediaObserver: MediaObserver,
    public layoutService: LayoutService,
    public loaderService: LoaderService
  ) { }

  async ngOnInit(): Promise<void> {
    // Get initial state of the sidenav.
    this.calculateSidenavStatus();
    this.loadingSubscription = this.loaderService.isLoading.pipe(
      // Don't display progress bar for HTTP requests faster than 100ms
      debounceTime(100)
    ).subscribe(
      value => {
        // Prevent ExpressionChangedAfterItHasBeenCheckedError
        if (this.loading !== value) {
          this.loading = value;
          this.changeDetectorRef.detectChanges();
        }
      }
    );

    // Subscribe to changes in screen size to change sidenav behavior.
    this.mediaSubscription = this.mediaObserver.media$.subscribe((change: MediaChange) =>
      this.calculateSidenavStatus()
    );
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.mediaSubscription != null) {
      this.mediaSubscription.unsubscribe();
    }
    if (this.loadingSubscription != null) {
      this.loadingSubscription.unsubscribe();
    }
  }

  calculateSidenavStatus(): void {
    const isMobile = this.mediaObserver.isActive('lt-md');
    // Close sidenav on mobile.
    this.leftSidenavOpen = !isMobile;
    // Make sidenav open over content on mobile.
    this.leftSidenavMode = isMobile ? 'over' : 'side';
  }
}
