(function () {
  var SEPARATION_DISTANCE = 35;
  var CONNECTION = 3;
  var INNER_CIRCLE_DISTANCE = 3000;
  var INNER_CIRCLE_ALPHA = 0.4;
  var INNER_LINE_ALPHA = 0.2;
  var MID_CIRCLE_DISTANCE = 8000;
  var MID_CIRCLE_ALPHA = 0.2;
  var MID_LINE_ALPHA = 0.1;
  var OUTER_CIRCLE_DISTANCE = 40000;
  var OUTER_CIRCLE_ALPHA = 0.1;
  var OUTER_LINE_ALPHA = 0.02;
  var CIRCLE_COLOR = '236,190,118';
  var LINE_COLOR = '236,190,118';
  var STEP_MOVEMENT_DISTANCE = 100;

  var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;


  // const getTarget = () => document.getElementById('hero')
  const getTarget = () => document.getElementById('particle-canvas')

  if (createCanvas()) {
    initHeader();
    initAnimation();
    addListeners();
  }

  function createCanvas() {
    const el = document.createElement('canvas')
    el.id = 'particle-canvas'
    const elStyle = {
      position: 'absolute',
      left: '0',
      top: '0',
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none'
    }
    Object.entries(elStyle).forEach(([attr, val]) => (el.style[attr] = val))
    const hero = document.getElementById('hero')
    if (hero) {
      const container = hero.getElementsByClassName('container')[0]
      hero.insertBefore(el, container)
      return true
    } else {
      return false
    }
  }

  function initHeader() {
    const top = window.getComputedStyle(document.getElementById('navbar-main')).height.replace('px', '')
    width = window.getComputedStyle(getTarget()).width.replace('px', '');
    height = window.getComputedStyle(getTarget()).height.replace('px', '');
    // console.log(window.getComputedStyle(document.getElementById('home')))
    target = {x: width / 2, y: height / 2};

    canvas = document.getElementById('particle-canvas');
    canvas.style.top = `-${top}px`
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext('2d');

    initPoints();
  }

  function initPoints() {
    // create points
    points = [];
    for (var x = 0; x < width; x = x + SEPARATION_DISTANCE) {
      for (var y = 0; y < height; y = y + SEPARATION_DISTANCE) {
        var px = x + Math.random() * SEPARATION_DISTANCE;
        var py = y + Math.random() * SEPARATION_DISTANCE;
        var p = {x: px, originX: px, y: py, originY: py};
        points.push(p);
      }
    }

    // for each point find the closest points to connect
    for (var i = 0; i < points.length; i++) {
      var closest = [];
      var p1 = points[i];
      for (var j = 0; j < points.length; j++) {
        var p2 = points[j]
        if (!(p1 === p2)) {
          var placed = false;
          for (var k = 0; k < CONNECTION; k++) {
            if (!placed) {
              if (closest[k] === undefined) {
                closest[k] = p2;
                placed = true;
              }
            }
          }

          for (var k = 0; k < CONNECTION; k++) {
            if (!placed) {
              if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                closest[k] = p2;
                placed = true;
              }
            }
          }
        }
      }
      p1.closest = closest;
    }

    // assign a circle to each point
    for (var i in points) {
      var c = new Circle(points[i], 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
      points[i].circle = c;
    }
  }

  // Event handling
  function addListeners() {
    if (!('ontouchstart' in window)) {
      window.addEventListener('mousemove', mouseMove);
    }
    window.addEventListener('scroll', scrollCheck);
    window.addEventListener('resize', resize);
  }

  function mouseMove(e) {
    var posx = posy = 0;
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    target.x = posx;
    target.y = posy;
  }

  function scrollCheck() {
    if (document.body.scrollTop > height) animateHeader = false;
    else animateHeader = true;
  }

  function resize() {
    const top = window.getComputedStyle(document.getElementById('navbar-main')).height.replace('px', '')
    width = window.getComputedStyle(getTarget()).width.replace('px', '');
    height = window.getComputedStyle(getTarget()).height.replace('px', '');
    canvas.style.top = `-${top}px`
    canvas.width = width;
    canvas.height = height;
    initPoints();
    initAnimation();
  }

  // animation
  function initAnimation() {
    animate();
    for (var i in points) {
      shiftPoint(points[i]);
    }
  }

  function animate() {
    if (animateHeader) {
      ctx.clearRect(0, 0, width, height);
      for (var i in points) {
        // detect points in range
        if (Math.abs(getDistance(target, points[i])) < INNER_CIRCLE_DISTANCE) {
          points[i].active = INNER_LINE_ALPHA;
          points[i].circle.active = INNER_CIRCLE_ALPHA;
        } else if (Math.abs(getDistance(target, points[i])) < MID_CIRCLE_DISTANCE) {
          points[i].active = MID_LINE_ALPHA;
          points[i].circle.active = MID_CIRCLE_ALPHA;
        } else if (Math.abs(getDistance(target, points[i])) < OUTER_CIRCLE_DISTANCE) {
          points[i].active = OUTER_LINE_ALPHA;
          points[i].circle.active = OUTER_CIRCLE_ALPHA;
        } else {
          points[i].active = 0;
          points[i].circle.active = 0;
        }

        drawLines(points[i]);
        points[i].circle.draw();
      }
    }
    requestAnimationFrame(animate);
  }

  function shiftPoint(p) {
    TweenLite.to(p, 1 + 1 * Math.random(), {
      x: p.originX - STEP_MOVEMENT_DISTANCE / 2 + Math.random() * STEP_MOVEMENT_DISTANCE,
      y: p.originY - STEP_MOVEMENT_DISTANCE / 2 + Math.random() * STEP_MOVEMENT_DISTANCE, ease: Circ.easeInOut,
      onComplete: function () {
        shiftPoint(p);
      }
    });
  }

  // Canvas manipulation
  function drawLines(p) {
    if (!p.active) return;
    for (var i in p.closest) {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.closest[i].x, p.closest[i].y);
      ctx.strokeStyle = 'rgba(' + LINE_COLOR + ',' + p.active + ')';
      ctx.stroke();
    }
  }

  function Circle(pos, rad, color) {
    var _this = this;

    // constructor
    (function () {
      _this.pos = pos || null;
      _this.radius = rad || null;
      _this.color = color || null;
    })();

    this.draw = function () {
      if (!_this.active) return;
      ctx.beginPath();
      ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'rgba(' + CIRCLE_COLOR + ',' + _this.active + ')';
      ctx.fill();
    };
  }

  // Util
  function getDistance(p1, p2) {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
  }

})();
