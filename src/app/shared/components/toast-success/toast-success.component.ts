import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toast-success',
  templateUrl: './toast-success.component.html',
  styleUrls: ['./toast-success.component.scss']
})

/*
    Passos para utilizar este componente da maneira correta:

    1. Instancie a PageComponent no constructor.
      >> constructor(pageComponent: PageComponent) {} ...

    2. No local onde quer que o toast apareça, utilize a função "showToast" do PageComponent da seguinte maneira::

      >> this.pageComponent.showToast(toastMessage, useUndoButton).subscribe(() => { toastFunction; });

        Onde:
        toastMessage  (obrigatório) = mensagem a ser exibida como 'string';
        useUndoButton (opcional)    = usar ou não o botão de DESFAZER (true ou false);
        toastFunction (opcional)    = função a ser executada, exemplo: showToast('usuário apagado', true).subscribe(() => { this.apagarUsuario(); });

    NOTAS GERAIS:
    O toast executará a função APENAS QUANDO for destruído (5 segundos). Caso o usuário clique no botão de DESFAZER, a função não será executada.
    Lembre-se de, sempre que for utilizar alguma função que exclua, atualize ou insira algo, passe a função que fará tal ação no "toastFunction"
    e mantenha a propriedade "useUndoButton" como true para que o usuário possa desfazer a ação.

    Se não for utilizar nenhuma função, e quiser apenas exibir uma mensagem, basta utilizar da seguinte maneira:

    this.pageComponent.showToast('Sua mensagem aqui');

*/
export class ToastSuccessComponent {
  @Input() toastMessage: string = '';
  @Input() useUndoButton: boolean = false;
  @Output() toastFunction: EventEmitter<any> = new EventEmitter();
  @Output() undoButtonPressed: EventEmitter<any> = new EventEmitter();

  public toastExists: boolean = false;
  public executeFunction: boolean = true;

  public onToastDestroy(): void {
    setTimeout(() => {
      if (this.executeFunction) {
        this.toastExists = false;
        this.toastFunction.emit();
      }
    }, 5000);
  }

  public show(): void {
    // forçando que não guarde o último comportamento
    this.executeFunction = true;

    this.onToastDestroy();
    this.toastExists = true;
  }

  public undo(): void {
    this.toastExists = false;
    this.executeFunction = false;
    this.undoButtonPressed.emit();
    this.showUndoMessageForFiveSeconds();
  }

  private showUndoMessageForFiveSeconds() {

    // guarda mensagem anterior
    const previousMessage = this.toastMessage;
    const previousUseUndoButton = this.useUndoButton;

    this.toastMessage = 'A alteração foi cancelada com sucesso';
    this.useUndoButton = false;
    this.toastExists = true;

    setTimeout(() => {
      this.toastMessage = previousMessage;
      this.useUndoButton = previousUseUndoButton;
      this.toastExists = false;
    }, 5000);
  }
}
