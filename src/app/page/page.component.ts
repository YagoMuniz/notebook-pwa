import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnChanges {

  pageContent:string;
  constructor() { }

  ngOnInit() {
    this.pageContent = '';
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }

}
