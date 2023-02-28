export interface ModalOptions {
  isOpen?: boolean;
  id_perfil?: number;

  events?: {
    confirmDelete?: boolean;
    close?: boolean;
    confirm?: boolean;
  };
}
