const username = process.env.BASIC_AUTH_LOGIN;
const password = process.env.BASIC_AUTH_PASSWORD;
export const basicAuth = btoa(username + ":" + password);

