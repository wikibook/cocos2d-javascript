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
function LabelAtlasExam () {
    // You must always call the super class constructor
    LabelAtlasExam.superclass.constructor.call(this)

    var s = Director.sharedDirector.winSize

    var label = new nodes.LabelAtlas({ string: "123 Test"
        , charMapFile: '/resources/fonts/tuffy_bold_italic-charmap.png'
        , itemWidth: 48
        , itemHeight: 64
        , startCharMap: ' '
        })

    label.position = ccp(0, s.height / 2)
    this.addChild(label)
}

// Inherit from cocos.nodes.Layer
LabelAtlasExam.inherit(Layer)

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
          , layer = new LabelAtlasExam()

        // Add our layer to the scene
        scene.addChild(layer)

        // Run the scene
        director.replaceScene(scene)
    })

    // Preload our assets
    director.runPreloadScene()
}


exports.main = main
