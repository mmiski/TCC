import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from "./main/main.component";
import { AreaAtuacaoComponent } from './area-atuacao/area-atuacao.component';
import { ConfiguracaoUsuarioComponent } from './configuracao-usuario/configuracao-usuario.component';
import { DadosEmpresaComponent } from './dados-empresa/dados-empresa.component';
import { CadastroPassageiroComponent } from './cadastro-passageiro/cadastro-passageiro.component';
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
import { GridMotoristaComponent } from './grid-motorista/grid-motorista.component';
import { CadastroAreaAtuacaoComponent } from './cadastro-area-atuacao/cadastro-area-atuacao.component';
import { GridModeloContratoComponent } from './grid-modelo-contrato/grid-modelo-contrato.component';
import { GridPlanoMensalidadeComponent } from './grid-plano-mensalidade/grid-plano-mensalidade.component';
import { GridUsuarioComponent } from './grid-usuario/grid-usuario.component';
import { GridPassageiroComponent } from './grid-passageiro/grid-passageiro.component';
import { GridVeiculoComponent } from './grid-veiculo/grid-veiculo.component';
import { GridRotasComponent } from './grid-rotas/grid-rotas.component';
import { CadastroPassageiroMensalidadeComponent } from './cadastro-passageiro-mensalidade/cadastro-passageiro-mensalidade.component';
import { CadastroRotaVinculoPassageiroComponent } from './cadastro-rota-vinculo-passageiro/cadastro-rota-vinculo-passageiro.component';
import { ContatoComponent } from './contato/contato.component';
import { GridResponsavelComponent } from './grid-responsavel/grid-responsavel.component';
import { CadastroResponsavelComponent } from './cadastro-responsavel/cadastro-responsavel.component';
import { VisualizarPassageiroContratoComponent } from './visualizar-passageiro-contrato/visualizar-passageiro-contrato.component';
import { CadastroPassageiroContratoComponent } from './cadastro-passageiro-contrato/cadastro-passageiro-contrato.component';
import { VisualizarPassageiroMensalidadeComponent } from './visualizar-passageiro-mensalidade/visualizar-passageiro-mensalidade.component';
import { GridAcessoMobileComponent } from './grid-acesso-mobile/grid-acesso-mobile.component';
import { ListaAcessosComponent } from './lista-acessos/lista-acessos.component';
import { VisualizaAcessoComponent } from './visualiza-acesso/visualiza-acesso.component';
import { RotaMapaComponent } from './rota-mapa/rota-mapa.component';
import { AuthGuard } from './auth.guard';

const appRoutes: Routes  = [
  { path: 'site', component: SiteComponent },
  { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'configUsuario', component: ConfiguracaoUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'dadosEmpresa', component: DadosEmpresaComponent, canActivate: [AuthGuard] },
  { path: 'areaAtuacao', component: AreaAtuacaoComponent, canActivate: [AuthGuard] },
  { path: 'cadAreaAtuacao/:key', component: CadastroAreaAtuacaoComponent, canActivate: [AuthGuard] },
  { path: 'cadAreaAtuacao', component: CadastroAreaAtuacaoComponent, canActivate: [AuthGuard] },
  { path: 'cadPassageiro/:key', component: CadastroPassageiroComponent, canActivate: [AuthGuard] },
  { path: 'cadPassageiro', component: CadastroPassageiroComponent, canActivate: [AuthGuard] },
  { path: 'gridPassageiro', component: GridPassageiroComponent, canActivate: [AuthGuard] },
  { path: 'gridResponsavel', component: GridResponsavelComponent, canActivate: [AuthGuard] },
  { path: 'cadResponsavel/:key', component: CadastroResponsavelComponent, canActivate: [AuthGuard] },
  { path: 'cadResponsavel', component: CadastroResponsavelComponent, canActivate: [AuthGuard] },
  { path: 'gridMensalidade', component: PassageiroMensalidadeComponent, canActivate: [AuthGuard] },
  { path: 'visuPassMensalidade/:key', component: VisualizarPassageiroMensalidadeComponent, canActivate: [AuthGuard] },
  { path: 'cadPassMensalidade/:passageiroKey', component: CadastroPassageiroMensalidadeComponent, canActivate: [AuthGuard] },
  { path: 'gridContrato', component: PassageiroContratoComponent, canActivate: [AuthGuard] },
  { path: 'visuPassContrato/:key', component: VisualizarPassageiroContratoComponent, canActivate: [AuthGuard] },
  { path: 'cadPassContrato/:passageiroKey', component: CadastroPassageiroContratoComponent, canActivate: [AuthGuard] },
  { path: 'cadVeiculo/:key', component: CadastroVeiculoComponent, canActivate: [AuthGuard] },
  { path: 'cadVeiculo', component: CadastroVeiculoComponent, canActivate: [AuthGuard] },
  { path: 'gridVeiculo', component: GridVeiculoComponent, canActivate: [AuthGuard] },
  { path: 'cadMotorista/:key', component: CadastroMotoristaComponent, canActivate: [AuthGuard] },
  { path: 'cadMotorista', component: CadastroMotoristaComponent, canActivate: [AuthGuard] },
  { path: 'gridMotorista', component: GridMotoristaComponent, canActivate: [AuthGuard] },  
  { path: 'gridRota', component: GridRotasComponent, canActivate: [AuthGuard] },
  { path: 'cadRota', component: CadastroRotasComponent, canActivate: [AuthGuard] },
  { path: 'cadRota/:key', component: CadastroRotasComponent, canActivate: [AuthGuard] },
  { path: 'gridRotaVincPass/:rotaKey', component: RotaVinculoPassageiroComponent , canActivate: [AuthGuard]},
  { path: 'cadRotaVincPass/:rotaKey', component: CadastroRotaVinculoPassageiroComponent, canActivate: [AuthGuard] },
  { path: 'rotaMapa/:rotaKey', component: RotaMapaComponent, canActivate: [AuthGuard] },
  { path: 'cadPlanoMensalidade/:key', component: CadastroPlanoMensalidadeComponent, canActivate: [AuthGuard] },
  { path: 'cadPlanoMensalidade', component: CadastroPlanoMensalidadeComponent, canActivate: [AuthGuard] },
  { path: 'gridPlanoMensalidade', component: GridPlanoMensalidadeComponent, canActivate: [AuthGuard] },
  { path: 'cadModeloContrato/:key', component: CadastroModeloContratoComponent, canActivate: [AuthGuard] },
  { path: 'cadModeloContrato', component: CadastroModeloContratoComponent, canActivate: [AuthGuard] },
  { path: 'gridModeloContrato', component: GridModeloContratoComponent, canActivate: [AuthGuard] },
  { path: 'cadUsuario', component: CadastroUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'gridUsuario', component: GridUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'contato', component: ContatoComponent },
  { path: 'gridAcessoMobile', component: GridAcessoMobileComponent, canActivate: [AuthGuard] },
  { path: 'listaAcessosMobile/:tipoUsuario', component: ListaAcessosComponent, canActivate: [AuthGuard] },
  { path: 'QRCode/:key', component: VisualizaAcessoComponent },
  { path: '**', redirectTo: 'site'}
];

export const routing = RouterModule.forRoot(appRoutes);