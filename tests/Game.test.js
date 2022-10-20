import p5 from 'p5';
import { Board } from '../src/modules/Board';
import { Timer } from '../src/modules/Timer';
import { Score } from '../src/modules/Score';
import { Game } from '../src/modules/Game';

// the problem is that we need to pass in the setup, draw, etc functions on instantiation
// but our modules require an instance to be passed in before they can do their thing
// classic chicken and egg
// we can pass in the functions that call GameManager.setup()
// and gameManager.draw (or mouseclicked)
// and that object does something dumb until the modules are ready
// then it works as prescribed
/**
 * for example
 * 
 * p.draw = function () {
    windowSize = getWindow();
    p.background(0);

    // Game manager will TRY to draw, if all of the modules are ready
    // but ignore this call if they're not
    
    GameManager.draw(windowSize.w, windowSize.h)
  };
 * 
 */
  function getWindow() {
    let w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight || e.clientHeight || g.clientHeight;
    return { w: x, h: y };
  }

const GM = {
    setup : () => {
        // game.splitCards(p);
    },
    draw : () => {
        /*
        
      */
    },
    preload : ()=> {},
    mouseClicked : (x, y)=>{
    //   game.updateTopDisplay(x, y);
    //   board.chooseCol(y, p, game.recentMoves);
    }
}
const p = new p5(p => {
    p.preload = function preload() {
        //   game.load(p);
        GM.preload(p)
    };
  
    p.setup = function setup() {
      const windowSize = getWindow();
      p.createCanvas(windowSize.w, windowSize.h);
      GM.setup(p, windowSize)
    //   game.splitCards(p);
    };
  
    p.draw = function () {
      windowSize = getWindow();
      p.background(0);
      GM.draw()
    };
  
    p.mouseClicked = function mouseClicked() {
        GM.mouseClicked(p.mouseX, p.mouseY)
    };
  });

// now we have a p5 instance
// now we instantiate
let s = new Score(p);
let t = new Timer(p);
let b = new Board(p, t);

const game = new Game(p, b, s, t);

// NOW we can replace the function in GM

GM.setup = function(){} // this one doesn't make sense since it's only called once - so GM has to remember what was passed in
GM.draw = function(){
    t.drawTimer(windowSize.w, windowSize.h);
    game.timerTrigger();
    t.drawSeconds(windowSize.w, windowSize.h);

    if (p.frameCount % 60 == 0) { //seems to be 60 fps?
      t.countDown();
    }
    game.staticRender(windowSize.w, windowSize.h); 
}
GM.mouseClicked = function(x, y){
    game.updateTopDisplay(x, y);
    b.chooseCol(y, game.recentMoves);
}

try{
    test('Check deck length', () => {
        game.load()
        expect(game.deck.length).toEqual(52);
    });
}catch(e){
    console.log("caught it")
}
