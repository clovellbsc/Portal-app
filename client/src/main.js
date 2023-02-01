import { createApp } from "vue";
import { createPinia } from "pinia";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports.js";
import { Buffer } from "buffer";

// eslint-disable-next-line no-undef
global.Buffer = Buffer;

Amplify.configure(awsconfig);

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
