// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  rollbarToken: 'a11b482162fc4f729661b4549b943a0f',
  rankingUpdateFrequency: 600000,
  server: {
    base: 'http://localhost:9000',
    api: 'http://localhost:9000/api/',
    auth: 'http://localhost:9000/auth/'
  }
};
