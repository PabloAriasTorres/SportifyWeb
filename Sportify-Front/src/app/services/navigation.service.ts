import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {
    if(typeof window !== 'undefined')
      this.monitorNavigation();
  }

  private monitorNavigation(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const isCmsRoute = event.url.startsWith('/cms');
        if (!isCmsRoute) {
          localStorage.removeItem('admin');
        }
      }
    });
  }
}
