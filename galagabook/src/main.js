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
var texture = new cocos.Texture2D({ file: '/resources/galagasheet.png' })

function Airplane (x,y){
    var airplane_frames = [ new cocos.SpriteFrame({ texture: texture, rect: new geo.Rect(184, 55, 15, 17) })]

	var airplane = new nodes.Sprite({ frame: airplane_frames[0] })
	airplane.scale = 2
	airplane.position = ccp(x,y)
	
	return airplane
}

function Enemy (x,y,type) {
	var enemy_frames = [ new cocos.SpriteFrame({ texture: texture, rect: new geo.Rect(161, 103, 15, 16) }),
				new cocos.SpriteFrame({ texture: texture, rect: new geo.Rect(185, 103, 15, 16) })]

		// ������ ������ �ٸ� ��� �̹����� �ٲ��ش�.		
	if(type == "type2") {					
		var enemy_frames = [ new cocos.SpriteFrame({ texture: texture, rect: new geo.Rect(161, 127, 15, 16) }), 
new cocos.SpriteFrame({ texture: texture, rect: new geo.Rect(185, 127, 15, 16) })]
	}
	
	var enemy = new nodes.Sprite({ frame: enemy_frames[0] })
	enemy.scale = 2
	enemy.position = ccp(x,y)
	
	// ���Ⱑ ����ؼ� �ִϸ��̼� �ǰ� ����
	var animation = new cocos.Animation({ frames: enemy_frames, delay: 0.4 })
	var animate   = new cocos.actions.Animate({ animation: animation })
       enemy.runAction(new cocos.actions.RepeatForever(animate))
	
	return enemy
}

function Missile (position) {
	var missile_frames = [ new cocos.SpriteFrame({ texture: texture, rect: new geo.Rect(374, 51, 3, 8) })]

	var missile = new nodes.Sprite({ frame: missile_frames[0] })
	missile.scale = 2
	missile.position = ccp(position.x,position.y)
	
	// �Ѿ� ������ ���ÿ� �������� �����̴� �׼��� ����
	missile.runAction(new cocos.actions.MoveBy({duration:1.5,position:ccp(0,1000)}))
	
	return missile
}

function EnemyMissile (position) {
	var missile_frames = [ new cocos.SpriteFrame({ texture: texture, rect: new geo.Rect(366, 195, 3, 8) })]
	
	var missile = new nodes.Sprite({ frame: missile_frames[0] })
	missile.scale = 2
	missile.position = ccp(position.x,position.y)
	
	missile.runAction(new cocos.actions.MoveBy({duration:1.5,position:ccp(0,-1000)}))
	
	return missile
}

function pickOut(array,idx) {
	var array1 = array.slice(0,idx)
	var array2 = array.slice(idx+1,array.length)
	
	return array1.concat(array2)
}

function Explosion (position,type,parent) {
	// �Ʊ��Ⱑ ������ ��
	var explosion_frames = [ new cocos.SpriteFrame({ texture: texture, rect: new geo.Rect(208, 47, 32, 32) }),
						new cocos.SpriteFrame({ texture: texture, rect: new geo.Rect(248, 47, 32, 32) }),
						new cocos.SpriteFrame({ texture: texture, rect: new geo.Rect(288, 47, 32, 32) }),
						new cocos.SpriteFrame({ texture: texture, rect: new geo.Rect(328, 47, 32, 32) })]

	// ���Ⱑ ������ ��						
	if(type=="enemy") {
	explosion_frames = [ new cocos.SpriteFrame({ texture: texture, rect: new geo.Rect(211, 202, 7, 8) }),
						new cocos.SpriteFrame({ texture: texture, rect: new geo.Rect(234, 200, 12, 13) }),
						new cocos.SpriteFrame({ texture: texture, rect: new geo.Rect(256, 199, 16, 16) }),
						new cocos.SpriteFrame({ texture: texture, rect: new geo.Rect(283, 193, 27, 28) }),
						new cocos.SpriteFrame({ texture: texture, rect: new geo.Rect(320, 191, 32, 32) })]					
	}
	
	var explosion = new nodes.Sprite({ frame: explosion_frames[0] })
	explosion.scale = 2
	explosion.position = ccp(position.x,position.y)
	
	// ���� �ִϸ��̼� �� ���� ��� ��ü ����
	// ���� �ִϸ��̼� �׼� ����
	var animation = new cocos.Animation({ frames: explosion_frames, delay: 0.4 })
	var animate   = new cocos.actions.Animate({ animation: animation })
	// ������ ��� ���� �׼� ����
	var removeAction = new cocos.actions.CallFunc( {
		method:function (target) {
			parent.removeChild(target)
		}
	})

	// �׼��� ������� ����
	var sequence = new cocos.actions.Sequence({ actions:[animate,removeAction]})
	explosion.runAction(sequence)
	
	return explosion
}
















