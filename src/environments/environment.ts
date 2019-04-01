// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_url: 'https://35.193.221.8:8443/api/v1/',
  negocio_url: "http://localhost:8086/api/v1/",
  oferta_url: "http://localhost:8089/api/v1/",
  login_url: "http://localhost:8087/api/v1/",
  cuenta_url: "http://localhost:8085/api/v1/",
  acciones_url: "http://localhost:8091/api/v1/"
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
