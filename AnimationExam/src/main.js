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
function AnimationExam () {
    AnimationExam.superclass.constructor.call(this)
    
    var texture = new cocos.Texture2D({
    	file: '/resources/animations/dragon_animation.png'
    });
    
    var frames = [ new cocos.SpriteFrame({
    					texture: texture,
    					rect: new geo.Rect(132*0, 132*0, 132, 132)
    			}), new cocos.SpriteFrame({
    					texture: texture,
    					rect: new geo.Rect(132*1, 132*0, 132, 132)
    			}), new cocos.SpriteFrame({
    					texture: texture,
    					rect: new geo.Rect(132*2, 132*0, 132, 132)
    			}), new cocos.SpriteFrame({
						texture: texture,
						rect: new geo.Rect(132*3, 132*0, 132, 132)
    			}), new cocos.SpriteFrame({
						texture: texture,
						rect: new geo.Rect(132*0, 132*1, 132, 132)
    			}), new cocos.SpriteFrame({
    					texture: texture,
    					rect: new geo.Rect(132*1, 132*1, 132, 132)
    			})
    ]
    
    var sprite = new nodes.Sprite({
    	frame: frames[0]
    });
    sprite.position = ccp(300, 300);
    this.addChild(sprite);
    
    var animation = new cocos.Animation({
    	frames: frames,
    	delay: 0.2
    });
    var animate = new cocos.actions.Animate({
    	animation: animation
    });
    sprite.runAction(new cocos.actions.RepeatForever(animate));
}

// Inherit from cocos.nodes.Layer
AnimationExam.inherit(Layer)

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
          , layer = new AnimationExam()

        // Add our layer to the scene
        scene.addChild(layer)

        // Run the scene
        director.replaceScene(scene)
    })

    // Preload our assets
    director.runPreloadScene()
}


exports.main = main
