import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs/internal/Subscription';
import { LayoutService } from './../layout.service';

@Component({
  selector: 'portal-layout-compact',
  templateUrl: './layout-compact.component.html',
  styleUrls: ['./layout-compact.component.scss']
})
export class LayoutCompactComponent implements OnInit, OnDestroy {
  leftSidenavOpen: boolean;
  leftSidenavMode: string;
  mediaSubscription: Subscription;

  constructor(
    private mediaObserver: MediaObserver,
    public layoutService: LayoutService
  ) { }

  ngOnInit(): void {
    // Get initial state of the sidenav.
    this.calculateSidenavStatus();

    // Subscribe to changes in screen size to change sidenav behavior.
    this.mediaSubscription = this.mediaObserver.media$.subscribe((change: MediaChange) =>
      this.calculateSidenavStatus()
    );
  }

  ngOnDestroy(): void {
    this.mediaSubscription.unsubscribe();
  }

  calculateSidenavStatus(): void {
    const isMobile = this.mediaObserver.isActive('lt-md');
    // Close sidenav on mobile.
    this.leftSidenavOpen = !isMobile;
    // Make sidenav open over content on mobile.
    this.leftSidenavMode = isMobile ? 'over' : 'side';
  }
}
