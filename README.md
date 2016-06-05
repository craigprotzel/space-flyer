SPACE-FLYER
===========

####Built with:
* [p5JS](http://p5js.org/download/)
* [p5.play](http://p5play.molleindustria.org/)

####Setup:
* Download an IDE such as [Sublime Text](http://www.sublimetext.com/3)
* Create initial file structure
	* download this github repo
	* copy the 'space_flyer_start' folder

#####Coding Steps:
* Create page layout
	* create p5 canvas
	* add game title to the page

* Create player
	* create a sprite
	* call drawSprites() method inside draw() method
	* add movement with keyDown() method
	* add 'check edges' logic

* Create board
	* create a group
	* create sprites for the board
	* add sprites to the group

* Add collision detection

* Add game mechanics
	* add timer logic
	* add win/lose logic
	* add restart logic

* Extra
	* use a [local host](https://github.com/processing/p5.js/wiki/Local-server) to serve the sketch
	* add an image for the player character
	* add sound
	* add speech