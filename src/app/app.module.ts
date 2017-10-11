import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterializeModule } from 'angular2-materialize';
import { routing } from "./app.routes";
import { AngularFireDatabase } from "angularFire2/database";
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MainComponent } from './main/main.component';
import { ConfiguracaoUsuarioComponent } from './configuracao-usuario/configuracao-usuario.component';
import { DadosEmpresaComponent } from './dados-empresa/dados-empresa.component';
import { AreaAtuacaoComponent } from './area-atuacao/area-atuacao.component';
import { CadastroPassageiroComponent } from './cadastro-passageiro/cadastro-passageiro.component';
import { PassageiroResponsavelComponent } from './passageiro-responsavel/passageiro-responsavel.component';
import { PassageiroMensalidadeComponent } from './passageiro-mensalidade/passageiro-mensalidade.component';
import { CadastroVeiculoComponent } from './cadastro-veiculo/cadastro-veiculo.component';
import { VeiculoRevisaoComponent } from './veiculo-revisao/veiculo-revisao.component';
import { CadastroMotoristaComponent } from './cadastro-motorista/cadastro-motorista.component';
import { CadastroRotasComponent } from './cadastro-rotas/cadastro-rotas.component';
import { RotaVinculoPassageiroComponent } from './rota-vinculo-passageiro/rota-vinculo-passageiro.component';
import { CadastroPlanoMensalidadeComponent } from './cadastro-plano-mensalidade/cadastro-plano-mensalidade.component';
import { CadastroModeloContratoComponent } from './cadastro-modelo-contrato/cadastro-modelo-contrato.component';
import { PassageiroContratoComponent } from './passageiro-contrato/passageiro-contrato.component';
import { SiteComponent } from './site/site.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { Cliente } from './classes/Cliente';
import { ClienteService } from './services/cliente.service';
import { AuthService } from './services/auth.service';
import { UsuarioService } from './services/usuario.service';
import { ContatoService } from './services/contato.service';
import { GridMotoristaComponent } from './grid-motorista/grid-motorista.component';
import { CadastroAreaAtuacaoComponent } from './cadastro-area-atuacao/cadastro-area-atuacao.component';
import { GridModeloContratoComponent } from './grid-modelo-contrato/grid-modelo-contrato.component';
import { GridPlanoMensalidadeComponent } from './grid-plano-mensalidade/grid-plano-mensalidade.component';
import { GridUsuarioComponent } from './grid-usuario/grid-usuario.component';
import { GridPassageiroComponent } from './grid-passageiro/grid-passageiro.component';
import { GridVeiculoComponent } from './grid-veiculo/grid-veiculo.component';
import { GridRotasComponent } from './grid-rotas/grid-rotas.component';
import { AgmCoreModule } from '@agm/core';
import { CadastroPassageiroMensalidadeComponent } from './cadastro-passageiro-mensalidade/cadastro-passageiro-mensalidade.component';
import { CadastroRotaVinculoPassageiroComponent } from './cadastro-rota-vinculo-passageiro/cadastro-rota-vinculo-passageiro.component';
import { ContatoComponent } from './contato/contato.component';
import { UsuarioMensagemService } from './services/usuario-mensagem.service';
import { AreaAtuacaoService } from './services/area-atuacao.service';


const  config = {
  apiKey: "AIzaSyAXt5Jj-1uUdU_hy-jLnttbZFdTTVadWsE",
  authDomain: "web-vannz.firebaseapp.com",
  databaseURL: "https://web-vannz.firebaseio.com",
  projectId: "web-vannz",
  storageBucket: "web-vannz.appspot.com",
  messagingSenderId: "1018773332855"
};



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ConfiguracaoUsuarioComponent,
    DadosEmpresaComponent,
    AreaAtuacaoComponent,
    CadastroPassageiroComponent,
    PassageiroResponsavelComponent,
    PassageiroMensalidadeComponent,
    CadastroVeiculoComponent,
    VeiculoRevisaoComponent,
    CadastroMotoristaComponent,
    CadastroRotasComponent,
    RotaVinculoPassageiroComponent,
    CadastroPlanoMensalidadeComponent,
    CadastroModeloContratoComponent,
    PassageiroContratoComponent,
    SiteComponent,
    CadastroUsuarioComponent,
    GridMotoristaComponent,
    CadastroAreaAtuacaoComponent,
    GridModeloContratoComponent,
    GridPlanoMensalidadeComponent,
    GridUsuarioComponent,
    GridPassageiroComponent,
    GridVeiculoComponent,
    GridRotasComponent,
    CadastroPassageiroMensalidadeComponent,
    CadastroRotaVinculoPassageiroComponent,
    ContatoComponent
    
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    MaterializeModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    routing,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA2t1tgd1Pj83TH_PAqfRuyR4kHOQ1rJnI'
    })
  ],
  providers: [AngularFireDatabase, AuthService, UsuarioService, ClienteService, ContatoService, UsuarioMensagemService,
              AreaAtuacaoService],
  bootstrap: [AppComponent]
})
export class AppModule { }