import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private api: ApiService,
              private router: Router) { }

  ngOnInit() {
  }

  async logout() {
    await this.api.logout();
    this.router.navigateByUrl('login');
  }

}
