import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from "./main/main.component";
import { AreaAtuacaoComponent } from './area-atuacao/area-atuacao.component';
import { ConfiguracaoUsuarioComponent } from './configuracao-usuario/configuracao-usuario.component';
import { DadosEmpresaComponent } from './dados-empresa/dados-empresa.component';
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

const appRoutes: Routes  = [
  { path: 'site', component: SiteComponent },
  { path: 'main', component: MainComponent },
  { path: 'configUsuario', component: ConfiguracaoUsuarioComponent },
  { path: 'dadosEmpresa', component: DadosEmpresaComponent },
  { path: 'areaAtuacao', component: AreaAtuacaoComponent },
  { path: 'cadAreaAtuacao/:key', component: CadastroAreaAtuacaoComponent },
  { path: 'cadAreaAtuacao', component: CadastroAreaAtuacaoComponent },
  { path: 'cadPassageiro/:key', component: CadastroPassageiroComponent },
  { path: 'cadPassageiro', component: CadastroPassageiroComponent },
  { path: 'gridPassageiro', component: GridPassageiroComponent },
  { path: 'passResp', component: PassageiroResponsavelComponent },
  { path: 'passMens', component: PassageiroMensalidadeComponent },
  { path: 'cadPassMensalidade', component: CadastroPassageiroMensalidadeComponent },
  { path: 'passContrato', component: PassageiroContratoComponent },
  { path: 'cadVeiculo/:key', component: CadastroVeiculoComponent },
  { path: 'cadVeiculo', component: CadastroVeiculoComponent },
  { path: 'gridVeiculo', component: GridVeiculoComponent },
  { path: 'veicRevisao', component: VeiculoRevisaoComponent },
  { path: 'cadMotorista/:key', component: CadastroMotoristaComponent },
  { path: 'cadMotorista', component: CadastroMotoristaComponent },
  { path: 'gridMotorista', component: GridMotoristaComponent },
  { path: 'cadRota', component: CadastroRotasComponent },
  { path: 'gridRota', component: GridRotasComponent },
  { path: 'rotaVincPass', component: RotaVinculoPassageiroComponent },
  { path: 'cadRotaVincPass', component: CadastroRotaVinculoPassageiroComponent },
  { path: 'cadPlanoMensalidade/:key', component: CadastroPlanoMensalidadeComponent },
  { path: 'cadPlanoMensalidade', component: CadastroPlanoMensalidadeComponent },
  { path: 'gridPlanoMensalidade', component: GridPlanoMensalidadeComponent },
  { path: 'cadModeloContrato/:key', component: CadastroModeloContratoComponent },
  { path: 'cadModeloContrato', component: CadastroModeloContratoComponent },
  { path: 'gridModeloContrato', component: GridModeloContratoComponent },
  { path: 'cadUsuario', component: CadastroUsuarioComponent },
  { path: 'gridUsuario', component: GridUsuarioComponent },
  { path: 'contato', component: ContatoComponent },
  { path: '**', redirectTo: 'site'}
];

export const routing = RouterModule.forRoot(appRoutes);