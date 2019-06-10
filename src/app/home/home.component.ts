import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private message: NzMessageService,
              private api: ApiService) { }

  async ngOnInit() {
    await this.loadNotebooks();
  }

  async loadNotebooks() {
    const id = this.message.loading("Carregando Notebooks...", {
      nzDuration: 0
    }).messageId;
    try {
      const notebooks = await this.api.loadNotebooks();

      this.api.setNotebookObs(notebooks);

      this.message.remove(id);
    } catch (error) {
      this.message.remove(id);
    }
  }

}