function Galagabook () {
    // You must always call the super class constructor
    Galagabook.superclass.constructor.call(this)

    // Ÿ��Ʋ Label ����
	var title = new Label({string : "Galaga", fontSize:40, fontColor:"yellow"})
	title.position = ccp(320,340)
	this.addChild(title)
	
      // ���� Label ����
	var desc = new Label({string : "�Ʒ� ����⸦ ������ ������ �ּ���", fontSize:20})
	desc.position = ccp(320,240)
	this.addChild(desc)
	
      // ���� Label�� ����ؼ� ���ڰŸ����� ����
	var action = new cocos.actions.Blink({ duration: 1, blinks: 1 }) 
    desc.runAction(new cocos.actions.RepeatForever(action))

      // �Ʊ��� Sprite ����
	var airplane_frames = [ new cocos.SpriteFrame({ texture: texture, rect: new geo.Rect(184, 55, 15, 17) })]
	var airplane = new nodes.Sprite({ frame: airplane_frames[0] })	
	var menu = new nodes.Menu([])
	var menuItem = new nodes.MenuItemSprite ({
		normalImage:airplane,
		callback:function () {
			var sceneGame = new Scene()
			var layerGame = new GalagaGame()	  
			sceneGame.addChild(layerGame)
				Director.sharedDirector.replaceScene(new nodes.TransitionSlideInB({ duration: 0.5, scene: sceneGame }))
		}
	})
	menuItem.scale = 2
	menu.position = ccp(320, 100)
	
	menu.addChild(menuItem) 
	this.addChild(menu)
}

// Inherit from cocos.nodes.Layer
Galagabook.inherit(Layer)

function GalagaGame () {
    GalagaGame.superclass.constructor.call(this)    
    this.isKeyboardEnabled = true

	// �Ʊ��� ����
    this.airplane = Airplane(320,60)
    this.addChild(this.airplane)

    // �Ʊ��� ���� ����. ���� 2��.
    this.life = [Airplane(20,20),Airplane(55,20)]
    this.addChild(this.life[0])
    this.addChild(this.life[1])
    

    this.enemies = []

        // 4�⾿ 3�ٷ� ���� ����
    for (var i = 0; i<4; i++) {
    	for (var j = 0; j<3; j++) {		
    		var x = i * 50
    		var y = j * 50
    		var enemy = Enemy(100+x,300+y)
    		this.addChild(enemy)
    		// ������ ���⸦ �����ϱ� ���� �迭�� �߰�	
    		this.enemies.push(enemy)
    	}
    }
    
    for (var i = 0; i<4; i++) {
    	for (var j = 0; j<3; j++) {
    		var x = i * 50
    		var y = j * 50
    		// ���� ������ ���ڷ� type2�� �Ѱ��ش�
    		var enemy = Enemy(400+x,300+y,"type2")
    		this.addChild(enemy)	
    		this.enemies.push(enemy)
    	}
    }
    
    this.missiles = []
    this.enemyMissiles = []
    this.keyMap = {}

    this.schedule({method:"update",interval:0.02})		



}



