import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "../services/api.service";
import { Router } from '@angular/router';

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

    try {
      const response = await this.api.login(
        this.validateForm.value.userName,
        this.validateForm.value.password
      );
  
      this.router.navigateByUrl('home');
    } catch (error) {
      console.log(error);
    }
  }

  constructor(private fb: FormBuilder,
              private router: Router,
              private api: ApiService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
}
