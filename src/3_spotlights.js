export default function sketch (p) {
  let num = 255;
  let snum = 3;
  let x = new Array(snum);
  let y = new Array(snum);
  let head = 0;
  let p0x = new Array(snum);
  let p1x = new Array(snum);
  let p2x = new Array(snum);
  let p3x = new Array(snum);
  let p0y = new Array(snum);
  let p1y = new Array(snum);
  let p2y = new Array(snum);
  let p3y = new Array(snum);
  let t;

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(247, 199, 126);
    p.blendMode(p.ADD);
    p.noStroke();

    p.randomSeed(99);

    for(var i = 0; i < snum; i++) {
      p0x[i] = p.max(p.width/20, p.random(0, i+1) * p.random(p.width/4,p.width/3));
      p1x[i] = p.max(p.width/20, p.random(0, i+1) * p.random(p.width/5,p.width/4));
      p2x[i] = p.max(p.width/20, p.random(0, i+1) * p.random(p.width/5,p.width/3));
      p3x[i] = p.max(p.width/20, p.random(0, i+1) * p.random(p.width/5,p.width/4));

      p0y[i] = p.random(3*p.height/5, 7*p.height/8);
      p1y[i] = p.random(2*p.height/5, 7*p.height/8);
      p2y[i] = p.random(2*p.height/5, 7*p.height/8);
      p3y[i] = p.random(3*p.height/5, 7*p.height/8);

      x[i] = new Array(num);
      y[i] = new Array(num);
    }

    t = 0.0;
    for(var j = 0; j < snum; j++) {
    	for(var i = 0; i < num; i++) {
        x[j][i] = p.bezierPoint(p0x[j],p1x[j],p2x[j],p3x[j],t);
        y[j][i] = p.bezierPoint(p0y[j],p1y[j],p2y[j],p3y[j],t);
      }
      t+=0.005;
    }
    head = num-1;
  };


  p.draw = function () {
    console.log('drawing');
    var x_arr = x;
    console.log(x);
    p.clear();
    p.background(226, 191, 138);

    for(var j = 0; j < snum; j++) {
      var r = 0.9 + 0.2 * Math.cos(2*3.1415*2.0*(1+0.1*j) / snum);
      var g = 0.7 + 0.2 * Math.cos(2*3.1415*2.0*(1+0.1*j) / snum+0.25);
      var b = 0.55 + 0.2 * Math.cos(2*3.1415*2.0*(1+0.1*j) / snum);

      var pt = head;
      var f = 5;
      var size = 280;
      for(var i = 0; i < num; i++) {
        p.fill(f*r, f*g, f*b, 120);
        f -= 0.1/6.0;
        pt -= 1;
        size -= 0.9;
        if(pt < 0) pt = num;

        p.ellipse(x[j][pt],y[j][pt],size*p.pow(0.9,j*2),size*p.pow(0.9,j*2));

      }
      pt += 1;
    }

    head += 1;
    head = head % num;

    if(t<1.0) {

      for(var l = 0; l < snum; l++) {
        x[l][head] = p.bezierPoint(p0x[l],p1x[l],p2x[l],p3x[l],t);
        y[l][head] = p.bezierPoint(p0y[l],p1y[l],p2y[l],p3y[l],t);
      }

    } else {

      t -= 1.0;

      for(var m = 0; m < snum; m++) {

        p0x[m] = p3x[m];
        p1x[m] = 1.4*p3x[m] - p2x[m];
        p2x[m] = p.random(p.width/6,2*p.width/5);
        p3x[m] = p.random(p.width/8,3*p.width/5);

        p0y[m] = p3y[m];
        p1y[m] = 2*p3y[m] - p2y[m];
        p2y[m] = p.random(2*p.height/5,4*p.height/5);
        p3y[m] = p.random(3*p.height/5,4*p.height/5);

        x[m][head] = p0x[m];
        y[m][head] = p0y[m];

      }

    }
    t += 0.005;
  };
};