GalagaGame.inherit(Layer,{
	keyDown :function (evt) {
		evt.preventDefault()
		
		this.keyMap[evt.keyCode] = true;
	},
	keyUp : function (evt) {
		this.keyMap[evt.keyCode] = false;
	
	},
	update :function (delay) {
		// �Ʊ����� Ű �Է¿� ���� �̵�
		var airplane = this.airplane
		
		// Ű������ ���� ����Ű�� ������ ������ �Ʊ��Ⱑ �������� �̵�
		if(this.keyMap[37]) {
			airplane.position = ccp(airplane.position.x - 10, airplane.position.y)
		}
		// Ű������ ������ ����Ű�� ������ ������ �Ʊ��Ⱑ ���������� �̵�
		else if(this.keyMap[39]) {
			airplane.position = ccp(airplane.position.x + 10, airplane.position.y)
		}
		
		// �Ѿ� �߻� �κ�
		if(!this.missileDelay) { // ���� �Ѿ� �غ� �ð��� 0���� ����
			this.missileDelay = 0
		}
		this.missileDelay += delay // �Ѿ� �غ� �ð��� 0.02�� ����

		// �����̽��ٰ� ���������鼭 �Ѿ� �غ� �ð��� 0.5�ʰ� ������
		if(this.keyMap[32] && this.missileDelay > 0.5) {
			// �Ʊ����� ��ġ�� �������� �Ѿ� ����
			var missile = Missile(this.airplane.position)
			this.addChild(missile)
			// �߻��� �Ѿ��� �����ϱ� ���� �迭�� �߰�
			this.missiles.push(missile)
			this.missileDelay = 0
		}

		
		// ���� �Ѿ� �߻� �κ�
		if(!this.enemyDelay) { // ���� ������ �Ѿ� �߻� �غ� �ð��� 0���� ����
			this.enemyDelay = 0
		}

		this.enemyDelay += delay 

		if(!this.nextEnemy) { // ���ʷ� �Ѿ��� �߻� ���⸦ ù��° ����� ����
			this.nextEnemy = 0
		}
		// ���Ⱑ ��� �Ѿ��� �߻��ϸ� �ٽ� ù ��° ������� �Ѿ� �߻�
		else if (this.nextEnemy >= this.enemies.length){ 
			this.nextEnemy = 0
		}

		// �Ѿ� �غ� �ð��� 0.5�ʰ� �Ѿ��
		if(this.enemyDelay > 0.5) {
			// ���� �Ѿ� �߻�
			this.enemies[this.nextEnemy].runAction(new cocos.actions.RotateBy({duration:1,angle:360})) // �Ѿ� �߻� �� ���� ȸ��

			var missile = EnemyMissile(this.enemies[this.nextEnemy].position)
			this.addChild(missile)
			this.enemyMissiles.push(missile)
			
			// �Ѿ� �غ� �ð� �ʱ�ȭ
			this.enemyDelay = 0
			// �Ѿ��� �߻��� ���⸦ ���� ����� ����
			this.nextEnemy++
		}

		
		// ȭ�� ������ ���� �Ѿ� ����
		for(var i=0;i<this.missiles.length;i++){ // �Ʊ��Ⱑ �߻��� �Ѿ��� �������
			// �Ѿ��� ��ġ�� ȭ�� ���̸� �Ѿ� ����
			if( this.missiles[i].position.y>700) {						
				this.removeChild(this.missiles[i])
				this.missiles = pickOut(this.missiles, i)		
			}
		}

		for(var i=0;i<this.enemyMissiles.length;i++){  // ���Ⱑ �߻��� �Ѿ��� �������
			// �Ѿ��� ��ġ�� ȭ�� ���̸� �Ѿ� ����
			if( this.enemyMissiles[i].position.y<-50) {
				this.removeChild(this.enemyMissiles[i])
				this.enemyMissiles = pickOut(this.enemyMissiles, i)
			}
		}

		
		// ���� �浹�˻�		
		var isOverlap = false // �浹 ����

		for( var i=0;i<this.enemies.length;i++) { 
			var enemy = this.enemies[i]
				
			for( var j=0;j<this.missiles.length;j++) {
				var missile = this.missiles[j] 
			
		isOverlap = geo.rectOverlapsRect(enemy.boundingBox, missile.boundingBox) // ����� �Ʊ��Ⱑ �߻��� �Ѿ��� �浹�˻�

		// �浹������ �Ѿ˰� ���� ����
				if(isOverlap) {
					this.removeChild(missile)					
					this.missiles = pickOut(this.missiles, j)
					this.removeChild(enemy)			
					this.enemies = pickOut(this.enemies, i)
				// ���� �ִϸ��̼� �߰� �κ�
					this.addChild(Explosion(enemy.position,"enemy",this))
				}
			}
		}

		// �Ʊ��� �浹�˻�
		isOverlap = false

		for( var i=0;i<this.enemyMissiles.length;i++) {
			var airplane = this.airplane
			var missile = this.enemyMissiles[i]

			// �Ʊ���� ���Ⱑ �߻��� �Ѿ��� �浹�˻�
			isOverlap = geo.rectOverlapsRect(airplane.boundingBox, missile.boundingBox)

			if(isOverlap) {
				// ������ �������� ������ ���� ����
				if(!this.life.length){
					this.gameOver = true
					break
				}	
				
				// �Ʊ��� ���� �ִϸ��̼� ����
				this.addChild(Explosion(airplane.position,null,this))
			
				// �Ʊ��� ���� ����
				this.removeChild(this.life[this.life.length-1])
				this.life = this.life.slice(0, this.life.length-1)
				
				// �Ʊ����� ��ġ�� ���� ��ġ�� ����
				airplane.position.x = -1000
				setTimeout(function () {
					airplane.position.x = 320
				}, 1000)
			}
		}

		// ���� ���� ó��
		// �Ʊ����� ������ ��� ������ ��
		if (this.gameOver) {
			var sceneGameOver = new Scene()
			var layerGameOver = new Layer()
			  
			// Game Over Label ����
			var title = new Label({string : "Game Over", fontSize:40, fontColor:"pink"})
			title.position = ccp(320,240)
			layerGameOver.addChild(title)
			  
			sceneGameOver.addChild(layerGameOver)
			
			// ȸ�� Scene ��ȯ
			Director.sharedDirector.replaceScene(new nodes.TransitionRotoZoom({ duration: 1, scene: sceneGameOver }))        	
			return
		}

		// ���⸦ ��� ����� ��
		else if(!this.enemies.length) {
			var sceneGameWin = new Scene()
			var layerGameWin = new Layer()
			  
			// Yon Won Label ����
			var title = new Label({string : "You Won", fontSize:40, fontColor:"green"})
			title.position = ccp(320,240)
			layerGameWin.addChild(title)
			  
			sceneGameWin.addChild(layerGameWin)
			
			// �����̵� Scene ��ȯ
			Director.sharedDirector.replaceScene(new nodes.TransitionSlideInT({ duration: 1, scene: sceneGameWin }))        	
			return			
		}


	}

	
})



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
          , layer = new Galagabook()

        // Add our layer to the scene
        scene.addChild(layer)

        // Run the scene
        director.replaceScene(scene)
    })

    // Preload our assets
    director.runPreloadScene()
}


exports.main = main
