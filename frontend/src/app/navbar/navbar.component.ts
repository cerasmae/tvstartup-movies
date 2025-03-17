import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isHome: boolean = false;

  constructor(private router: Router) {}

  async ngOnInit() {
    if (this.router.url == '/') {
      this.isHome = true;
    }
    console.log(this.isHome);
  }

}
