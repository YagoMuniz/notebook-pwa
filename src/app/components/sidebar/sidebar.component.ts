import { Component, OnInit, OnDestroy } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";
import { Notebook } from "../novo-caderno/notebook.model";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit, OnDestroy {
  notebooks: any;
  private obs = [];

  constructor(
    private api: ApiService,
    private message: NzMessageService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.obs.push(this.api.getNotebookObs().subscribe(data => this.notebooks = data));
  }

  ngOnDestroy() {
    this.obs.forEach(ob => {
      ob.unsubscribe();
    });
  }

  async logout() {
    await this.api.logout();
    this.router.navigateByUrl("login");
  }

  openNotebook(n: Notebook) {
    this.router.navigateByUrl('home/notebook/' + n.id);
  }
}
