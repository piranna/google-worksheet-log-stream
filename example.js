#!/usr/bin/env node

var PassThrough = require('stream').PassThrough
var resolve     = require('path').resolve

// Show low level requests on the console
require('nock').recorder.rec()

var WorksheetLog = require('./index')


const SPREADSHEET_KEY = '19pi-EIKBDP-WMKVxqPvFbhf5Hg6kEjpINH5L2lXsf8U'


var input = new PassThrough({readableObjectMode: true})

input.pipe(WorksheetLog(SPREADSHEET_KEY, resolve('./test/creds.json')))
.on('error', function(error)
{
  console.trace(error)
})

input.push({date: Date.now(), doh: 'foo'})
input.push({doh: 'blah'})
input.push({'abc DEF-hi': 'bbbb'})
