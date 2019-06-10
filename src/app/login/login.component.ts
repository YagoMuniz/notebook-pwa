import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../services/api.service";
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  async submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.invalid) {
      alert("Formulário inválido");
      return;
    }

    const id = this.message.loading('Carregando...', { nzDuration: 0 }).messageId;
    try {

      const response = await this.api.login(
        this.validateForm.value.userName,
        this.validateForm.value.password
      );
  
      this.message.remove(id);
      
      this.router.navigateByUrl('home');
    } catch (error) {
      this.message.remove(id);
      console.log(error);
    }
  }

  constructor(private fb: FormBuilder,
              private router: Router,
              private message: NzMessageService,
              private api: ApiService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
}
