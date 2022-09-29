/**
 * p5.Play Instance Mode Example (v1.0.1)
 * GoToLoop (2019-Apr-04)
 *
 * https://GitHub.com/molleindustria/p5.play/issues/12
 * https://Bl.ocks.org/GoSubRoutine/cf739128f389766f5d9cb631c9c358a6
 */

 "use strict";

 new p5(p => {
   let bg, sprite;
 
   p.setup = function () {
    console.log(p)
     p.createCanvas(800, 600)
    //  p.mousePressed(reset);
     bg = p.color(0o350);
     sprite = p.createSprite(p.width>>1, p.height>>1, 0o100, 0o100);
     reset();
   };
 
   p.draw = function () {
     p.background(bg);
     bounce();
     p.drawSprites();
   };
 
   function reset() {
     sprite.setVelocity(p.random(-5, 5), p.random(-5, 5));
     sprite.shapeColor = p.color('#' + p.hex(~~p.random(0x1000), 3));
   }
 
   function bounce() {
     const { position: { x, y }, width: w, height: h } = sprite,
           ww = w >> 1, hh = h >> 1;
 
     if (x < ww || x + ww >= p.width)   sprite.velocity.x *= -1;
     if (y < hh || y + hh >= p.height)  sprite.velocity.y *= -1;
   }
 });