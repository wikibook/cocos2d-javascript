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

var audio, label, check;

function SoundExam () {
    SoundExam.superclass.constructor.call(this)

    var s = Director.sharedDirector.winSize

    this.isMouseEnabled = true;
    var label = new Label({ string:   'Play Background Music'
                          , fontName: 'Arial'
                          , fontSize: 76
                          });
    label.position = ccp(s.width / 2, s.height / 2);
    this.addChild(label);
    
    audio = new Audio('http://www.w3schools.com/html5/horse.ogg');
    audio.loop = true;
    check = false;
}

SoundExam.inherit(Layer, {
	mouseDown: function(evt){
		if( check == false ){
			check = true;
			label.string = 'Pause Background Music';
			audio.play();
		}else{
			check = false;
			label.string = 'Play Backtround Music';
			audio.pause();
		}
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
          , layer = new SoundExam()

        // Add our layer to the scene
        scene.addChild(layer)

        // Run the scene
        director.replaceScene(scene)
    })

    // Preload our assets
    director.runPreloadScene()
}


exports.main = main
