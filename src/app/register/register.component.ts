import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { RegisterModel } from './register.model';
import { ApiService } from '../services/api.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private message: NzMessageService,
              private api: ApiService) {}

  async submitForm() {
    const registerModel = new RegisterModel();

    if (! this.registerForm.valid) {
      alert('Formulário incompleto');
      return;
    }

    const id = this.message.loading('Carregando...', { nzDuration: 0 }).messageId;
    
    registerModel.email = this.registerForm.value.email;
    registerModel.name = this.registerForm.value.name;
    registerModel.password = this.registerForm.value.password;
    registerModel.access_token = this.registerForm.value.access_token;

    try {
      const response = await this.api.register(registerModel);
      if (response) {
        this.message.remove(id);
        alert('Conta criada com sucesso, agora você já pode acessar o sistema');
      }
        
    } catch (error) {
      this.message.remove(id);
      this.message.error(error.error.message)
    }
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      name: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(9)]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      access_token: [null]
    });
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.registerForm.controls.checkPassword.updateValueAndValidity()
    );
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.registerForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
}
