'use strict';
/*============================================================================================*
***include**************************************************************************************
**============================================================================================*/
//install modules
//standart modules
//my modules
let Router = require("./router.js");
let Server = require("./server.js");
/*============================================================================================*
***letiables************************************************************************************
**============================================================================================*/
let settings = {
	'port': 	80,
	'router':	Router,
};
/*============================================================================================*
*****************************************************************************************
**============================================================================================*/
Server.start(settings);