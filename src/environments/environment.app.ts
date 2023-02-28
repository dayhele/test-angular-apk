export const environment = {
  app: true,
  production: true,
  api: getClientDetails().api,
  preSaveImageService:
    'https://watchbr-resources.s3.amazonaws.com/presaves_images',
  imageService:
    'https://watchbr-resources-v3.s3.sa-east-1.amazonaws.com/assets',
  notificationService:
    'https://watchbr-resources.s3.amazonaws.com/notifications',
  imageServiceNSports: 'https://watchbr-resources.s3.amazonaws.com/nsports_v3',
  libertadoresImageService:
    'https://watchbr-resources.s3.amazonaws.com/conmebol/libertadores/2023',
  apiKey: 'b1aa9facd472bc233f07febdc04cb41cdc255b5a80624d67642990375e138afd',
  adyen: 'live',
  client: 'watch',
  bucket: getClientDetails().bucket
};

function getClient() {
  return window.location.host === 'localhost:4200'
    ? localStorage.getItem('theme') || 'watch'
    : window.location.host == 'multi-tema-watch.azurewebsites.net'
    ? 'multilaser'
    : 'watch';
}

function getClientDetails(): any {
  switch (environment.client) {
    case 'watch':
      return {
        api: 'https://watch.tv.br/',
        bucket:
          'https://watchbr-resources-v3.s3.sa-east-1.amazonaws.com/assets/watch/'
      };

    case 'multi':
      return {
        api: 'https://api.multimais.tv/',
        bucket:
          'https://watchbr-resources-v3.s3.sa-east-1.amazonaws.com/assets/multi/'
      };
  }
}

export const realTimeUpdateDelay = 3000;
export const cacheExpiresDelay = 160000;
export const requestRetry = 3;
export const TokenName = 'token';

export const idParamountTryIt = 10038;
export const idNSportsMatches = 10057;
export const idMostWatchedChannels = 10086;
export const idMenuNSports = 10062;
export const idLibertadoresMatches = 10090;
