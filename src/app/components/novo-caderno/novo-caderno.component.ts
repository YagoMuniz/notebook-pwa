import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-novo-caderno',
  templateUrl: './novo-caderno.component.html',
  styleUrls: ['./novo-caderno.component.scss']
})
export class NovoCadernoComponent implements OnInit {

  cadernoForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  async submitForm() {
    for (const i in this.cadernoForm.controls) {
      this.cadernoForm.controls[i].markAsDirty();
      this.cadernoForm.controls[i].updateValueAndValidity();
    }
  }

  ngOnInit() {
    this.cadernoForm = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      name: [null, [Validators.required]],
      number_of_pages: [null, [Validators.required]],
    });
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.cadernoForm.reset();
    for (const key in this.cadernoForm.controls) {
      this.cadernoForm.controls[key].markAsPristine();
      this.cadernoForm.controls[key].updateValueAndValidity();
    }
  }
}
