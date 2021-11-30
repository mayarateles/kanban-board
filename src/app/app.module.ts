import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { ColumnsComponent } from './board/columns/columns.component';
import { CardComponent } from './board/columns/card/card.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CardService } from './services/card.service';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { AppRoutingModule } from './app-routing.module';
import { CamelCasePipe } from './camel-case.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    ColumnsComponent,
    CardComponent,
    NavbarComponent,
    LoginComponent,
    ErrorComponent,
    CamelCasePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [CardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
