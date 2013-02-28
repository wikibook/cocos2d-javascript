"use strict"  // Use strict JavaScript mode

// Pull in the modules we're going to use
var cocos  = require('cocos2d')   // Import the cocos2d module
  , nodes  = cocos.nodes          // Convenient access to 'nodes'
  , events = require('events')    // Import the events module
  , geo    = require('geometry')  // Import the geometry module
  , ccp    = geo.ccp              // Short hand to create points

// Convenient access to some constructors
var Layer    = nodes.Layer
  , Scene    = nodes.Scene
  , Label    = nodes.Label
  , Director = cocos.Director

/**
 * @class Initial application layer
 * @extends cocos.nodes.Layer
 */

var sprite;
var label;

function InputEventsExam () {
    // You must always call the super class constructor
    InputEventsExam.superclass.constructor.call(this)
    
    this.isMouseEnabled = true;
    this.isKeyboardEnabled = true;
    
    label = new Label({
    	//string: 'keyboard event'
    	string: 'mouse event'
    		, fontNmae: 'Arial'
    		, fontSize: 40
    });
    
    //label.anchorPoint = ccp(0, 0);
    //label.position = ccp(0, 240);
    label.position = ccp(320, 400);
    this.addChild(label);
    
    sprite = new nodes.Sprite({
    	file: '/resources/grossini.png'
    });
    sprite.position = ccp(320, 240);
    this.addChild(sprite);
}

// Inherit from cocos.nodes.Layer
InputEventsExam.inherit(Layer, {
	/*
	keyDown: function(evt){
		label.string = "key down event fire"
	},
	keyUp: function(evt){
		label.string = "key up event fire"
	}
	*/
	keyDown: function(evt){
		switch(evt.keyCode){
			case 37:{
				label.position = ccp(label.position.x - 10, label.position.y);
				break;
			}
			case 38:{
				label.position = ccp(label.position.x, label.position.y + 10);
				break;
			}
			case 39:{
				label.position = ccp(label.position.x + 10, label.position.y);
				break;
			}
			case 40:{
				label.position = ccp(label.position.x, label.position.y - 10);
				break;
			}
		}
	},
	mouseDown: function(evt){
		label.string = "mouseDown";
		sprite.position = ccp(evt.locationInCanvas.x, evt.locationInCanvas.y);
	},
	mouseDragged: function(evt){
		label.string = "mouseDragged";
		sprite.position = ccp(evt.locationInCanvas.x, evt.locationInCanvas.y);
	},
	mouseMoved: function(evt){
		label.string = "mouseMoved";
	},
	mouseUp: function(evt){
		label.string = "mouseUp";
	}
});

/**
 * Entry point for the application
 */
function main () {
    // Initialise application

    // Get director singleton
    var director = Director.sharedDirector

    // Wait for the director to finish preloading our assets
    events.addListener(director, 'ready', function (director) {
        // Create a scene and layer
        var scene = new Scene()
          , layer = new InputEventsExam()

        // Add our layer to the scene
        scene.addChild(layer)

        // Run the scene
        director.replaceScene(scene)
    })

    // Preload our assets
    director.runPreloadScene()
}


exports.main = main
