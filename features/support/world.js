// features/support/world.js
import axios from "axios";
import config from "./config";
import database from "./database";

var {
    defineSupportCode
} = require('cucumber');

function CustomWorld() {
  this.config = config;
  this.db = database;
  this.axios = axios.create({
		baseURL: config.api.url,
		timeout: config.api.timeout,
		validateStatus: function (status) {
			return status < 500; // default
		}
	});
  this.user = {
      user_id: '',
      password: ''
  };

  this.result = {
      error: null,
      data: null
  };
}

defineSupportCode(function({
  setWorldConstructor
}) {
  setWorldConstructor(CustomWorld)
});
