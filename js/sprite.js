function createSprite(sprite){
	var $sprite = $(sprite);
	var frames = [ 'frame1', 'frame2', 'frame3', 'frame4', 'frame5',
        'frame6', 'frame7', 'frame8', 'frame9'];
	var current = 0;
	var last = frames.length -1;
	$sprite.addClass(frames[current]);
	
	function nextFrame(){
		if(hasNext()){
			$sprite.removeClass(frames[current]).addClass(frames[++current]);
			
		}else{
			console.log("no next");
		}
		
	}
	function hasNext(){
		return current < last;
	}
	function reset(){
		$sprite.removeClass(frames[current]).addClass(frames[0]);
		current = 0;
		
	}
	function isFinished(){
		return (!(hasNext()));
	}
	return {
		nextFrame: nextFrame,
		reset: reset,
		isFinished: isFinished
	};
}