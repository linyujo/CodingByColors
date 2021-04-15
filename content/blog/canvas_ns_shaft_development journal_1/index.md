---
id: 20200407A
slug: /canvas_ns_shaft_development journal_1
subject: canvas
title: 小朋友下樓梯開發紀錄 1
date: 2020-04-07T18:00:00.000Z
description: Document the proccess of making a replica NS-Shaft(so-called "Children Go Down the Stairs") by HTML5 canvas. The first article mainly focus on the lifecycle of rendering and how I created elements by JS classes.
tags:
 - canvas
headerImage: "https://imgur.com/Aeyq6Om.jpg"
templateKey: blog-post
---
> Photo by <a href="https://unsplash.com/@craig000?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Riccardo Pelati</a> on <a href="https://unsplash.com/s/photos/stairs?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

## 前言
First of all, thanks to teacher 吳哲宇 for making the course of [動畫互動網頁特效入門](https://hahow.in/courses/586fae97a8aae907000ce721/discussions?item=5a1e1755a2c4b000589dda3b)。

JavaScript has become the programming language of everything. While looking at the job market, you might find that the roles of 'Front-end Developers' are vastly different.
1. Build B2B web products for automated production service among industries. In this area, 80% of your time is dealing with data and forms.
2. Be a full stack developer forced by your company. (60% front-end plus 40% back-end or vise versa.)
3. Master in HTML5 audio and video.
4. Build cross-platform mobile apps with react-native or Ionic. But you should at least familiar with one native ecosystem - ios or android.
5. Build interaction websites. CSS/SVG/canvas/webgl focused.

As a ~~woman~~ who loves beautiful things, I like to build fancy websites and much appreciate designer's work. However,  as I know the job market better, I realized 80% of job demands are type 1 and 2  above-mentioned. The need for the rest might less than 20%. Such an intervallic demand ratio might be normality, not only Taiwan but all over the world, otherwise the well-known "[web developer road map](https://github.com/kamranahmedse/developer-roadmap)" would not be taken as a standard of front-end skill-map.


After following the "road map" for three years, I do not give up the path to beautiful and interactive websites. I started to learn Vue but scoped out another new field - canvas, at the same time.

## Structure
![](https://i.imgur.com/qZiJkH1.png)
In the beginning, I created two objects - a canvas object and a game object.

Both of them had three critical functions - initialize, update, and render. Just like those front-end frameworks, everything would initialize at first, then draw the picture and update data.

### Canvas object
```javascript
class Canvas {
	init = () => {
		// 1. use the new operator to create an instance of Game
		this.game = new Game();
		this.game.init();
		// 2. draw the big picture
		requestAnimationFrame(this.render);
		// 3. update data
		setInterval(this.update, 1000 / this.fps);
	}
	update = () => {
		// call game.update
		this.game.update();
	}
	render = () => {
		// 1. remove all
		ctx.clearRect();
		// 2. call game.update to draw the new frame
		this.game.render();
	}
}
```
Create an instance of the Game object, and initialize all the data I need at the init stage. Meanwhile, render the big
picture and update data continuously.

### Game Object
![](https://i.imgur.com/g5SKx2o.png)

#### Initialize
There would be one or two players in the game. In this stage, players' default data, such as which character should be controlled by whom, would be determined. Besides,  I  randomly created different types of stairs and their coordinates.

#### Update
The stairs would ascend continuously and should be destroyed as they leave the game area.

The coordinates of the players were much more complicated. I captured the keyboard event from the player to decide each character's movement and determined the character's reaction with different types of stairs. For instance, hurt or bounce.

#### Render
The so-called "render" means "draw what you want to see." You shouldn't update any data at this stage.

As the data of the players and the stairs update continuously, I would keep rendering by removing everything that presented milliseconds ago and draw the new state of objects.

The most challenging part of my personal view was sculpturing a shaped object by JS. It requires knowledge of computer graphics and keeps translate the painting point. If the result was not what you expect without any error message, you must feel frustrated while debugging.

```javascript
class Game {
	init = () => {
		// initialize players
		this.createPlayers();
		// initialize stairs
		this.createStairs();
	}
	update = () => {
		// update stair position and create new stairs
		this.updateStairs();
		// update players
		this.updatePlayers();
	}
	render = () => {
		// draw players
		this.renderPlayers();
		// draw stairs
		this.renderStairs();
		// draw player HP
		this.renderPlayerHP();
		// draw the blades on the roof
		this.renderRoofBlade();
	}
	willUnmount = () => {
		// stop the game
		this.isPlaying = false;
	}
}
```
#### WillUnmount

At this stage, I stopped updating all the data and removed the event listeners.

### Stair Object
![](https://i.imgur.com/ppJJZKM.png)

Every stair was an instance of the Stair object. By using the "new" operator and setting custom properties, each stair had its type and reaction.

All the stairs had two things in common: they went up by constant velocity(~~you could custom its speed of course~~) and marked as inactive while leaving the game. I modified these commonalities in the update stage.

In the render stage, the appearance of each stair customed by switching the stair type property.

```javascript
class Stair {
	update = () => {
		// 1. keeps constant upward velocity
		// 2. mark as inactive if the stair leaves the game area
	}
	render = () => {
		// draw presence
		switch (type) {
			case "normal":
				this.renderNormal();
				break;
			case "blade":
				this.renderBlade();
				break;
			case "jump":
				this.renderJump();
				break;
			case "fade":
				this.renderFade();
				break;
			case "slideLeft":
				this.renderSlide();
				break;
			case "slideRight":
				this.renderSlide();
				break;
			default:
				break;
		}
	}
}
```
### Character Object
![](https://i.imgur.com/k16EAuM.png)

There were two players in the game.
The player would have various reactions with the stair and keeps changing their position.

```javascript
class Player {
	init = () => {
		// init player actions
	}
	update = () => {
		// leA
	}
	render = () => {
		// draw different actions
		if (isHurt) {
			// hurt
			this.hurt();
			return;
		}
		if (!isStepOnStair) {
			// jump
			this.jump();
		} else {
			if (isRunning) {
				// run
				this.run();
			} else {
				// stand
				this.stand();
			}
		}
	}
}
```
#### Initialize
Initialize the character movement animation by character ID.
I will go further in the next chapter.

#### Update
The character would get gravity as she leaves the stair.

I decided whether the character was on the stair by calculating the character's coordination with the border of each stair. There were at most 6 or 7 stairs at the same time, so I measured with for-loop.

#### Render
Default character movements were hurt, jump, run, and stand. By if/else statement, the specified actions would be rendered.

Next chapter, I will focus on how to draw character motions, and embed each movement to one canvas.

### Summary

The image below is the whole structure of the game "Down Stairs."

![](https://i.imgur.com/fWP0UnH.png)

The life cycle - **initialize**, **update**, and **render** could apply to all the objects with a maintainable structure.