export interface Profile {
  age_bracket?: string;
  audio_default?: string;
  created_at?: string;
  foto?: string;
  foto_full_path?: string;
  id_perfis?: number;
  logado?: false;
  master?: number;
  pin?: string;
  use_pin?: boolean;
  nome?: string;
  kids?: boolean;
  live_content?: boolean;
  subtitle_default?: string;
  updated_at?: string;
  user_id?: number;
  backgroundColor?: string;

  // Propriedades auxiliares na edição do perfil
  picture?: string;
  cdnperfil?: string;
}
