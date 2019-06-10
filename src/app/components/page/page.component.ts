import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Notebook } from '../novo-caderno/notebook.model';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy{
  ngOnDestroy(): void {
    this.notebook = undefined;
  }

  notebook: Notebook;
  @ViewChild('elementeditable') input;

  constructor(private api: ApiService,
    private message: NzMessageService,
    private router: Router,
    private route: ActivatedRoute) {
      router.events.subscribe((val) => {
        // see also 
        if (val instanceof NavigationEnd) {
          this.notebook = undefined;
        }
    });
    }

  ngOnInit() {
    this.route.params.subscribe(async data => {

      const id = this.message.loading('Carregando Notebook...', { nzDuration: 0 }).messageId;
      this.notebook = await this.api.loadNotebookById(data['id']);

      await this.addDefaultPages();

      this.message.remove(id);
    });
  }

  async addDefaultPages() {
    if (this.notebook.pages.length === 0) {
      for (let i = 0; i < this.notebook.number_of_pages; i++)
        this.notebook.pages.push('>');
        try {
          this.notebook = await this.api.editNotbookById(this.notebook.id || this.notebook._id, this.notebook);
          console.log('this.notebook: ', this.notebook);
        } catch (error) {
          console.log(error);
        }

    }
  }

  async onChange(input) {
    this.notebook.pages[0] = input;
    try {
      this.notebook = await this.api.editNotbookById(this.notebook.id || this.notebook._id, this.notebook);
      console.log('Updated', this.notebook);
    } catch (error) {
      console.log(error);
    }

  }

}
