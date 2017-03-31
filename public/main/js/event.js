(function(self){

	self.init = function() {
		/**
		*navigation
		*/
		$('#zero').click(function(event){
			$(this).find('a').toggleClass("close");
			$(this).toggleClass("close");
			$('#first').toggleClass("open");
			if($(this).find('a.close').length == 0 ){
				$(this).animate({left: '1%', top: '2%'}, 500);
			}
			else{
				$(this).animate({left: '15%', top: '1%'}, 500);
			}
		});
		$('#calender').click(function(event){
			location.href = '/calender';
			//location.hash = '/calender';
		});
		$('#item_menu_sudoku').click(function(event){
			location.hash = '/sudoku';
		});
		$('#item_menu_munchkin').click(function(event){
			location.hash = '/munchkin';
		});
		$(window).resize(function(){
			drawing.events('resizeWindow');
		});
		
		addEventListener("keydown", function(event) {
			switch(event.keyCode){
				case 32: /*to do*/ break;//key space
				case 37: /*to do*/ break;//key left
				case 38: /*to do*/ break;//key up
				case 39: /*to do*/ break;//key right
				case 40: /*to do*/ break;//key down
				default: break;
			}
		});
		$('#field').mousemove(function(event){
			//drawing.events( 'mousemove', [event.clientX, event.clientY] );
		});
		$('#field').click(function(event){
			//drawing.events( 'mouseClick', [event.clientX, event.clientY]);
		});

		
	};

})( this.events = {} );