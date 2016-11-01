/*
 * File: roller.js version 1.0
 * Author: Pengjiyuan
 * Date: 2016/10/31
 * Site: http://www.cat666.com/
 * License: MIT License
 *
 */

;(function(window) {

	var roller = function(config) {
		this.default = {
			wrapper: '.wrapper',
			height: 40,
      items: ['item1', 'item2', 'item3', 'item4', 'item5', 'item6','item1', 'item2', 'item3', 'item4', 'item5', 'item6'],
      switch: '#switch'
    };

    this.config = (typeof config === 'object') ? Object.assign(this.default, config) : this.default;
	};

	roller.prototype = {
		init: function() {
			var	that = this,
				config = that.config,
				rotate = 0,
				start = true,
				timer = null,
				wrapper = that.$(config.wrapper),
				items = config.items,
				length = items.length,
				intervalDeg = 360 / length,
				rZ = ((config.height / 2) / Math.tan(0.5 * intervalDeg * Math.PI / 180)).toFixed(4);
			
			items.forEach(function(item, index) {
				var oDiv = document.createElement('div');
				oDiv.style = 'transform: rotateX('+ intervalDeg*index +'deg) translateZ('+ rZ +'px); background-color: ' + that.randomHsl();
				oDiv.innerHTML = item;
				wrapper.appendChild(oDiv);
			});

			that.$(config.switch) ? that.bind(that.$(config.switch), 'click', function(e) {
				e.preventDefault();
				//rotate
				if(start) {
					start = false;
					timer = setInterval(function() {
						that.transform(that.$(config.wrapper), "rotateX(" + (intervalDeg * rotate++) +"deg)");
					}, 20);
				} else {
					start = true;
					clearInterval(timer);
				}
			}) : null;
		},

		randomHsl: function() {
			return "hsla(" + Math.round(360 * Math.random()) + "," + "60%, 50%, .8)";
		},

		transform: function(element, value, key) {
			key = key || "Transform";
			["Moz", "O", "Ms", "Webkit", ""].forEach(function(prefix) {
				element.style[prefix + key] = value;	
			});	
				
			return element;
		},

		$: function(selector) {
			return document.querySelector(selector);
		},

		$$: function(selector) {
			return document.querySelectorAll(selector);
		},

		getStyle: function(selector){
			return selector.currentStyle ? selector.currentStyle : document.defaultView.getComputedStyle(selector, null);
		},

		bind: function(element, type, handler) {
      if (element.addEventListener){
        element.addEventListener(type, handler, false);
      } else if (element.attachEvent){
        element.attachEvent('on' + type, handler);
      } else {
        element['on' + type] = handler;
      }
    }
	}

	window.Roller = function(config) {
		new roller(config).init();
	}

})(window);