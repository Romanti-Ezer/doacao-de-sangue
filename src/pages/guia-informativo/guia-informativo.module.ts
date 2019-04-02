import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuiaInformativoPage } from './guia-informativo';

@NgModule({
  declarations: [
    GuiaInformativoPage,
  ],
  imports: [
    IonicPageModule.forChild(GuiaInformativoPage),
  ],
})
export class GuiaInformativoPageModule {}
