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

		// 적기의 종류가 다를 경우 이미지를 바꿔준다.		
	if(type == "type2") {					
		var enemy_frames = [ new cocos.SpriteFrame({ texture: texture, rect: new geo.Rect(161, 127, 15, 16) }), 
new cocos.SpriteFrame({ texture: texture, rect: new geo.Rect(185, 127, 15, 16) })]
	}
	
	var enemy = new nodes.Sprite({ frame: enemy_frames[0] })
	enemy.scale = 2
	enemy.position = ccp(x,y)
	
	// 적기가 계속해서 애니메이션 되게 설정
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
	
	// 총알 생성과 동시에 위쪽으로 움직이는 액션을 실행
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
	// 아군기가 폭발할 때
	var explosion_frames = [ new cocos.SpriteFrame({ texture: texture, rect: new geo.Rect(208, 47, 32, 32) }),
						new cocos.SpriteFrame({ texture: texture, rect: new geo.Rect(248, 47, 32, 32) }),
						new cocos.SpriteFrame({ texture: texture, rect: new geo.Rect(288, 47, 32, 32) }),
						new cocos.SpriteFrame({ texture: texture, rect: new geo.Rect(328, 47, 32, 32) })]

	// 적기가 폭발할 때						
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
	
	// 폭발 애니메이션 후 폭발 대상 객체 제거
	// 폭발 애니메이션 액션 생성
	var animation = new cocos.Animation({ frames: explosion_frames, delay: 0.4 })
	var animate   = new cocos.actions.Animate({ animation: animation })
	// 폭발한 대상 제거 액션 생성
	var removeAction = new cocos.actions.CallFunc( {
		method:function (target) {
			parent.removeChild(target)
		}
	})

	// 액션을 순서대로 실행
	var sequence = new cocos.actions.Sequence({ actions:[animate,removeAction]})
	explosion.runAction(sequence)
	
	return explosion
}
















