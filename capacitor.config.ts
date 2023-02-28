import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'br.tv.watch.watchbrasil',
  appName: 'Watch Play',
  webDir: 'dist/ui',
  bundledWebRuntime: false,
  backgroundColor: "000000",
  ios: {
    limitsNavigationsToAppBoundDomains: false
  },
  server: {
    //DEBUG Android: descomenta essa linha e comenta as outras, utilizando npm run host e  colocando seu IP
    //url:"http://192.168.1.102:4200"
     hostname: 'localhost:3000',
     iosScheme: 'capacitor',
     androidScheme: 'https'
  }
};

export default config;
