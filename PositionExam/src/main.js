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
function PositionExam () {
    PositionExam.superclass.constructor.call(this)
    
    /*
    var label = new Label({
    	string: '320, 240'
    	//string: '320, 440'
    	, fontName: 'Arial'
    	, fontSize: 76
    	, fontColor: 'yellow'
    });
    
    label.position = ccp(320, 240);
    //label.position = ccp(320, 440);
    
    label.anchorPoint = ccp(0.5, 0.5);
    
    this.addChild(label);
    */
    
    var grossini = new nodes.Sprite({
    	file: "/resources/grossini.png"
    });
    grossini.position = ccp(100, 200);
    this.addChild(grossini);
    
    var sister = new nodes.Sprite({
    	file: "/resources/grossinis_sister1.png"
    });
    sister.position = ccp(200, 200);
    this.addChild(sister);
    
    var sister2 = new nodes.Sprite({
    	file: "/resources/grossinis_sister2.png"
    });
    sister2.position = ccp(300, 200);
    this.addChild(sister2);
    
    //grossini.anchorPoint = ccp(0.5, 0.5);
    //sister.anchorPoint = ccp(0.5, 0.5);
    //sister2.anchorPoint = ccp(0.5, 0.5);

    grossini.anchorPoint = ccp(0.5, 0);
    sister.anchorPoint = ccp(0.5, 0);
    sister2.anchorPoint = ccp(0.5, 0);
}

// Inherit from cocos.nodes.Layer
PositionExam.inherit(Layer)

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
          , layer = new PositionExam()

        // Add our layer to the scene
        scene.addChild(layer)

        // Run the scene
        director.replaceScene(scene)
    })

    // Preload our assets
    director.runPreloadScene()
}


exports.main = main
