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
function ActionExam () {
    // You must always call the super class constructor
    ActionExam.superclass.constructor.call(this)

    // 예제 10-1
    var label = new Label({ string:   'Action Exam'
                          , fontName: 'Arial'
                          , fontSize: 76
                          });

    label.position = ccp(320, 390);
    this.addChild(label);
    
    var sprite = new nodes.Sprite({
    	file:'/resources/grossini.png'
    });
    sprite.position = ccp(220, 140);
    //sprite.anchorPoint = ccp(1,0);
    sprite.anchorPoint = ccp(1,1);
    this.addChild(sprite);
    
    /* 예제 10-2
    var action = new cocos.actions.MoveTo({
    	duration: 0.5
    	, position: new geo.Point(420,140)
    });
    sprite.runAction(action);
    */
    /* 예제 10-2
    var action = new cocos.actions.MoveBy({
    	duration: 0.5
    	, position: new geo.Point(100, 0)
    });
    sprite.runAction(action);
    */
    /* 예제10-3
    var action = new cocos.actions.JumpTo({
    	duration: 1
    	, delta: new geo.Point(300, 0)
    	, height: 200
    	, jumps: 1
    });
    sprite.runAction(action);
    */
    /* 예제 10-3
    var action = new cocos.actions.JumpTo({
    	duration: 1
    	, delta: new geo.Point(300, 0)
    	, height: 400
    	, jumps: 3
    });
    sprite.runAction(action);
    */
    /* 예제 10-4
    var bezierCurve = new geo.BezierConfig();
    bezierCurve.controlPoint1 = new geo.Point(220,240);
    bezierCurve.controlPoint2 = new geo.Point(320,240);
    bezierCurve.endPosition = new geo.Point(420,140);
    var action = new cocos.actions.BezierTo({
    	duration: 2
    	, bezier: bezierCurve
    });
    sprite.runAction(action);
    */
    /* 예제 10-5
    var action = new cocos.actions.Place({
    	position: new geo.Point(640, 240)
    });
    sprite.runAction(action);
    */
    /* 예제 10-6
    var action = new cocos.actions.ScaleTo({
    	duration: 1
    	//, scale: 2
    	, scaleX: 2
    	, scaleY: 3
    });
    sprite.runAction(action);
    */
    /* 예제 10-7
    sprite.scale = 1.5;
    var action = new cocos.actions.ScaleBy({
    	duration: 1
    	, scale: 2
    });
    sprite.runAction(action);
    */
    /* 예제 10-8
    var action = new cocos.actions.RotateTo({
    	duration: 1
    	, angle: 90
    });
    sprite.runAction(action);
    */
    /* 예제 10-9
    var action = new cocos.actions.Hide();
    sprite.runAction(action);
    var action = new cocos.actions.Show();
    sprite.runAction(action);
    */
    /* 예제 10-9
    var action = new cocos.actions.Blink({
    	duration: 1
    	, blinks: 2
    });
    sprite.runAction(action);
    */
    /* 예제 10-9
    var action = new cocos.actions.Hide();
    sprite.runAction(action);
    var action = new cocos.actions.ToggleVisibility();
    sprite.runAction(action);
    */
    /* 예제 10-10
    var action = new cocos.actions.FadeIn({
    	duration: 1
    });
    sprite.runAction(action);
    */
    /*
    var action = new cocos.actions.FadeOut({
    	duration: 1
    });
    sprite.runAction(action);
    */
    /*
    sprite.opacity = 100;
    var action = new cocos.actions.FadeTo({
    	duration:1
    	, toOpacity: 150
    });
    sprite.runAction(action);
    */
    
    /* 예제 10-11
    var action1 = new cocos.actions.MoveBy({
    	duration: 0.5
    	, position: new geo.Point(100, 0)
    });
    var action2 = new cocos.actions.RotateTo({
    	duration: 1
    	, angle: 90
    });
    var sequence = new cocos.actions.Sequence({
    	actions: [action1, action2]
    });
    sprite.runAction(sequence);
    */
    /* 예제 10-12
    var action1 = new cocos.actions.MoveBy({
    	duration: 0.5
    	, position: new geo.Point(100, 0)
    });
    var action2 = new cocos.actions.RotateTo({
    	duration: 0.5
    	, angle: 90
    });
    var spawn = new cocos.actions.Spawn({
    	actions: [action1, action2]
    });
    sprite.runAction(spawn);
    */
    /* 예제 10-13
    var action = new cocos.actions.MoveBy({
    	duration: 0.5
    	, position: new geo.Point(100, 0)
    });
    var reverse = action.reverse();
    var sequence = new cocos.actions.Sequence({
    	actions: [action, reverse]
    });
    sprite.runAction(sequence);
    */
    /* 예제 10-14
    var delay = new cocos.actions.DelayTime({
    	duration: 1
    });
    var sequence = new cocos.actions.Sequence({
    	actions: [action, delay, reverse]
    });
    sprite.runAction(sequence);
    */	
    /* 예제 10-15
    var repeat = new cocos.actions.Repeat({
    	action: sequence
    	, times: 2
    });
    sprite.runAction(repeat);
    */
    /*
    var repeat = new cocos.actions.RepeatForever(sequence);
    sprite.runAction(repeat);
    */
    
    /* 예제 10-16
    var action = new cocos.actions.MoveBy({
    	duration: 2
    	, position: new geo.Point(300, 0)
    });
    //var ease = new cocos.actions.EaseIn({
    //var ease = new cocos.actions.EaseOut({
    var ease = new cocos.actions.EaseInOut({
    	action: action
    	, rate: 5
    });
    sprite.runAction(ease);
    */
    /* 예제 10-17
    var action = new cocos.actions.MoveBy({
    	duration: 2
    	, position: new geo.Point(300, 0)
    });
    var speed = new cocos.actions.Speed({
    	action: action
    	, speed: 5
    });
    sprite.runAction(speed);
    */
    /* 예제 10-18
    var customAction = new cocos.actions.CallFunc({
    	method: function(target){
    		target.rotation = 90;
    		alert("캐릭터가 쓰러지는 액션");
    	}
    });
    sprite.runAction(customAction);
    */
    
    var customAction = new cocos.actions.CallFunc({
    	method: GrossiniRotate
    });
    sprite.runAction(customAction);
    
    function GrossiniRotate(target){
   		target.runAction(new cocos.actions.RotateBy({
   			duration: 1
   			, angle: 90
   		}));
    }
}

// Inherit from cocos.nodes.Layer
ActionExam.inherit(Layer)

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
          , layer = new ActionExam()

        // Add our layer to the scene
        scene.addChild(layer)

        // Run the scene
        director.replaceScene(scene)
    })

    // Preload our assets
    director.runPreloadScene()
}


exports.main = main
