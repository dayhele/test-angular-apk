# MULTI TEMAS

Para utilizar o multi tema:

Vá no contructor do componente, adicione ( public theme : Theme)

A importação deve ser de:
import { Theme } from 'src/assets/theme/theme';

para utilizar:

no TS: this.theme.propriedade\*

no html: {{ theme.propriedade* }} ou _ngIf(theme.propriedade_)

.propriedade* => propriedade que está no JSON\*\*
\*\* o JSON está localizado na pasta assets/theme/custom/*.json

# MANUTENÇÃO DE UM CLIENTE ( NOVO VALOR OU CSS ESPECÍFICO)

Possíveis perguntas:

- P: "Ah, mas é um componente inteiro dedicado a um cliente"
- R: Veja o "FAQ" de exemplo, ele é false em todos, mas na multilaser é true, e na rota pra mandar pro FAQ tem a verificação IF(theme.login.faq) ou "ngIf='theme.login.faq'

- P: "Ah, mas é um componente que já existe e pra um cliente muda a página inteira"
- R: Veja o componente "login/planos/", é um exemplo perfeito para esses casos de alteração inteira

# CRIAÇÃO DE UM CLIENTE NOVO

na pasta assets/theme/custom/, pegue um JSON de cliente como exemplo e crie um novo JSON com o nome do novo cliente*

na pasta themes/scss/, copei um existente e substitua as variaveis com o nome do cliente*
Na primeira linha, coloque o nome da classe do mesmo jeito que no JSON de configuração 

O favicon do cliente deve estar na pasta assets/favicon/nome-cliente*.ico, no JSON a propriedade é favicon

na pasta login/planos/ crie um componente do cliente e altere a rota no planos.routing
a rota após o /planos/xxxx será no nome do cliente de acordo com o json
EX:
{
client:"multilaser"
}

Resultado: login/planos/multilaser


*padronize o nome do cliente com URL case (EX: multilaser, semp-toshiba, etc)

