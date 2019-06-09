import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';

// Services
import { ApiService } from './services/api.service';
import { NgZorroAntdModule, NZ_I18N, pt_BR } from 'ng-zorro-antd';
import { FormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { LoginComponent } from './login/login.component';

registerLocaleData(pt);

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    ApiService,
    FormBuilder,
    { provide: NZ_I18N, useValue: pt_BR }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