function Galagabook () {
    // You must always call the super class constructor
    Galagabook.superclass.constructor.call(this)

    // 타이틀 Label 생성
	var title = new Label({string : "Galaga", fontSize:40, fontColor:"yellow"})
	title.position = ccp(320,340)
	this.addChild(title)
	
      // 설명 Label 생성
	var desc = new Label({string : "아래 비행기를 눌러서 시작해 주세요", fontSize:20})
	desc.position = ccp(320,240)
	this.addChild(desc)
	
      // 설명 Label이 계속해서 깜박거리도록 설정
	var action = new cocos.actions.Blink({ duration: 1, blinks: 1 }) 
    desc.runAction(new cocos.actions.RepeatForever(action))

      // 아군기 Sprite 생성
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

	// 아군기 생성
    this.airplane = Airplane(320,60)
    this.addChild(this.airplane)

    // 아군기 생명 생성. 최초 2개.
    this.life = [Airplane(20,20),Airplane(55,20)]
    this.addChild(this.life[0])
    this.addChild(this.life[1])
    

    this.enemies = []

        // 4기씩 3줄로 적기 생성
    for (var i = 0; i<4; i++) {
    	for (var j = 0; j<3; j++) {		
    		var x = i * 50
    		var y = j * 50
    		var enemy = Enemy(100+x,300+y)
    		this.addChild(enemy)
    		// 생성한 적기를 관리하기 위해 배열에 추가	
    		this.enemies.push(enemy)
    	}
    }
    
    for (var i = 0; i<4; i++) {
    	for (var j = 0; j<3; j++) {
    		var x = i * 50
    		var y = j * 50
    		// 적기 생성시 인자로 type2를 넘겨준다
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
		// 아군기의 키 입력에 따른 이동
		var airplane = this.airplane
		
		// 키보드의 왼쪽 방향키를 눌려져 있으면 아군기가 왼쪽으로 이동
		if(this.keyMap[37]) {
			airplane.position = ccp(airplane.position.x - 10, airplane.position.y)
		}
		// 키보드의 오른쪽 방향키가 눌려져 있으면 아군기가 오른쪽으로 이동
		else if(this.keyMap[39]) {
			airplane.position = ccp(airplane.position.x + 10, airplane.position.y)
		}
		
		// 총알 발사 부분
		if(!this.missileDelay) { // 최초 총알 준비 시간을 0으로 설정
			this.missileDelay = 0
		}
		this.missileDelay += delay // 총알 준비 시간을 0.02초 증가

		// 스페이스바가 눌려졌으면서 총알 준비 시간이 0.5초가 넘으면
		if(this.keyMap[32] && this.missileDelay > 0.5) {
			// 아군기의 위치를 기준으로 총알 생성
			var missile = Missile(this.airplane.position)
			this.addChild(missile)
			// 발사한 총알을 관리하기 위해 배열에 추가
			this.missiles.push(missile)
			this.missileDelay = 0
		}

		
		// 적기 총알 발사 부분
		if(!this.enemyDelay) { // 최초 적기의 총알 발사 준비 시간을 0으로 설정
			this.enemyDelay = 0
		}

		this.enemyDelay += delay 

		if(!this.nextEnemy) { // 최초로 총알을 발사 적기를 첫번째 적기로 설정
			this.nextEnemy = 0
		}
		// 적기가 모두 총알을 발사하면 다시 첫 번째 적기부터 총알 발사
		else if (this.nextEnemy >= this.enemies.length){ 
			this.nextEnemy = 0
		}

		// 총알 준비 시간이 0.5초가 넘어가면
		if(this.enemyDelay > 0.5) {
			// 적기 총알 발사
			this.enemies[this.nextEnemy].runAction(new cocos.actions.RotateBy({duration:1,angle:360})) // 총알 발사 시 적기 회전

			var missile = EnemyMissile(this.enemies[this.nextEnemy].position)
			this.addChild(missile)
			this.enemyMissiles.push(missile)
			
			// 총알 준비 시간 초기화
			this.enemyDelay = 0
			// 총알을 발사할 적기를 다음 적기로 설정
			this.nextEnemy++
		}

		
		// 화면 밖으로 나간 총알 제거
		for(var i=0;i<this.missiles.length;i++){ // 아군기가 발사한 총알을 대상으로
			// 총알의 위치가 화면 밖이면 총알 제거
			if( this.missiles[i].position.y>700) {						
				this.removeChild(this.missiles[i])
				this.missiles = pickOut(this.missiles, i)		
			}
		}

		for(var i=0;i<this.enemyMissiles.length;i++){  // 적기가 발사한 총알을 대상으로
			// 총알의 위치가 화면 밖이면 총알 제거
			if( this.enemyMissiles[i].position.y<-50) {
				this.removeChild(this.enemyMissiles[i])
				this.enemyMissiles = pickOut(this.enemyMissiles, i)
			}
		}

		
		// 적기 충돌검사		
		var isOverlap = false // 충돌 여부

		for( var i=0;i<this.enemies.length;i++) { 
			var enemy = this.enemies[i]
				
			for( var j=0;j<this.missiles.length;j++) {
				var missile = this.missiles[j] 
			
		isOverlap = geo.rectOverlapsRect(enemy.boundingBox, missile.boundingBox) // 적기와 아군기가 발사한 총알의 충돌검사

		// 충돌했으면 총알과 적기 제거
				if(isOverlap) {
					this.removeChild(missile)					
					this.missiles = pickOut(this.missiles, j)
					this.removeChild(enemy)			
					this.enemies = pickOut(this.enemies, i)
				// 폭발 애니메이션 추가 부분
					this.addChild(Explosion(enemy.position,"enemy",this))
				}
			}
		}

		// 아군기 충돌검사
		isOverlap = false

		for( var i=0;i<this.enemyMissiles.length;i++) {
			var airplane = this.airplane
			var missile = this.enemyMissiles[i]

			// 아군기와 적기가 발사한 총알의 충돌검사
			isOverlap = geo.rectOverlapsRect(airplane.boundingBox, missile.boundingBox)

			if(isOverlap) {
				// 생명이 남아있지 않으면 게임 종료
				if(!this.life.length){
					this.gameOver = true
					break
				}	
				
				// 아군기 폭파 애니메이션 생성
				this.addChild(Explosion(airplane.position,null,this))
			
				// 아군기 생명 감소
				this.removeChild(this.life[this.life.length-1])
				this.life = this.life.slice(0, this.life.length-1)
				
				// 아군기의 위치를 최초 위치로 변경
				airplane.position.x = -1000
				setTimeout(function () {
					airplane.position.x = 320
				}, 1000)
			}
		}

		// 게임 종료 처리
		// 아군기의 생명이 모두 다했을 때
		if (this.gameOver) {
			var sceneGameOver = new Scene()
			var layerGameOver = new Layer()
			  
			// Game Over Label 생성
			var title = new Label({string : "Game Over", fontSize:40, fontColor:"pink"})
			title.position = ccp(320,240)
			layerGameOver.addChild(title)
			  
			sceneGameOver.addChild(layerGameOver)
			
			// 회전 Scene 전환
			Director.sharedDirector.replaceScene(new nodes.TransitionRotoZoom({ duration: 1, scene: sceneGameOver }))        	
			return
		}

		// 적기를 모두 잡았을 때
		else if(!this.enemies.length) {
			var sceneGameWin = new Scene()
			var layerGameWin = new Layer()
			  
			// Yon Won Label 생성
			var title = new Label({string : "You Won", fontSize:40, fontColor:"green"})
			title.position = ccp(320,240)
			layerGameWin.addChild(title)
			  
			sceneGameWin.addChild(layerGameWin)
			
			// 슬라이드 Scene 전환
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
