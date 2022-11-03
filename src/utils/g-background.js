import { Canvas, CanvasEvent, Path } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';

export const DefaultPathStyle = {
  lineWidth: 4,
  lineJoin: 'round',
  stroke: '#54BECC',
  shadowColor: '#54BECC',
  shadowBlur: 24,
};

// G 是异步绘制
export const createBackgroundByG = async ({
  width = 300,
  height = 300,
  pathStyle = {},
  corner = ['left-top', 'left-bottom'],
  cornerOffset = 20,
}) => {
  return new Promise((resolve) => {
    let canvas;
    let canvasBox;
    let pathShape;
    const createOffScreenBox = () => {
      canvasBox = document.createElement('div');
      canvasBox.style.width = width + 'px';
      canvasBox.style.height = height + 'px';
      canvasBox.style.position = 'absolute';
      canvasBox.style.zIndex = -1;
      canvasBox.style.visibility = 'hidden';
      document.body.appendChild(canvasBox);
    };

    const style = { ...DefaultPathStyle, ...pathStyle };

    const { lineWidth = 2 } = style;
    const getCornerPath = (corner) => {
      switch (corner) {
        case 'left-top':
          return [
            ['L', lineWidth, lineWidth + cornerOffset],
            ['L', lineWidth + cornerOffset, lineWidth],
          ];
        case 'right-top':
          return [
            ['L', width - lineWidth - cornerOffset, lineWidth],
            ['L', width - lineWidth, lineWidth + cornerOffset],
          ];
        case 'right-bottom':
          return [
            ['L', width - lineWidth, height - lineWidth - cornerOffset],
            ['L', width - lineWidth - cornerOffset, height - lineWidth],
          ];
        case 'left-bottom':
          return [
            ['L', lineWidth + cornerOffset, height - lineWidth],
            ['L', lineWidth, height - lineWidth - cornerOffset],
          ];
        default:
          return [];
      }
    };

    const getPath = () => {
      let paths = [];
      if (corner.includes('left-top')) {
        paths.push(['M', lineWidth + cornerOffset, lineWidth]);
      } else {
        paths.push(['M', lineWidth, lineWidth]);
      }
      if (corner.includes('right-top')) {
        paths = paths.concat(getCornerPath('right-top'));
      } else {
        paths.push(['L', width - lineWidth, lineWidth]);
      }
      if (corner.includes('right-bottom')) {
        paths = paths.concat(getCornerPath('right-bottom'));
      } else {
        paths.push(['L', width - lineWidth, height - lineWidth]);
      }
      if (corner.includes('left-bottom')) {
        paths = paths.concat(getCornerPath('left-bottom'));
      } else {
        paths.push(['L', lineWidth, height - lineWidth]);
      }
      if (corner.includes('left-top')) {
        paths = paths.concat(getCornerPath('left-top'));
      }
      paths.push(['Z']);
      return paths;
    };

    const createPath = () => {
      const path = getPath(width, height);
      pathShape = new Path({
        style: {
          path,
          ...style,
        },
      });
      canvas.appendChild(pathShape);
    };

    const getBase64Data = () => {
      const base64Data = canvasBox
        .getElementsByTagName('canvas')[0]
        .toDataURL();
      document.body.removeChild(canvasBox);
      return base64Data;
    };

    const initCanvas = () => {
      const canvasRenderer = new CanvasRenderer();
      canvas = new Canvas({
        container: canvasBox,
        width,
        height,
        devicePixelRatio: 2,
        renderer: canvasRenderer,
      });
      canvas.addEventListener(CanvasEvent.READY, () => {
        resolve(getBase64Data());
      });
    };

    createOffScreenBox();
    initCanvas();
    createPath();
  });
};
