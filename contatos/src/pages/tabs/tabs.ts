import { Component } from '@angular/core';

import { ListaPage } from '../lista/lista';
import { CadastroPage } from '../cadastro/cadastro';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = CadastroPage;
  tab2Root = ListaPage;

  constructor() {

  }
}
