'use strict';
/*============================================================================================*
***include**************************************************************************************
**============================================================================================*/
//install modules

//standart modules
let http	= require('http');			// http server
let url		= require('url');			// url parser
let qs		= require('querystring');	// parsing and formatting URL query strings
//my modules
/*============================================================================================*
***letiables************************************************************************************
**============================================================================================*/
let cache = {};
/*============================================================================================*
*****************************************************************************************
**============================================================================================*/
class Server {
	static start(settings) {
		this.settings = settings;
		let server = http.createServer(this.handleRequest);
		server.listen(settings.port, () => {
				console.log("Server listening on port " + settings.port + ".");
		});
	};

	static handleRequest(request, response){
		let pathURL = url.parse(request.url).pathname;
		if (request.method == 'POST') {
			let postData = '';
			request.on('data', (postDataChunk) => {//Принимаем данные POST-запроса
				postData += postDataChunk;
			});
			request.on('end', () => {//Приём данных окончен
				let post = qs.parse(postData);
				console.log("Request post get " + postData);
				// use post['blah'], etc.
			});
		}
		else
			Server.settings.router.find(pathURL, response);
	};
};
/*============================================================================================*
***exports**************************************************************************************
**============================================================================================*/
module.exports = Server;
/*============================================================================================*
***serve Function*******************************************************************************
**============================================================================================*/
