import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  notebooks: any;
  constructor(private api: ApiService,
              private router: Router) { }

  async ngOnInit() {
    await this.loadNotebooks();
  }

  async logout() {
    await this.api.logout();
    this.router.navigateByUrl('login');
  }

  async loadNotebooks() {
    try {
      this.notebooks = await this.api.loadNotebooks();
      console.log(this.notebooks)
    } catch (error) {

    }
  }

}