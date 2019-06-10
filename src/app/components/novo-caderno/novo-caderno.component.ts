import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-novo-caderno",
  templateUrl: "./novo-caderno.component.html",
  styleUrls: ["./novo-caderno.component.scss"]
})
export class NovoCadernoComponent implements OnInit {
  cadernoForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private message: NzMessageService
  ) {}

  async submitForm() {
    for (const i in this.cadernoForm.controls) {
      this.cadernoForm.controls[i].markAsDirty();
      this.cadernoForm.controls[i].updateValueAndValidity();
    }

    if (this.cadernoForm.invalid) {
      this.message.error("Formulário inválido");
      return;
    }

    try {
      const response = await this.api.createNotebook(this.cadernoForm.value);
      if (response) this.message.success("Notebook Criado com sucesso!");
    } catch (error) {
      this.message.error(error.message);
      console.log(error);
    }
  }

  ngOnInit() {
    this.cadernoForm = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      name: [
        null,
        [Validators.required, Validators.pattern("^[A-Za-z0-9_]{8,15}$")]
      ],
      number_of_pages: [null, [Validators.required]]
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
