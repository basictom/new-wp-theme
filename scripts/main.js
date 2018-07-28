initHeader();

var height, width;
var pos = false;
var sticky = document.getElementById('sticky-nav');

function initHeader(){
  var header = document.getElementById('header');
  height = window.innerHeight;
  // width = window.innerWidth;
  width: '%' + 100;
  header.style.height = height + 'px';
  header.style.width = width + 'px';

}

function TwoFace(id, width, height) {
    if (!(this instanceof TwoFace)) {
        return new TwoFace(id, width, height);
    }

    var canvas = document.createElement('canvas'),
        container = document.getElementById(id),
        divide = 0.5;

    this.ctx = canvas.getContext('2d');
    this.images = [];

    // Event handlers
    canvas.addEventListener('mousemove', handler, false);
    canvas.addEventListener('mousedown', handler, false);
    canvas.addEventListener('mouseup', handler, false);

    var self = this;

    function handler(ev) {
        if (ev.layerX || ev.layerX == 0) { // Firefox
            ev._x = ev.layerX;
            ev._y = ev.layerY;
        } else if (ev.offsetX || ev.offsetX == 0) { // Opera
            ev._x = ev.offsetX;
            ev._y = ev.offsetY;
        }

        var eventHandler = self[ev.type];
        if (typeof eventHandler == 'function') {
            eventHandler.call(self, ev);
        }
    }

    // Draw canvas into its container
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    container.appendChild(canvas);

    Object.defineProperty(this, 'ready', {
        get: function() {
            return this.images.length >= 2;
        }
    });

    Object.defineProperty(this, 'width', {
        get: function() {
            return width;
        }
    });

    Object.defineProperty(this, 'height', {
        get: function() {
            return height;
        }
    });

    Object.defineProperty(this, 'divide', {
        get: function() {
            return divide;
        },
        set: function(value) {
            if (value > 1) {
                value = (value / 100);
            }

            divide = value;
            this.draw();
        }
    });
}

TwoFace.prototype = {
    add: function(src) {
        var img = createImage(src, onload.bind(this));

        function onload(event) {
            this.images.push(img);

            if (this.ready) {
                this.draw();
            }
        }
    },

    draw: function() {
        if (!this.ready) {
            return;
        }

        var lastIndex = this.images.length - 1,
            before = this.images[lastIndex - 1],
            after = this.images[lastIndex];

        this.drawImages(this.ctx, before, after);
        this.drawHandle(this.ctx);
    },

    drawImages: function(ctx, before, after) {
        var split = this.divide * this.width;

        ctx.drawImage(after, 0, 0);
        ctx.drawImage(before, 0, 0, split, this.height, 0, 0, split, this.height);
    },

    drawHandle: function(ctx) {
        var split = this.divide * this.width;

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(split - 1, 0, 2, this.height);
    },

    mousedown: function(event) {
        var divide = event._x / this.width;
        this.divide = divide;

        this.dragstart = true;
    },

    mousemove: function(event) {
        if (this.dragstart === true) {
            var divide = event._x / this.width;
            this.divide = divide;
        }
    },

    mouseup: function(event) {
        var divide = event._x / this.width;
        this.divide = divide;

        this.dragstart = false;
    }
};




function createImage(src, onload) {
    var img = document.createElement('img');
    img.src = src;

    if (typeof onload == 'function') {
        img.addEventListener('load', onload);
    }

    return img;
}




var twoface = TwoFace('twoface-demo', 650, 366);
// twoface.add('http://resources3.news.com.au/images/2011/01/14/1225987/833143-wivenhoe-dam-is-near-full-on-january-2011-during-the-queensland-floods-.jpg');
twoface.add('./assets/photo_08.jpg');
twoface.add('http://fitzgeraldhomeinteriors.com/wp-content/gallery-bank/gallery-uploads/o_1c63a9fgne52jojqfc90r1qqm1i.jpg');
