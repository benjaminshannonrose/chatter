// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCFhKb6qhlW7AmA2jj7FFbwQyp_LOQ-dw4',
    authDomain: 'chatter-f31bf.firebaseapp.com',
    databaseURL: 'https://chatter-f31bf.firebaseio.com',
    projectId: 'chatter-f31bf',
    storageBucket: 'chatter-f31bf.appspot.com',
    messagingSenderId: '852950357213'
  }
};
