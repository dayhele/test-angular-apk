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
      'https://watch-apk-test.vercel.app/',
      'https://pre-release.multimais.tv/',
      'https://hml.multimais.tv/',
      'https://devmultimais.watch.tv.br/',
      'http://localhost:4200/'
    ],
    client: 'multilaser',
    api: 'https://hmlapi.multimais.tv/',
    bucket:
      'https://watchbr-resources-v3.s3.sa-east-1.amazonaws.com/assets/multi/'
  },
  watch: {
    ambientes: [
      'https://watch.tv.br/',
      'https://watch-apk-test.vercel.app/',
      'https://prodv3-tmp.watch.tv.br/',
      'https://hmlv3.watch.tv.br/',
      'https://dev-v3.watch.tv.br/',
      'https://pre-release-v3.watch.tv.br/',
      'https://hml.watch.tv.br/',
      'https://hmlplay.watch.tv.br/',
      'https://play.watch.tv.br/',
      'http://localhost:4200/',
    ],
    client: 'watch',
    api: 'https://hml.watch.tv.br/',
    bucket:
      'https://watchbr-resources-v3.s3.sa-east-1.amazonaws.com/assets/watch/'
  }
};

export const environment = {
  production: false,
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
  adyen: 'test',
  client: getProperty('client'),
  bucket: getProperty('bucket')
};

export const realTimeUpdateDelay = 3000;
export const cacheExpiresDelay = 160000;
export const requestRetry = 3;
export const TokenName = 'token';
export const idParamountTryIt = 10038;
export const idNSportsMatches = 10057;
export const idMenuNSports = 10062;
export const idMostWatchedChannels = 10086;

function getProperty(property: string) {
  let url = window.location.protocol + '//' + window.location.hostname + '/';
  console.log(environments);
  console.log('Environments selecionado: ');
  console.log(
    environments[
      Object.keys(environments).find((k) =>
        environments[k].ambientes.some((ambiente: string) => ambiente == url)
      ) as string
    ]
  );

  if (
    window.location.hostname === 'localhost' ||
    window.location.port == '4200'
  )
    return environments[localStorage.getItem('client') || 'watch'][property];

  return environments[
    Object.keys(environments).find((k) =>
      environments[k].ambientes.some((ambiente: string) => ambiente == url)
    ) as string
  ][property];
}
