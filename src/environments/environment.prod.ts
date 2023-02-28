// ---------------------------------------------------------------- //
// Configurações de ambientes
// ATENÇÃO: O ambiente não deve repetir em 2 clientes
// Caso necessário criar um novo cliente, seguir o modelo:
// {
//   ambientes: Array de ambientes a ser aplicado as configurações
//   client: qual o clientedo multi-tema
//   api: qual api apontar nesse ambiente
// }
// ---------------------------------------------------------------- //
let environments: any = {
  multilaser: {
    ambientes: [
      'https://multimais.tv/',
      'https://www.multimais.tv/',
      'https://pre-release.multimais.tv/',
      'https://hml.multimais.tv/',
      'https://devmultimais.watch.tv.br/'
    ],
    client: 'multilaser',
    api: 'https://api.multimais.tv/',
    bucket:
      'https://watchbr-resources-v3.s3.sa-east-1.amazonaws.com/assets/multi/'
  },
  watch: {
    ambientes: [
      'https://watch.tv.br/',
      'https://prodv3-tmp.watch.tv.br/',
      'https://hmlv3.watch.tv.br/',
      'https://dev-v3.watch.tv.br/',
      'https://pre-release-v3.watch.tv.br/',
      'https://pre-releaseplay.watch.tv.br/',
      'https://hmlplay.watch.tv.br/',
      'https://play.watch.tv.br/'
    ],
    client: 'watch',
    api: 'https://watch.tv.br/',
    bucket:
      'https://watchbr-resources-v3.s3.sa-east-1.amazonaws.com/assets/watch/'
  }
};

function getProperty(property: string) {
  if (
    window.location.hostname === 'localhost' ||
    window.location.port === '4200'
  )
    return environments[localStorage.getItem('client') || 'watch'][property];

  let url = window.location.protocol + '//' + window.location.hostname + '/';
  return environments[
    Object.keys(environments).find((k) =>
      environments[k].ambientes.some((ambiente: string) => ambiente == url)
    ) as string
  ][property];
}

export const environment = {
  production: true,
  app: false,
  api: getProperty('api'),
  preSaveImageService:
    'https://watchbr-resources.s3.amazonaws.com/presaves_images',
  imageService:
    'https://watchbr-resources-v3.s3.sa-east-1.amazonaws.com/assets',
  notificationService: 'https://watchbr-resources.s3.amazonaws.com/notifications',
  imageServiceNSports: 'https://watchbr-resources.s3.amazonaws.com/nsports_v3',
  libertadoresImageService:
  'https://watchbr-resources.s3.amazonaws.com/conmebol/libertadores/2023',
  apiKey: 'b1aa9facd472bc233f07febdc04cb41cdc255b5a80624d67642990375e138afd',
  adyen: 'live',
  client: getProperty('client'),
  bucket: getProperty('bucket')
};

export const realTimeUpdateDelay = 3000;
export const cacheExpiresDelay = 160000;
export const requestRetry = 3;
export const TokenName = 'token';

export const idParamountTryIt = 10038;
export const idNSportsMatches = 10057;
export const idMostWatchedChannels = 10086;
export const idMenuNSports = 10062;
export const idLibertadoresMatches = 10090;
