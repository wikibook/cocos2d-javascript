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
  
var label;
var grossini;
var enemy;


function Knowhow () {
    Knowhow.superclass.constructor.call(this)
    var s = Director.sharedDirector.winSize

    label = new Label({ string:   'Knowhow'
                          , fontName: 'Arial'
                          , fontSize: 30
                          })
    label.position = ccp(220, 240)
    this.addChild(label)

    grossini = new nodes.Sprite({
    	file: '/resources/grossini.png'
    })
    grossini.position = ccp(50, 240)
    this.addChild(grossini)
    
    enemy = new nodes.Sprite({
    	file: '/resources/grossinis_sister1.png'
    })
    enemy.position = ccp(600, 240)
    this.addChild(enemy)
    
    //this.scheduleUpdate()
    
    this.schedule({
    	method: "update",
    	interval: 0.5
    })
    
    grossini.schedule({
    	method: move,
    	interval: 0.5
    });
}

function move(delay){
	grossini.position = ccp(grossini.position.x, grossini.position.y-5)
};
// Inherit from cocos.nodes.Layer
Knowhow.inherit(Layer, {
	update: function(delay){
		label.string = "Schedule - " + delay;
		//enemy.position = ccp(enemy.position.x - 10, enemy.position.y)
		var action = new cocos.actions.MoveBy({
			duration: 0.3,
			position: ccp(-50, 0)
		});
		
		var isOverlap = geo.rectOverlapsRect(grossini.boundingBox, enemy.boundingBox);
		if(isOverlap){
			action = action.reverse();
		}
		enemy.runAction(action);
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
          , layer = new Knowhow()

        // Add our layer to the scene
        scene.addChild(layer)

        // Run the scene
        director.replaceScene(scene)
    })

    // Preload our assets
    director.runPreloadScene()
}


exports.main = main
