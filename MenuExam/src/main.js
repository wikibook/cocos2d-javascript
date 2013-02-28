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
function MenuExam () {
    MenuExam.superclass.constructor.call(this);
    
    var grossini = new nodes.Sprite({
    	file: '/resources/grossini.png',
    });
    grossini.position = ccp(300, 300);
    this.addChild(grossini);
    
    var sprite = new nodes.Sprite({
    	file:'/resources/b1.png',
    });
    
    var sprite2 = new nodes.Sprite({
    	file: '/resources/b2.png',
    });
    
    var menuItem1 = new nodes.MenuItemSprite({
    	normalImage: sprite,
    	selectedImage: sprite2,
    	callback: function(){
    		//alert('menuItem을 클릭하였습니다.');
    		//menuItem1.position = ccp(menuItem1.position.x-20, menuItem1.position.y+20);
    		grossini.position = ccp(grossini.position.x-20, grossini.position.y);
    	}
    });
    
    var menuItem2 = new nodes.MenuItemImage({
    	normalImage: '/resources/f1.png',
    	selectedImage: '/resources/f2.png',
    	callback: function(){
    		//alert('손쉽게 만든 메뉴 아이템');
    		grossini.position = ccp(grossini.position.x+20, grossini.position.y);
    	}
    });
    menuItem2.position = ccp(100,0);
    
    var menu = new nodes.Menu([]);
    menu.addChild(menuItem1);
    menu.addChild(menuItem2);
    menu.position = ccp(260, 100);
    
    this.addChild(menu);
}

// Inherit from cocos.nodes.Layer
MenuExam.inherit(Layer)

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
          , layer = new MenuExam()

        // Add our layer to the scene
        scene.addChild(layer)

        // Run the scene
        director.replaceScene(scene)
    })

    // Preload our assets
    director.runPreloadScene()
}


exports.main = main
