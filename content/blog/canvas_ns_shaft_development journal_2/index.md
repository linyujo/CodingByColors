---
id: 20200512A
slug: /canvas_ns_shaft_development journal_2
subject: canvas
title: 小朋友下樓梯開發紀錄 2
date: 2020-05-12T18:00:00.000Z
description: Document the proccess of making a replica NS-Shaft(so-called "Children Go Down the Stairs") by HTML5 canvas. This article focused primarily on how to animate a sprite on canvas, then embed one canvas into another.
tags:
 - canvas
headerImage: "https://imgur.com/Aeyq6Om.jpg"
templateKey: blog-post
---
> Photo by <a href="https://unsplash.com/@craig000?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Riccardo Pelati</a> on <a href="https://unsplash.com/s/photos/stairs?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

## Character Animation
The critical point of animating a small object is "animate the motion individually with another canvas or SVG," especially when the objective is running with a slower or higher FPS. No matter which method you choose, after the animation is created, we could use the canvas context mothed "drawImage" to embed the image into the game.

### Sprite
Prepare a sprite sheet. The figure below is a sprite that shows a character running from left to right.

![](https://i.imgur.com/2xi37qi.png)

Next, we need the width of each posture and measure the x-axis to reach the frame. Generally speaking, each frame would have the same width.

```
Frame 1:
width: 80
height: 86
x-axis: 0

Frame 2:
width: 80
height: 86
x-axis: 80

Frame 3:
width: 80
height: 86
x-axis: 160
```

### Sprite Animate Factory

I created an [example](https://codesandbox.io/s/quizzical-darkness-ynluo?file=/src/index.js) on the codesandbox website.

In the beginning, there is a canvas with the id "runningRight" in HTML.

```html
<canvas id="runningRight"></canvas>
```

In JavaScript, we get the canvas node by "getElementById."
```javascript
const nodeRunning = document.getElementById("runningRight");
```

Next, I created a factory to generate the motion.
```javascript
class PlayerAction {
  constructor(args){
  
  }
  init = () => {
  
  }
  render = () => {
  
  }
}
```

There are two functions inside the class besides the constructor.
The init function prepares the sprite sheet and the canvas context.
The render function calls itself continuously to draw the sequent frame.

#### The init function

Some data should be saved in the factory, the sprite image,  the width and height of each frame, etc.

```javascript
constructor(args) {
	img: null,
	imgSrc: "",
	width: 80,
	height: 86,
	// ...
}
```

In the init function, I kept the canvas context and the sprite sheet image. After everything was prepared, I called the `window.requestAnimationFrame` to perform the animation.

```javascript
init = () => {
	// set width and height of canvas
	this.node.width = this.width;
	this.node.height = this.height;
	
	// get the canvas context
	this.ctx = this.node.getContext("2d");

	// keep the image
	this.img = new Image();
	this.img.src = this.imgSrc;

	// start render
	requestAnimationFrame(this.render);
};
```

#### The render function

`drawImage()` is a canvas API that can be used to do dynamic image compositing. It lets us cut out a section of the source image, then scale and draw it on our canvas.

`drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)`

![](https://i.imgur.com/TfDF9sp.jpg)

The code below shows how I sliced the first frame of the sprite sheet.

```javascript
ctx.drawImage(
	this.img, // image
	0, // source image sx
	0, // source image sy
	this.width, // source image width: 80
	this.height, // source image height: 86
	0, // destination canvas dx
	0, // destination canvas dy
	this.width, // destination canvas width: 80
	this.height // destination canvas height: 86
);
```

As I mentioned above, the sprite sheet distance from the left to the target frame should be stored. I kept the distance in the constructor.

The current frame should be saved, as well. The sequent posture would be rendered by looping from frame one to frame six infinitely.

```javascript
constructor(args){
	// ...
	// the array of source image sx
	posIndexes: [0, 80, 160, 240, 320, 400],
	// the next frame would be currentPos++
	currentPos: 0,
	// ...
}
```
```javascript
render = () => {
	ctx.drawImage(
		this.img,
		posIndexes[currentPos],
		0,
		this.width,
		this.height,
		0,
		0,
		this.width,
		this.height
	);
		// the next frame
	this.currentPos++;
	
	const lastPos = posIndexes.length - 1;
	if (currentPos === lastPos) {
		// if the last last frame is done, start from the first frame
		this.currentPos = 0;
	}
	
	requestAnimationFrame(this.render);
}
```

Do not forget to clear the previous frame before drawing the next frame.

```javascript
// clear previous image
ctx.clearRect(0, 0, width, height);
ctx.drawImage(
    ...
);
```

Thus, we would get the following code to draw all movements.

```javascript
render = () => {
	const {
		ctx,
		width,
		height,
		img,
		posIndexes,
		currentPos
	} = this;
	
	ctx.drawImage(
		img,
		posIndexes[currentPos],
		0,
		width,
		height,
		0,
		0,
		width,
		height
	);
	
	// the next frame
	this.currentPos++;
	
	const lastPos = posIndexes.length - 1;
	if (currentPos === lastPos) {
		// if the last last frame is done, start from the first frame
		this.currentPos = 0;
	}
	
	requestAnimationFrame(this.render);
}
```

However,  you might find out that the character is running with insane speed. We need to slow it down naturally.

![](https://i.imgur.com/5xIrmn2.gif)

There are many ways to defer the animation. The way I have done was to set a counter.
If the count was less than a certain number, then returned. Else the counter would be reset to zero.

```javascript
constructor(args){
	// ...,
	frameCount: 0,
	frameCountDelay: 8
}
render = () => {
	// slow down the running speed
	this.frameCount++;
	if (frameCount < frameCountDelay) {
		requestAnimationFrame(this.render);
		return;
	}
	this.frameCount = 0;
}
```

So far, the single-movement animation finished. The full code follows.
<iframe
     src="https://codesandbox.io/embed/quizzical-darkness-ynluo?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="quizzical-darkness-ynluo"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

### Embed

The following will focus on how to embed the running movement into the game.

In the previous chapter, I provided the code of rendering different movements to the corresponding situations.

```javascript
class Player {
	init = () => {
		// init player actions
	}
	update = () => {
		// leA
	}
	render = () => {
		// draw different movements
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
At first, I created movements by the `PlayerAction()` custructor. Characters had different actions, such as jumping and running. So I added a running-right movement to each character.

```javascript
const characterOne = {};
```

```javascript
characterOne.runningRight = document.createElement("canvas");
const runningRightAction = new PlayerAction({
	node: characterOne.runningRight
	imgSrc: require("@/assets/player1/runningRight.png")
});
runningRightAction.init();
```

Similarly, a running-left movement should be added as well. You can flip the sprite sheet horizontally by any of the online tools.

```javascript
characterOne.runningLeft = document.createElement("canvas");
const runningLeftAction = new PlayerAction({
	node: characterOne.runningLeft
	imgSrc: require("@/assets/player1/runningLeft.png")
});
runningLeftAction.init();
```
After generating the movements, let us back to the class *Player*.

Assume that the player is now running on the stair. Through the "if/else" condition, the execution will dive into `this.run()` function.

```javascript
run = () => {
	let running = direction ? characterOne.runningRight : characterOne.runningLeft;
	ctx.drawImage(
		running,
		0,
		0,
		width,
		height,
		destination.x,
		destination.y,
		width,
		height
	);
}
```

As the code above, the function drawImage could be spotted quickly. This canvas API can use any of the following data types as an image source.
* Any `<img>` Element as well as those images created by the `Image()` custructor.
* SVG `<image>` Element
* A frame grabbed from `<video>` Element
* **Another `<canvas>` Element**

Yes, we can embed another `<canvas>` image into the current canvas. Therefore, we can easily use the `drawImage()` function to lay the character movement on the destination we want.

## Summary
The canvas API` drawImage()` is a useful tool to create canvas animation. It can generate a sprite sheet animation and frame images on composite canvas.
Creating the movement individually with another canvas helps us to manage multiple actions easier.