export class SpecialEffects {
  constructor(canvas) {
    this.context = canvas.getContext('2d');
  }

  drawStar(x, y, r, p, m){
    this.context.save();
    this.context.beginPath();
    this.context.translate(x, y);
    this.context.moveTo(0,0-r);
    for (var i = 0; i < p; i++)
    {
        this.context.rotate(Math.PI / p);
        this.context.lineTo(0, 0 - (r*m));
        this.context.rotate(Math.PI / p);
        this.context.lineTo(0, 0 - r);
    }
    this.context.fillStyle = '#ffff1a';
    this.context.shadowColor = '#ffff00';
    this.context.shadowBlur = 40;
    this.context.fill();
    this.context.restore();
  }

  drawLightning() {
    let size = 500;

    let center = {x: size / 2, y: 20};
    let minSegmentHeight = 5;
    let groundHeight = size - 20;
    let color = "hsl(180, 80%, 80%)";
    let roughness = 2;
    let maxDifference = size / 5;

    ctx.globalCompositeOperation = "lighter";

    ctx.strokeStyle = color;
    ctx.shadowColor = color;

    ctx.fillStyle = color;
    // ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "hsla(0, 0%, 10%, 0.2)";

    function render() {
      ctx.shadowBlur = 0;
      ctx.globalCompositeOperation = "source-over";
      ctx.fillRect(0, 0, size, size);
      ctx.globalCompositeOperation = "lighter";
      ctx.shadowBlur = 15;
      let lightning = createLightning();
      ctx.beginPath();
      for (let i = 0; i < lightning.length; i++) {
        ctx.lineTo(lightning[i].x, lightning[i].y);
      }
      ctx.stroke();
      requestAnimationFrame(render);
    }

    function createLightning(start,end) {
      let dx = Math.abs(start.x - end.x);
      let dy = Math.abs(start.y - end.y);
      if(dy>dx) {

      }
      let segmentHeight = groundHeight - center.y;
      let lightning = [];
      lightning.push({x: center.x, y: center.y});
      lightning.push({x: Math.random() * (size - 100) + 50, y: groundHeight + (Math.random() - 0.9) * 50});
      let currDiff = maxDifference;
      while (segmentHeight > minSegmentHeight) {
        let newSegments = [];
        for (let i = 0; i < lightning.length - 1; i++) {
          let start = lightning[i];
          let end = lightning[i + 1];
          let midX = (start.x + end.x) / 2;
          let newX = midX + (Math.random() * 2 - 1) * currDiff;
          newSegments.push(start, {x: newX, y: (start.y + end.y) / 2});
        }

        newSegments.push(lightning.pop());
        lightning = newSegments;

        currDiff /= roughness;
        segmentHeight /= 2;
      }
      return lightning;
    }

  }

  clearEffects() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

}
