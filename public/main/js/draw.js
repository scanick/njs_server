(function(self) {
/*===============================================================================================================
* private variables
**===============================================================================================================*/
	let ctx;
	let web;
	
	let Colors = {
		ground: 	['#BEE8FC', '#D9EDF7'],	//Цвет фона
		pixel:  	['#082230', '#4083A8', '#9CC8DF'],//
		line: 		['#818DE9'],				// Цвет паутины
		mcolors: 	['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3',
					'#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39',
					'#FFEB3B', '#FFC107', '#FF9800', '#FF5722'],
	};
	
	let field = {
		fWidth: window.innerWidth,		// Ширина поля
		fHeight: window.innerHeight,	// Высота поля
		center: [0, 0],					// ХУ центра поля
		magnitude: 0,					// Наименьшая из ширины и высоты
		init: function() {
			this.fWidth = window.innerWidth; 	// Ширина поля
			this.fHeight = window.innerHeight; 	// Высота поля
			this.center[0] = this.fWidth/2; 	// Х центра поля
			this.center[1] = this.fHeight/2;	// У центра поля
			this.magnitude = this.fWidth > this.fHeight ? this.fHeight : this.fWidth;
		},
	};
/*===============================================================================================================
* private Class New
**===============================================================================================================*/
	function classGoldenRatio(){
		/*=======================================================================================================
		* private variables
		**=======================================================================================================*/
		let self = this;
		let arrRec = [];
		let arrCurls = [];
		/*========================================================================================================
		* public function
		**========================================================================================================*/
		this.init = function(){
			initRays();
		};
		this.draw = function(){
			drawRays();
			drawCurls();
		};
		/*========================================================================================================
		* private function
		**========================================================================================================*/
		let initRec = function(){//Лучи
			
		}.bind(this);
		let drawRays = function(){//Лучи
			ctx.strokeStyle = Colors.webline[0];
			ctx.beginPath();//Основа паутины, лучи
				for(let i = 0; i < arrRays.length; i++){
					ctx.moveTo( arrRays[i][0][0], arrRays[i][0][1]);
					ctx.lineTo( arrRays[i][1][0], arrRays[i][1][1]);
				}
			ctx.closePath();
			ctx.lineCap = "round";
			ctx.lineWidth = 2;//толщина линии
			ctx.stroke();
		}.bind(this);
		
		let initCurls = function(){//Завитки
			let center = [field.center[0], field.center[1]];
			let rad = field.magnitude/2 - 20;
			let angle = Math.PI/4;// 8 лучей
			let dr = rad*.02;
			arrCurls.splice(0, arrCurls.length);//очистить массив завитушек
			for(let i = 0; i < 44; i++){//инициализация завитушек
				let position = [];
				let arr0 = [];
				arr0[0] = center[0] + (rad - i*dr) * Math.cos(-Math.PI/2 + i * angle);
				arr0[1] = center[1] + (rad - i*dr) * Math.sin(-Math.PI/2 + i * angle);
				position.push(arr0);
				let arr1 = [];
				arr1[0] = center[0] + (rad*0.9 - i*dr) * Math.cos(-Math.PI/2 + i * angle + angle/4);
				arr1[1] = center[1] + (rad*0.9 - i*dr) * Math.sin(-Math.PI/2 + i * angle + angle/4);
				position.push(arr1);
				let arr2 = [];
				arr2[0] = center[0] + (rad*0.85 - i*dr) * Math.cos(-Math.PI/2 + i * angle + 2*angle/3);
				arr2[1] = center[1] + (rad*0.85 - i*dr) * Math.sin(-Math.PI/2 + i * angle + 2*angle/3);
				position.push(arr2);
				let arr3 = [];
				arr3[0] = center[0] + (rad - (i+1)*dr) * Math.cos(-Math.PI/2 + (i+1) * angle);
				arr3[1] = center[1] + (rad - (i+1)*dr) * Math.sin(-Math.PI/2 + (i+1) * angle);
				position.push(arr3);
				arrCurls.push(position);
			}
		}.bind(this);
		let drawCurls = function(){//Завитки
			ctx.strokeStyle = Colors.webline[0];
			ctx.beginPath();//Завитки
				for(let i = 0; i < arrCurls.length; i++){
					ctx.moveTo( arrCurls[i][0][0], arrCurls[i][0][1]);
					ctx.bezierCurveTo(arrCurls[i][1][0], arrCurls[i][1][1], 
										arrCurls[i][2][0], arrCurls[i][2][1], 
										arrCurls[i][3][0], arrCurls[i][3][1]);
				}
			ctx.lineCap = "round";
			ctx.lineWidth = 3;//толщина линии
			ctx.stroke();
		}.bind(this);
	};

/*===============================================================================================================
* public function
**=================================================================================================================*/
	self.init = function(){
		field.init();
		let canva = $("#main_field")[0];
		canva.width = field.fWidth;
		canva.height = field.fHeight;
		ctx = canva.getContext('2d');
		clear();
		/*web = new classWeb();
		web.init();
		web.draw();*/
	};

	self.events = function(e, data){
		switch(e){
			case 'resizeWindow':
				field.init();
				clear();
				/*web.init();
				web.draw();*/
				break;
			case '':
				break;
			case '':
				break;
			default: break;
		}
	}

/*===============================================================================================================
* private function
**=================================================================================================================*/

	clear = function(){
		ctx.clearRect(0, 0, field.fWidth, field.fHeight);
		
		let grdr = ctx.createRadialGradient(field.center[0],field.center[1], field.magnitude/2, field.center[0], field.center[1], field.magnitude);
			grdr.addColorStop( 0  , Colors.ground[0] );//Color_start
			grdr.addColorStop( 1  , Colors.ground[1] );//Color_end
		ctx.fillStyle = grdr; // меняем цвет
		ctx.fillRect(0, 0, field.fWidth, field.fHeight);//Закрашиваем область
		ctx.fill();

		ctx.strokeStyle = Colors.line[0]; //меняем цвет
		ctx.beginPath();//
			ctx.moveTo( field.fWidth * 0.38, 0);
			ctx.lineTo( field.fWidth * 0.38, field.fHeight);
		ctx.closePath();
		ctx.lineWidth = 1;//толщина линии
		ctx.stroke();

	};

	draw = function(){
	};
})( this.drawing = {});