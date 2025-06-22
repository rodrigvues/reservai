import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, NgForm } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { IftaLabel } from 'primeng/iftalabel';
import { TooltipModule } from 'primeng/tooltip';
import { Dialog } from 'primeng/dialog';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';


//organizando imports de componentes do prime ng, botão inputs etc
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
  imports: [
    RouterOutlet,
    FloatLabelModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    NgIf,
    CommonModule,
    ToastModule,
    IftaLabel,
    TooltipModule,
    Dialog
  ]
})

export class LoginComponent {
  //variáveis das forms
  //localidade cidade


  nome  = '';
  sobrenome = '';
  generoSelecionado  = '';
  cep  = '';
  uf  = '';
  logradouro  = '';
  bairro  = '';
  numero  = '';
  complemento  = '';
  localidade  = '';

  
  


  //validar cep pro botão salvar
  cepValido: boolean = false;

  //mensagem para o toast de erro de cep
  constructor(private messageService: MessageService, private userService: UserService, private router: Router, ) {}

  // variável bool visible pro pop up 
  visible = false;

  //lista generos
  opcoesGeneros = [
    { label: 'Homem', value: 'Homem' },
    { label: 'Mulher', value: 'Mulher' },
    { label: 'Prefiro não responder', value: 'Prefiro não responder' }
  ];

  //função para mudar etapa do cadastro com ngif
  parteCadastro = 1;
  isFading = false;

  //await pra fazer animação e trocar parte
  async trocarComFade(novaParte: number) {
    if (this.isFading || this.parteCadastro === novaParte) {
      return; // evita clique duplo e trocar para a mesma etapa
    }

    this.isFading = true;                     
    await this.delay(400);                     
    this.parteCadastro = novaParte;           
    this.isFading = false;                    
  }
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  onSubmit(form?: NgForm) {
    // função ngif que muda aba
    if (this.parteCadastro === 1) {
    this.parteCadastro = 2;
    } 
  }

  //função viacep
  buscarCep(): void {
    //tira - do cep que foi colocado pra enviar pra api
    const busca = this.cep.replace('-', '').trim();

    // validação não deixa maior ou menor que 8 válido
    if (busca.length !== 8) {
      this.cepValido = false;
      return;
    }

    const opcoes: RequestInit  = {
      method: 'GET',
      mode: 'cors',
      cache: 'default'
    };

    fetch(`https://viacep.com.br/ws/${busca}/json/`, opcoes)
      .then(response => response.json())
      .then(dados => {
      if (dados.erro) {
        //validação de novo pra caso seja inexistente
        this.cepValido = false;
        this.showError();
        return;
      } 
      //valida cep e preenche campos
        this.cepValido = true;
        this.preencherCampos(dados)}) 
      .catch(err => {
      //valida pra caso der erro diferente
      this.cepValido = false;
      console.error('Erro ao buscar:', err);
      this.showError();
    });
  }
  
  private preencherCampos(dados: Record<string, any>): void {
    for (const campo in dados) {
      if (Object.prototype.hasOwnProperty.call(this, campo)) {
        (this as any)[campo] = dados[campo];
      }
    }
  }

  //erro cep
  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'CEP inválido',
      detail: 'O CEP informado não foi encontrado.',
      life: 3000
    });
  }

  /*
  mensagem de erro para caso número seja inválido, porém não achei jeito bom de colocar no código
  showErrorNumero() {
    this.messageService.add({
      severity: 'error',
      summary: 'Número inválido',
      detail: 'Escreva apenas números no campo número.',
      life: 3000
    });
  }
  
  */

  // função para mostrar pop up
  onSalvar(form?: NgForm) {
    if (!this.cepValido) {
    this.showError(); // caso cep invalido
    return;
    }
       //mostra pop up
      //this.visible = true;
      const user: User = {
      name: 'Vitor',
      email: 'vitor@email.com',
      profilePicture: 'imagem'
    };

    this.userService.setUSer(user);
    this.router.navigate(['/home']);
  }
}