import G6 from '@antv/g6';
import * as G2 from '@antv/g2/lib';
// import * as G2 from '@antv/g2';
import {
  WordCloudData,
  SkillsData,
  RelationData,
  RadarData,
} from './mock-data';
import { ThemeColor10 } from 'src/constants';

export const renderRadar = ({ container, width, height }) => {
  const chart = new G2.Chart({
    container,
    width,
    height,
    theme: 'classic',
  });

  const encode = (node) => node.encode('x', 'item').encode('y', 'score');

  chart.data(RadarData).coordinate({ type: 'polar' });

  chart
    .area()
    .call(encode)
    .style('fillOpacity', 0.3)
    .scale('x', { padding: 0.5 })
    .axis('y', false)
    .scale('color', { range: ThemeColor10 })
    .legend('color', false);

  chart.line().call(encode).style('lineWidth', 2);

  chart.point().call(encode).encode('shape', 'point');

  chart.axis('x', {
    labelFill: '#fff',
    labelFontSize: 14,
    labelFontWeight: 'bold',
  });

  chart.render();
  return chart;
};

export const renderWordCloud = ({ container, width, height }) => {
  const chart = new G2.Chart({
    container,
    width,
    height,
    padding: 0,
    theme: 'classic',
  });

  chart
    .wordCloud()
    .data(WordCloudData)
    .encode('text', 'name')
    .encode('color', 'name')
    .layout({ spiral: 'rectangular' });

  chart.render();
  return chart;
};

export const renderSkills = ({ container, width, height }) => {
  const chart = new G2.Chart({
    paddingLeft: 70,
    paddingTop: 10,
    paddingBottom: 30,
    container,
    width,
    height,
    theme: 'classic',
  });

  chart.coordinate({ transform: [{ type: 'transpose' }] });

  chart
    .interval()
    .data(SkillsData)
    .encode('x', 'type')
    .encode('y', 'value')
    .encode('color', 'type')
    .encode('size', 20)
    .scale('color', {
      range: ThemeColor10,
    })
    .scale('y', { nice: true })
    .scale('x', { padding: 0.25 })
    .axis('x', {
      labelFill: '#fff',
      titleFill: '#fff',
      labelFontSize: 14,
      title: false,
      labelFontWeight: 'bold',
      tickOpacity: 0,
    })
    .axis('y', {
      labelFill: '#fff',
      titleFill: '#fff',
      labelFontSize: 10,
      title: false,
      tickOpacity: 0,
      tickCount: 5,
      labelFontWeight: 'bold',
    })
    .legend('color', false);

  chart.render();
  return chart;
};

export const renderRelation = ({ container }) => {
  const data = RelationData;
  const width = container.scrollWidth;
  const height = container.scrollHeight || 500;
  const graph = new G6.TreeGraph({
    container,
    width,
    height,
    linkCenter: true,
    modes: {
      default: [
        {
          type: 'collapse-expand',
          onChange: function onChange(item, collapsed) {
            const data = item.getModel();
            data.collapsed = collapsed;
            return true;
          },
        },
        'drag-canvas',
        'zoom-canvas',
      ],
    },
    defaultNode: {
      size: 28,
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
    defaultEdge: {
      type: 'cubic-vertical',
    },
    layout: {
      type: 'compactBox',
      direction: 'TB',
      getId: function getId(d) {
        return d.id;
      },
      getHeight: function getHeight() {
        return 16;
      },
      getWidth: function getWidth() {
        return 32;
      },
      getVGap: function getVGap() {
        return 80;
      },
      getHGap: function getHGap() {
        return 80;
      },
    },
  });

  graph.node(function (node) {
    let position = 'right';
    let rotate = 0;

    return {
      label: node.id,
      labelCfg: {
        position,
        offset: 5,
        style: {
          rotate,
          textAlign: 'start',
          fill: 'white',
          fontSize: 28,
        },
      },
    };
  });

  graph.data(data);
  graph.render();
  graph.fitView();

  if (typeof window !== 'undefined')
    window.onresize = () => {
      if (!graph || graph.get('destroyed')) return;
      if (!container || !container.scrollWidth || !container.scrollHeight)
        return;
      graph.changeSize(container.scrollWidth, container.scrollHeight);
    };
  return graph;
};
