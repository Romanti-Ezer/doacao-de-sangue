import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastrarDoacaoPage } from './cadastrar-doacao';

@NgModule({
  declarations: [
    CadastrarDoacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastrarDoacaoPage),
  ],
})
export class CadastrarDoacaoPageModule {}
