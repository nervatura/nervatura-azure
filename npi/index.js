/*
This file is part of the Nervatura Framework
http://www.nervatura.com
Copyright © 2011-2017, Csaba Kappel
License: LGPLv3
https://raw.githubusercontent.com/nervatura/nervatura/master/LICENSE
*/

var Lang = require('nervatura').lang
var Conf = require('nervatura').conf
var Npi = require('nervatura').npi;
var basicStore = require('nervatura').storage.basicStore
var Nervastore = require('nervatura').nervastore

module.exports = function (context, data) {

  var app_settings = require('../lib/settings.json');
  var conf = Conf(app_settings); var lang = Lang[conf.lang];
  
  var databases = require('../lib/databases.json');
  var storage = basicStore({ data_store: conf.data_store, databases: databases,
    conf: conf, lang: lang, data_dir: conf.data_dir, host_type: conf.host_type});
  var nstore = Nervastore({ 
    conf: conf, data_dir: conf.data_dir, report_dir: conf.report_dir,
    host_ip: "", host_settings: conf.def_settings, storage: storage,
    lang: lang });
  
  var sendResult = require('../lib/result.js').sendResult;
  Npi(lang).getApi(nstore, data.body, function(result){
    sendResult(context, result); });

}
