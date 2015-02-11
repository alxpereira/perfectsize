/**
 * perfectsize.js
 *  
 * @fileoverview Source File for the perfectsize JS library
 * 
 * @version 1.0.0
 *
 * @author Alexandre PEREIRA (ALE)
 *
 * @history
 * ------------------------------------------------------------------------
 * 2015-02-11 | ALE | 1.0.0 | Creation of the file.
 * ------------------------------------------------------------------------
 * 
 * @licence (WTFPL) 2015 
 */

/**
 * perfectsize namespace.
 * @namespace
 */ 
var perfectsize = !window.perfectsize ? {} : window.perfectsize;

/**
 * configuration object
 * @memberof perfectsize
 */
perfectsize.config = {
    selector : null,
	domready : false,
	byline   : false
};

/* Document Ready Listener */
document.addEventListener('DOMContentLoaded', function(){
    if(perfectsize.config.domready){
        perfectsize.analyze();
    }
}, false);

/**
 * init method
 * @memberof perfectsize
 */
perfectsize.init = function(opt){
	this.config = (typeof opt !== 'undefined') ? this.utils.merge(this.config, opt) : this.config;

	if(!this.config.domready){
		perfectsize.analyze();
	}
};

/**
 * analyse the DOM to target the containers and elements to resize properly
 * @memberof perfectsize
 */
perfectsize.analyze = function(){
    var _container;

    if(this.config.selector !== null){
        if(this.config.selector.indexOf('.') != -1){
            _container = this.utils.getbyclass(this.config.selector.split('.')[1]);
        }else if(this.config.selector.indexOf('#') != -1){
            _container = document.getElementById(this.config.selector.split('#')[1]);
        }else{
            _container = document.getElementsByTagName(this.config.selector);
        }
    }else{
        _container = this.utils.getbyclass('perfectgroup');
    } 

	for(var i = 0; i < _container.length; i++){
		var _currentcontainer = _container[i],
			_maxwidth         = _currentcontainer.clientWidth,
			_children         = _currentcontainer.children;

		this.measure({
			container : _currentcontainer,
			max_width : _maxwidth,
			elems 	  : _children
		});
	}

};

/**
 * measure the right sizes and the lines if we want to resize by line in the container
 * @memberof perfectsize
 */
perfectsize.measure = function(opts){
	var _highest_size = 0, 
		_lines 		  = [],
		_line 		  = [],
		_line_width   = 0,
		_lines_size	  = [];

	for(var i = 0; i < opts.elems.length; i++){
		var _elem = opts.elems[i];

		if(this.config.byline){
			_line_width += _elem.offsetWidth;
			_line.push(_elem);

			if(_line_width >= opts.max_width){
				_lines.push(_line);
				_line_width = 0;
				_line = [];

				_lines_size.push(_highest_size);
			}
		}

		if(_elem.offsetHeight > _highest_size){
			_highest_size = _elem.offsetHeight;
		}

		if(i === opts.elems.length -1){
			this.resize(opts, _highest_size, _lines, _lines_size);
		}
	}
};

/**
 * resize the elements with the right size
 * @memberof perfectsize
 */
perfectsize.resize = function(opts, size, lines, lines_size){
	if(lines.length > 0){
		for(var i = 0; i < lines.length; i++){
			for(var j = 0; j < lines[i].length; j++){
				lines[i][j].style.height = lines_size[i] + 'px';
			}
		}
	}else{		
		for(var i = 0; i < opts.elems.length; i++){
			var _elem = opts.elems[i];
			_elem.style.height = size + 'px';
		}
	}
}


