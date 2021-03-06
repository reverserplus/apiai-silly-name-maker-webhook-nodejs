// Copyright 2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

process.env.DEBUG = 'actions-on-google:*';
let Assistant = require('actions-on-google').ApiAiAssistant;
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
app.use(bodyParser.json({type: 'application/json'}));

const CLIENT_CODE_ACTION = 'get_client_code';
const FOOLISH_PIZZA = 'foolish_pizza';
const NAME_ACTION = 'make_name';
const CLIENT_NAME_ARGUMENT = 'clientname';
const COLOR_ARGUMENT = 'color';
const NUMBER_ARGUMENT = 'number';

// [START SillyNameMaker]
app.post('/', function (req, res) {
  const assistant = new Assistant({request: req, response: res});
  console.log('Request headers: ' + JSON.stringify(req.headers));
  console.log('Request body: ' + JSON.stringify(req.body));

  // Make a silly name
  function makeName (assistant) {
    let number = assistant.getArgument(NUMBER_ARGUMENT);
    let color = assistant.getArgument(COLOR_ARGUMENT);
	if (color === 'blue'){
		assistant.tell('That color sucks!');
	}
	else if (color === 'pink'){
		assistant.tell('What a girly color choice!');
	}
	else{
		assistant.tell('Alright, your silly bunny name is ' +
		color + ' ' + number +
      '! I hope you like it. See you next time.');
	}
  }
  
  function foolishPizza (assistant) {
	assistant.tell ('We dont sell any pizza here!');
  }

  function getClientCode (assistant) {
	let name = assistant.getArgument(CLIENT_NAME_ARGUMENT);
	if (name === 'CRS'){
		assistant.tell('The CRS services code is 1 2 5 0 0 0 2 3');
	}
	else{
	assistant.tell ('Sorry, I dont know any ' + name + ' client codes');
	}
  }
  
  let actionMap = new Map();
  actionMap.set(NAME_ACTION, makeName);
  actionMap.set(FOOLISH_PIZZA, foolishPizza);
  actionMap.set(CLIENT_CODE_ACTION, getClientCode);
  assistant.handleRequest(actionMap);
});
// [END SillyNameMaker]

if (module === require.main) {
  // [START server]
  // Start the server
  let server = app.listen(process.env.PORT || 8080, function () {
    let port = server.address().port;
    console.log('App listening on port %s', port);
  });
  // [END server]
}

module.exports = app;
