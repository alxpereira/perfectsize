/**
 * perfectsize.utils.js
 *  
 * @fileoverview Source File for the perfectsize.utils methods
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
 * utils methods to facilitate our work
 * @memberof perfectsize
 */
perfectsize.utils = {
	/**
     * Creates a new object instance that implements each arguments properties.
     * <p class="note">
     *  In case a source property was already declared in the destination
     *  then the source property overrides the destination's one.
     * </p>
     *
     * <p class="note">
     * In case of a property that is an object, a new instance is created.
     * </p>
     *
     * @example <h3>Simple example</h3>
     *   var _oMyObject1 = {foo: 'foo', bar: 'bar'};
     *   var _oMyObject2 = {foo: 'bar', foobar: 'foobar'};
     *
     *   var _oMyResult = Utils.merge( _oMyObject1, _oMyObject2 );
     *
     *   // After this code is executed following test is true
     *   _oMyObject1 == {
     *     foo: 'bar',
     *     bar: 'bar',
     *     foobar: 'foobar'
     *   };
     *
     *   // and this one is false
     *   _oMyResult === _oMyObject1
     *
     * @example <h3>Multiple source example</h3>
     *   var _oMyObject1 = {foo: 'foo', bar: 'bar'};
     *   var _oMyObject2 = {foo: 'bar', foobar: 'foobar'};
     *   var _oMyObject3 = {foo: 'foo'};
     *
     *   var _oMyResult = Utils.merge( _oMyObject1, _oMyObject2, _oMyObject3 );
     *
     *   // After this code is executed following test is true
     *   _oMyObject1 == {
     *     foo: 'foo',
     *     bar: 'bar',
     *     foobar: 'foobar'
     *   };
     *
     *   // and this one is false
     *   _oMyResult === _oMyObject1
     *
     * @param {object} aoObject1 : the first object with properties to be merged
     * @param {object} aoObject2 : the second object with properties to be merged
     * @param {object} [etc] : etc...
     *
     * @return {object} : the object that implements both parameters properties
    */
    merge : function (aoObject1, aoObject2) {
        var _oFinal = {}, _aArgs = arguments, _i, _j, _nLength;
        _nLength = _aArgs.length;

        for (_i = 0; _i < _nLength; _i++) {
            for (_j in _aArgs[_i]) {
                if (this.type(_aArgs[_i][_j]) == 'object') {
                    _oFinal[_j] = this.merge(
                        this.type(_oFinal[_j]) == "object" ? _oFinal[_j] : {},
                        _aArgs[_i][_j]
                    );
                } else {
                    _oFinal[_j] = _aArgs[_i][_j];
                }
            }
        }

        return _oFinal;
    },

    /**
     * Returns the type of object that is passed in. If the object passed in is null or undefined it
     * returns false otherwise it returns one of the following values:<ul>
     * <li><b>string</b>: If the object passed is a string</li>
     * <li><b>number</b>: If the object passed is a number</li>
     * <li><b>boolean</b>: If the object passed is a boolean value</li>
     * <li><b>function</b>: If the object passed is a function reference</li>
     * <li><b>object</b>: If the object passed is an object</li>
     * <li><b>array</b>: If the object passed is an array</li>
     * <li><b>regexp</b>: If the object passed is a regular expression</li>
     * <li><b>element</b>: If the object passed is a DOM Element</li>
     * <li><b>nodelist</b>: If the object passed is a DOM NodeList</li>
     * <li><b>textnode</b>: If the object passed is a DOM text node and contains something other than whitespace</li>
     * <li><b>whitespace</b>: If the object passed is a DOM text node and contains only whitespace</li>
     *
     * @param {object} aoObject : the object.
     *
     * @return {string} : the type of object that is passed in.
    */
    type: function (aoObject) {
        if (aoObject === undefined || aoObject === null) {
            return false;
        }
        if (aoObject.htmlElement) {
            return 'element';
        }
        var _type = typeof aoObject;
        if (_type == 'object' && aoObject.nodeName) {
            switch (aoObject.nodeType) {
                case 1: return 'element';
                case 3: return (/\S/).test(aoObject.nodeValue) ? 'textnode' : 'whitespace';
            }
        }
        if (_type == 'object' || _type == 'function') {
            switch (aoObject.constructor) {
                case Array: return 'array';
                case RegExp: return 'regexp';
            }
            if (typeof aoObject.length == 'number') {
                if (typeof aoObject.item == 'function') {
                    return 'nodelist';
                }
                if (typeof aoObject.calle == 'arguments') {
                    return 'arguments';
                }
            }
        }

        return _type;
    },

    /**
     * Get Element By the classname (looks cross browser)
     *
     * @param {string} classname - the name of the class to find
     *
     * @return {object} DOMelements 
     */
    getbyclass : function(classname){
    	var elArray = [];
        var tmp = document.getElementsByTagName("*");
        var regex = new RegExp("(^|\\s)" + classname + "(\\s|$)");
        for (var i = 0; i < tmp.length; i++) {

            if (regex.test(tmp[i].className)) {
                elArray.push(tmp[i]);
            }
        }

        return elArray;
    }
};