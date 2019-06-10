import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";
import { Notebook } from "../novo-caderno/notebook.model";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  notebooks: any;
  constructor(
    private api: ApiService,
    private message: NzMessageService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.loadNotebooks();
  }

  async logout() {
    await this.api.logout();
    this.router.navigateByUrl("login");
  }

  async loadNotebooks() {
    const id = this.message.loading("Carregando Notebooks...", {
      nzDuration: 0
    }).messageId;
    try {
      this.notebooks = await this.api.loadNotebooks();

      this.message.remove(id);
    } catch (error) {
      this.message.remove(id);
    }
  }

  openNotebook(notebook: Notebook) {
    // this.router.navigateByUrl('', { queryParams: notebook })
  }
}
