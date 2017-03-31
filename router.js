'use strict';
/*============================================================================================*
***include**************************************************************************************
**============================================================================================*/
//install modules
//let mime 	= require('mime');			// mime-type's files
//standart modules
let fs		= require('fs');			// file system
let path	= require('path');			// path check
let qs		= require('querystring');	// parsing and formatting URL query strings
//my modules
/*============================================================================================*
***letiables************************************************************************************
**============================================================================================*/
let three = {
	'/': 					'public/main/index.html',
	'/js_lib/jquery2.js': 	'public/main/js_lib/jquery2.js',
	'/js/main.js': 			'public/main/js/main.js',
	'/js/draw.js': 			'public/main/js/draw.js',
	'/js/display.js': 		'public/main/js/display.js',
	'/js/event.js': 		'public/main/js/event.js',
	'/style/main.css': 		'public/main/style/main.css',
	'/style/font.css': 		'public/main/style/font.css',
	'/style/nav.css': 		'public/main/style/nav.css',
	'/style/preload.css': 	'public/main/style/preload.css',
	'/img/favicon.ico': 	'public/main/img/favicon.ico',
};
let mime_type = {
	'html':		'text/html',
	'js':		'application/javascript',
	'css':		'text/css',
	'ico':		'image/x-icon',
	'img':		'image/x-icon',
	'jpg':		'image/x-icon',
};
let cache = {};
/*============================================================================================*
*****************************************************************************************
**============================================================================================*/
class Router {
	static find(pathURL, response) {
		for (let branch in three) {
			if (pathURL === branch){
				serveStatic(response, cache, three[branch]);
				//console.log('Request path: ' + pathURL + '	sended');
			}
		}
	};
}
/*============================================================================================*
***exports**************************************************************************************
**============================================================================================*/
module.exports = Router;
/*============================================================================================*
***serve Function*******************************************************************************
**============================================================================================*/
function send404(response){
	response.writeHead(404, {'Content-Type': 'text/plain'});
	response.write('Error 404: resource not found.');
	response.end();
};

function sendFile(response, filePath, fileContents){
	//let file_type = filePath.split('.')
	let file_type =filePath.split('.')[1];//Расширение файла

	//console.log('content-type: ' + mime.lookup(path.basename(filePath)) + '	filePath: ' + filePath + ' file_type:' + file_type);
	//response.writeHead( 200, {'Set-Cookie': 'mycookie=test', "content-type": mime.lookup(path.basename(filePath))} );
	response.writeHead( 200, {'Set-Cookie': 'mycookie=test', "content-type": mime_type[file_type]} );
	response.end(fileContents);
};

function serveStatic(response, cache, absPath) {
	if(cache[absPath]){//есть ли файл в памяти
		sendFile(response, absPath, cache[absPath]);
	}
	else{
		fs.exists = fs.exists || path.exists;
		fs.exists(absPath, (exists) => {
			if(exists){//существует ли файл
				fs.readFile(absPath, (err, data) => {
					if(err){
						send404(response);
					}
					else{
						cache[absPath] = data;
						sendFile(response, absPath, data);
					}
				});
			}
			else{
				send404(response);
			}
		});
	}
};