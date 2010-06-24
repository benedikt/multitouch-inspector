function $(id) { 
	return document.getElementById(id);
}

function $$(selector) {
	return document.querySelector(selector);
}

function updateStats(field, value) {
	$$('#' + field + ' .value').innerHTML = value;
}

function incrementStats(field) {
	var element = $$('#' + field + ' .value');
	element.innerHTML = (1 * element.innerHTML) + 1;
}

function logEvent(event) {
	var element = document.createElement('span');
	element.className = event.type;
	element.innerHTML = '[' + (event.type) + '] ';
	element.innerHTML += 'Touches: ';
	
	var touches = [];
	for(var i = 0; i < event.touches.length; i++) {
		var touch = event.touches[i];
		touches.push('&lt;id: ' + touch.identifier + ', x: ' + touch.pageX + ', y: ' + touch.pageY + '&gt;');
	}
	element.innerHTML += '[' + touches.join(', ') + '] [' + event.touches.length + '], ';
	
	element.innerHTML += 'Changed: ' + event.changedTouches.length;
	
	var c = $('console');
	c.appendChild(element);
	element.scrollIntoView();
}

window.onload = function() {

	var touches = [];
	var tracking = $('tracking');

	/* Prevent Defaults */
	function preventDefault(event) { event.preventDefault(); }
	document.addEventListener('touchstart', preventDefault, false);
	document.addEventListener('touchmove', 	preventDefault, false);
	document.addEventListener('touchend', 	preventDefault, false);
	
	/* Touch Events within Tracking Area */
	
	tracking.addEventListener('touchstart', function(event) {
		logEvent(event);
		incrementStats('touchstarts');
		updateStats('state', 'start');
		updateStats('touches', event.touches.length);
		
		for(var i = 0; i < event.changedTouches.length; i++) {
			var touch = event.changedTouches[i];
		
			if(!touches[touch.identifier]) {	
				var element = document.createElement('div');
				element.className = 'touch';
				element.style.left = touch.pageX + 'px';
				element.style.top = touch.pageY + 'px';

				tracking.appendChild(element);
				touches[touch.identifier] = element;
			}
		
		}
		
		event.preventDefault();
	}, false);

	tracking.addEventListener('touchmove', function(event) {
		logEvent(event);
		incrementStats('touchmoves');
		updateStats('state', 'move');
		
		for(var i = 0; i < event.changedTouches.length; i++) {
			var touch = event.changedTouches[i];
			var element = touches[touch.identifier];
		
			element.style.left = touch.pageX + 'px';
			element.style.top = touch.pageY + 'px';
		}
	
		event.preventDefault();
	}, false);

	tracking.addEventListener('touchend', function(event) {
		logEvent(event);
		incrementStats('touchends');
		updateStats('state', 'end');
		updateStats('touches', 0);
		
		tracking.innerHTML = '';
		touches = [];
	
		event.preventDefault();
	}, false);
	

	/* Toolbar Buttons */
	
	$('resetButton').addEventListener('touchend', function(event) {
		window.location.reload();
		event.preventDefault();
	}, true);

	$('consoleButton').addEventListener('touchend', function(event) {
		var c = $('console'), b = $('consoleButton'), s = $('stats');
		
		if(b.className.match(/active/)) {
			c.style.height = s.style.bottom = '0px';
			b.className = b.className.replace(/ active/, '')
		} else {
			c.style.height = s.style.bottom = '200px';
			b.className += ' active';
		}
		
		event.preventDefault();
	}, true);
	
}