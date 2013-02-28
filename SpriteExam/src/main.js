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
function SpriteExam () {
    // You must always call the super class constructor
    SpriteExam.superclass.constructor.call(this)

    /*
    var sprite = new nodes.Sprite({
    	file:'/resources/grossini.png',
    	rect: new geo.Rect(0, 0, 85, 121)
    });
    
    sprite.position = ccp(320, 240);
    this.addChild(sprite);
    */
    
    /*
    var boy = new nodes.Sprite({
    	file: '/resources/grossini.png',
    });
    
    boy.position = ccp(320, 240);
    this.addChild({child:boy, z:2});
    
    var girl = new nodes.Sprite({
    	file: '/resources/grossinis_sister1.png',
    });
    
    girl.position = ccp(340, 240);
    this.addChild(girl);
    */
    
    var sprite = new nodes.Sprite({
    	file: '/resources/grossini.png',
    });
    sprite.position = ccp(420, 240);
    this.addChild(sprite);
    
    var label = new Label({
    	string: 'Grossini',
    	fontName: 'Arial',
    	fontSize: 20
    });
    
    label.scaleY = -1;
    label.position = ccp(40, -130);
    sprite.addChild(label);
}

// Inherit from cocos.nodes.Layer
SpriteExam.inherit(Layer)

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
          , layer = new SpriteExam()

        // Add our layer to the scene
        scene.addChild(layer)

        // Run the scene
        director.replaceScene(scene)
    })

    // Preload our assets
    director.runPreloadScene()
}


exports.main = main
