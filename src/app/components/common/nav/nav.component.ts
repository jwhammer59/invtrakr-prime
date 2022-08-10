import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  items: MenuItem[] = [];

  loggedInStatus: boolean = false;
  loggedInUser: string = '';

  componentRefresh: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getAuth().subscribe((auth) => {
      if (auth) {
        this.loggedInUser = auth.email!;

        this.items = [
          {
            label: 'Log Out',
            icon: 'pi pi-fw pi-sign-out',
            command: (event) => {
              this.logOut();
            },
          },
          {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-desktop',
            routerLink: ['dashboard'],
          },
          {
            label: 'Items',
            icon: 'pi pi-fw pi-tags',
            routerLink: ['items'],
          },
          {
            label: 'Dwellings',
            icon: 'pi pi-fw pi-building',
            items: [
              {
                label: 'Dwellings',
                icon: 'pi pi-fw pi-list',
                routerLink: ['dwellings'],
              },
              {
                label: 'Add Dwelling',
                icon: 'pi pi-fw pi-plus',
                routerLink: ['add-dwelling'],
              },
            ],
          },
          {
            separator: true,
          },
          {
            label: 'Settings',
            icon: 'pi pi-fw pi-cog',
            items: [
              {
                label: 'Rooms',
                icon: 'pi pi-fw pi-list',
                routerLink: ['rooms'],
              },
              {
                label: 'Stores',
                icon: 'pi pi-fw pi-list',
                routerLink: ['stores'],
              },
              {
                label: 'Payment Types',
                icon: 'pi pi-fw pi-list',
                routerLink: ['payment-types'],
              },
            ],
          },
        ];

        this.loggedInStatus = true;
        this.router.navigate(['/dashboard']);
      } else {
        this.items = [
          {
            label: 'Login',
            icon: 'pi pi-fw pi-sign-in',
            command: (event) => {
              this.logIn();
            },
          },
        ];
      }
    });
  }

  logIn() {
    this.authService.getAuth().subscribe((auth) => {
      if (auth) {
        this.loggedInUser = auth.email!;
      }
    });
    this.loggedInStatus = true;
    this.router.navigate(['/dashboard']);
  }

  logOut() {
    this.loggedInUser = '';
    this.loggedInStatus = false;
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
