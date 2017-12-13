/*
This file is part of the Nervatura Framework
http://www.nervatura.com
Copyright © 2011-2017, Csaba Kappel
License: LGPLv3
https://raw.githubusercontent.com/nervatura/nervatura/master/LICENSE
*/

var readFileSync = require('fs').readFileSync;
var path = require('path');
var ejs = require('ejs')
var out = require('nervatura').tools.DataOutput()

function render(file, data){
  var template = path.join(out.getValidPath(),"..","views","template",file)
  return ejs.compile(readFileSync(template, 'utf8'), {
    filename: template})(data); }

exports.sendResult = function(context, params){
  switch (params.type) {
    case "error":
      context.res = { 
        body: {"id":params.id || -1, "jsonrpc": "2.0", 
        "error": {"code": params.ekey, "message": params.err_msg, "data": params.data}},
        headers: {
          'Content-Type': 'application/json'}};
      context.done();
      break;
    
    case "csv":
      context.res = { 
        body: params.data,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment;filename='+params.filename+'.csv'} };
      context.done();
      break;
    
    case "html":
      context.res = { 
        body: render(params.tempfile, params.data),
        headers: {
          'Content-Type': 'text/html; charset=utf-8' }};
      context.done();
      break;
    
    case "xml":
      context.res = { 
        body: render(params.tempfile, params.data),
        headers: {
          'Content-Type': 'text/xml'}};
      context.done();
      break;
    
    case "json":
      context.res = { 
        body: {"id":params.id, "jsonrpc": "2.0", "result":params.data},
        headers: {
          "Content-Type": "application/json"}};
      context.done();
      break;

    default:
      context.res = { body: params };
      context.done();
      break; }}

exports.getVernum = function(context){
  var version = require('../package.json').version+'-NJS/AZURE';
  context.res = { body: version };
  context.done(); }