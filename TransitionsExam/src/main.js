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
function TransitionsExam () {
    // You must always call the super class constructor
    TransitionsExam.superclass.constructor.call(this)

    // Get size of canvas
    var s = Director.sharedDirector.winSize

    // Create label
    var label = new Label({ string:   'Transitions Exam'
                          , fontName: 'Arial'
                          , fontSize: 76
                          })

    // Position the label in the centre of the view
    label.position = ccp(s.width / 2, s.height / 2)

    // Add label to layer
    this.addChild(label)
}

// Inherit from cocos.nodes.Layer
TransitionsExam.inherit(Layer)

/**
 * Entry point for the application
 */
function main () {
    var director = Director.sharedDirector

    events.addListener(director, 'ready', function (director) {
        var scene = new Scene()
            , layer = new TransitionsExam();

        scene.addChild(layer);

        /* 예제 11-1
        var transition = new nodes.TransitionRotoZoom({
        	duration: 1.5
        	, scene: scene
        });
        
        director.replaceScene(transition);
        */
        /* 예제 11-2
        var scene2 = new Scene()
            , layer2 = new Layer("layer2")
        	, label = new Label({
        		string: 'Scene2 - GameScene'
        		, fontName: 'Arial'
        		, fontSize: 45
        	});
        scene2.addChild(layer2);
        label.position = ccp(320, 240);
        layer2.addChild(label);
        
        var transition = new nodes.TransitionRotoZoom({
        	duration: 1.5
        	, scene: scene
        });
        
        director.replaceScene(scene2);
        */
        
        var scene2 = new Scene()
	        , layer2 = new Layer("layer2")
	    	, label = new Label({
	    		string: 'Scene2 - GameScene'
	    		, fontName: 'Arial'
	    		, fontSize: 45
	    	});
	    scene2.addChild(layer2);
	    label.position = ccp(320, 240);
	    layer2.addChild(label)
	    
        var menuItem = new nodes.MenuItemImage({
        	normalImage: '/resources/f1.png'
        	, selectedImage: '/resources/f2.png'
        	, callback: function(){
        		//var transition = new nodes.TransitionRotoZoom({
        		//var transition = new nodes.TransitionMoveInT({
        		var transition = new nodes.TransitionSlideInR({
        			duration: 1.5
        			, scene: scene2
        		});
        		director.replaceScene(transition);
        	}
        });
        
	    var menu = new nodes.Menu([]);
	    menu.position = ccp(320, 140);
	    menu.addChild(menuItem);
	    layer.addChild(menu);
        
        director.replaceScene(scene);
    })

    director.runPreloadScene()
}


exports.main = main
