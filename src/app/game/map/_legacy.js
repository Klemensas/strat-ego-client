let pos = {
  y: 0,
  x: 0
};
let screen = [800, 450];
let activeHexes = {};

const parent = document.getElementById('test');
const canvas = document.createElement('canvas');
canvas.setAttribute('id', `canvas`);
canvas.setAttribute('width', `${screen[0]}px`);
canvas.setAttribute('height', `${screen[1]}px`);
canvas.setAttribute('style', 'border: 1px solid black');
parent.appendChild(canvas);

// const ctx = canvas.getContext('2d');
// const c = new fabric.StaticCanvas('canvas')

const c = new Konva.Stage({
  container: 'test',
  width: screen[0],
  height: screen[1]
});
    const layer = new Konva.Layer();
    const interaction = new Konva.Layer();
    c.add(layer);
    // c.add(interaction);

const stage = new createjs.Stage('canvas');

setTimeout(initMap, 0, screen, pos);

function initMap(screen, pos) {
  const width = screen[0] / 9;
  const side = width / Math.sqrt(3);
  const height = 2 * side;
  const radius = width / 2;
  const aHeight = height * 0.75;
  const hexHeight = side / 2;
  const points = [
    { x: width / 2, y: 0 },
    { x: width, y: side / 2 },
    { x: width, y: height * 0.75 },
    { x: width / 2, y: height },
    { x: 0, y: height * 0.75 },
    { x: 0, y: side /2 }
  ];

  const imgs = [
    'assets/images/map/grass.png',
    'assets/images/map/grass2.png',
    'assets/images/map/grass3.png',
    'assets/images/map/grass4.png',
    'assets/images/map/grass5.png',
    'assets/images/map/grass6.png',
    'assets/images/map/grass7.png',
    'assets/images/map/restaurant.png',
  ];
  let images = [];
  imgPreload(imgs, ims => {
    images = ims;
    drawBoard(screen, pixelsToHex(pos, width, height), images)
  });


  const offset = {
    x: canvas.offsetLeft,
    y: canvas.offsetTop,
    clickX: 0,
    clickY: 0
  };
  c.content.addEventListener('mousedown', e => {
    offset.clickX = e.offsetX + offset.x;
    offset.clickY = e.offsetY + offset.y;
    // console.log(pos);
    c.content.addEventListener('mousemove', dragMap)
  });
  c.content.addEventListener('mouseout', removeDrag);
  c.content.addEventListener('mouseup', removeDrag);

  function removeDrag(e) {
    let isUpdated = false;
    const updated = {
      x: pos.x + e.clientX - offset.clickX,
      y: pos.y + e.clientY - offset.clickY,
    }
    if (Math.abs(updated.x - pos.x) > 3 || Math.abs(updated.y - pos.y) > 3) {
      pos.x += e.clientX - offset.clickX;
      pos.y += e.clientY - offset.clickY;
      isUpdated = true;
      console.log('upd')
    }
    c.content.removeEventListener('mousemove', dragMap);
    return isUpdated;
  }

  function highlightHex(ctx, hex, width, height) {
    // console.log(hex);
    const target = activeHexes[`${hex.x},${hex.y}`];
    // console.log(activeHexes, target, hex);
    ctx.beginPath();
    ctx.moveTo(target.x + radius, target.y);
    ctx.lineTo(target.x + width, target.y + hexHeight);
    ctx.lineTo(target.x + width, target.y + hexHeight + side);
    ctx.lineTo(target.x + radius, target.y + height);
    ctx.lineTo(target.x, target.y + side + hexHeight);
    ctx.lineTo(target.x, target.y + hexHeight);
    ctx.closePath();
    ctx.fill();
  }

  function drawBoard(screen, topSide, images) {
    let fillY, fillX = fillY = true;
    activeHexes = {};
    console.log('draw')
    for (let i = 0; fillY; ++i) {
      const y = i * aHeight + topSide.yOffset;
      fillY = y + aHeight < screen[1];
      fillX = true;
      for (let j = 0; fillX; ++j) {
        const offset = (i + topSide.y) % 2 * radius;
        const pos = j * width - offset + topSide.xOffset;
        const x = pos;
        fillX = x + width < screen[0];
        const xH = j + topSide.x;
        const yH = i + topSide.y;
        activeHexes[`${xH},${yH}`] = { x, y };
        drawHexagon(x, y, images[Math.round(rng(`${i + topSide.y},${j + topSide.x}`) * (images.length - 1))], xH, yH);
      }
    }
    layer.draw();
    interaction.draw();
}

  function rng(string) {
    return new Math.seedrandom(string).quick();
  }

  function drawHexagon(x, y, img, hx, hy) {
    // canvasContext.save();
    // canvasContext.beginPath();
    // canvasContext.moveTo(x + radius, y);
    // console.log(y + height / 2);
    // const hex = new createjs.Graphics.PolyStar(x + width / 2, y + height /2, side, 6, 0, -90);
    // const overlay = new createjs.Graphics.Fill('rgba(120, 100, 120, 1)');

    // const hexagon = new createjs.Shape();
    // hexagon.graphics
    //   .beginBitmapFill(img)
    //   .beginStroke("rgba(0,0,0,0.4)")
    //   .endFill()
      // .beginFill("rgba(0,0,0,0.4)")
      // .addPolyStar(x + width / 2, y + height /2, side, 6, 0, -90)
      // .appendChild(hex);
    // const overlay = hexagon.graphics.beginFill('rgba(0,0,0,0').command;
    // hexagon.graphics.append(hex);
    // overlay.style = 'rgba(0,0,0,0)';
    // const fillObj = hexagon.graphics.beginFill("red").command;
    // hexagon.graphics.drawCircle(x + width /2, y + height / 2, 10);
    //... later, we can change the color:
    // fillObj.style = "green";

    // hexagon.coords = { x: hx, y: hy };
    // hexagon.on('click', function(e) {
    //   // console.log('hex click', e.target)
    //   e.target.graphics
    //     .append(overlay)
    //     .append(hex);
    //   stage.update();
    // })
    // // hexagon.x = Math.floor(x + width / 2);
    // // hexagon.y = Math.floor(y + height / 2);
    // stage.addChild(hexagon);
    // stage.update();
    // console.log('hex')
    const parameters = {
      x: x + width / 2,
      y: y + height / 2,
      sides: 6,
      radius: side
    };
    const hexagon = new Konva.RegularPolygon(Object.assign({
      fillPatternImage: img,
      fillPatternRepeat: 'no-repeat',
      fillPatternOffset: { x: width/ 1.5, y: height / 1.75 },
      fillPatternScale: { x: 0.75, y: 0.75 },
      stroke: 'rgba(0,0,0,0.4)',
      strokeWidth: 1,
    }, parameters));
    const hexInt = new Konva.RegularPolygon(parameters);
    hexagon.on('click', e => {
      e.target.setFill('rgba(0, 255, 0, 0.2)');
      // e.target.setStrokeWidth(4);
      layer.draw();
    })
    hexagon.x = hx;
    hexagon.y = hy;
    layer.add(hexagon);
    // interaction.add(hexInt)

    // hexagon.on('click', (e) => {
    //   console.log('click', e)
    //   e.target.setFill('rgba(0,0,0,0.2)');
    //   // layer.draw();
    // });

    // canvasContext.lineTo(x + width, y + hexHeight);
    // canvasContext.lineTo(x + width, y + hexHeight + side);
    // canvasContext.lineTo(x + radius, y + height);
    // canvasContext.lineTo(x, y + side + hexHeight);
    // canvasContext.lineTo(x, y + hexHeight);
    // canvasContext.closePath();
    // canvasContext.clip();
    // canvasContext.drawImage(img, x, y, width, height);
    // canvasContext.restore();
    // canvasContext.stroke();
    // canvasContext.fillText(`${hx},${hy}`, x + width / 2 - 15, y + height / 2 + 5);
  }

  function accurateHex(pos, width, height) {
    const y1 = pos.y / height;
    const y = y1 + 0.25 * Math.floor(pos.y / (height * 0.75) - 0.25);
    const offset = Math.floor(y) % 2 * (width / 2);
    const x = (pos.x + offset) / width;
    const yFloat = y % 1
    if (yFloat >= 0.75) {

    } else if (yFloat <= 0.25) {
      console.log('probleme')
    }
    console.log(y, x)
    return {
      x: Math.floor((pos.x  + offset) / width),
      y: Math.floor(y)
    }
  }

  function pixelsToHex(pos, width, height) {
    let yHex = pos.y / height;
    yHex += 0.25 * Math.floor(pos.y / (height * 0.75) - 0.25);
    const xHex = pos.x / width;
    const x = Math.floor(xHex);
    const y = Math.floor(yHex);
    let yOffset = - (yHex % 1) * height;
    if (yHex < 0) {
      yOffset -= 1 * height;
    }
    return {
      y,
      x,
      yOffset,
      xOffset: - (xHex % 1) * width,
    }
  }

  function dragMap(e) {
    e.preventDefault();
    const l = {
      x: pos.x + e.clientX - offset.clickX,
      y: pos.y + e.clientY - offset.clickY
    };
    if (Math.abs(l.x - pos.x) < 3 || Math.abs(l.y - pos.y) < 3) {
      return;
    }
    layer.children.length = 0;
    drawBoard(screen, pixelsToHex(l, width, height), images)
  }
}
