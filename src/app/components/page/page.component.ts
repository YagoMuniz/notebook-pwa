import { Component, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Notebook } from '../novo-caderno/notebook.model';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnChanges {

  notebook: Notebook;
  pageToShow: 0;
  @ViewChild('elementeditable') input; 

  constructor(private api: ApiService,
    private message: NzMessageService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(async data => {
      const id = this.message.loading('Carregando Notebook...', { nzDuration: 0 }).messageId;
      this.notebook = await this.api.loadNotebookById(data['id']);

      if (this.notebook.pages.length === 0) {
        for (let i = 0; i < this.notebook.number_of_pages; i++)
          this.notebook.pages.push(' ');
          try {
            this.notebook = await this.api.editNotbookById(this.notebook.id, this.notebook);
            console.log('this.notebook: ', this.notebook);
          } catch (error) {
            console.log(error);
          }

      }

      this.message.remove(id);
    });

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }

  async onChange(input) {
    this.notebook.pages[0] = input;
    try {
      this.notebook = await this.api.editNotbookById(this.notebook.id, this.notebook);
      console.log('Updated', this.notebook);
    } catch (error) {
      console.log(error);
    }

  }

  onNext() {
    if (this.pageToShow < this.notebook.number_of_pages) {
      this.pageToShow++;
    }

    console.log(this.notebook.pages)
  }
  
  onPrev() {
    if (this.pageToShow > 0) {
      this.pageToShow--;
    }

    console.log(this.notebook.pages)
  }

}
