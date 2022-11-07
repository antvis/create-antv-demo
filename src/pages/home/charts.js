import G6 from '@antv/g6';
import * as G2 from '@antv/g2/lib';
// import * as G2 from '@antv/g2';
import {
  WordCloudData,
  SkillsData,
  RelationData,
  RadarData,
} from './mock-data';

export const renderRadar = ({ container, width, height }) => {
  const chart = new G2.Chart({
    container,
    width,
    height,
  });

  const encode = (node) =>
    node.encode('x', 'item').encode('y', 'score').encode('color', 'user');

  chart.data(RadarData).coordinate({ type: 'polar' });

  chart
    .area()
    .call(encode)
    .style('fillOpacity', 0.3)
    .scale('x', { padding: 0.5 })
    .axis('y', false)
    .legend('color', false);

  chart.line().call(encode).style('lineWidth', 2);

  chart.point().call(encode).encode('shape', 'point');

  // @todo Fix this in G2: fail to pass options for arc axis.
  chart.on('afterrender', () => {
    const { canvas } = chart.context();
    const labels = canvas.document.getElementsByClassName('axis-label');
    for (const label of labels) {
      label.style.fill = '#fff';
      label.style.fontSize = 10;
      label.style.fontWeight = 'bold';
    }
    const ticks = canvas.document.getElementsByClassName('axis-tick');
    console.log(ticks);
    for (const tick of ticks) {
      tick.style.opacity = 0;
    }
  });

  chart.render();
  return chart;
};

export const renderWordCloud = ({ container, width, height }) => {
  const words = () => {
    return (data) =>
      data.flatMap((d) =>
        d.words.map(({ weight, word }) => ({
          value: weight,
          text: word,
          name: d.name,
        })),
      );
  };

  const chart = new G2.Chart({
    container,
    width,
    height,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  });

  chart
    .text()
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/d345d2d7-a35d-4d27-af92-4982b3e6b213.json',
      transform: [
        { type: words },
        { type: 'wordCloud', size: [width, height] },
      ],
    })
    .encode('x', 'x')
    .encode('y', 'y')
    .encode('text', 'text')
    .encode('color', 'text')
    .encode('rotate', 'rotate')
    .encode('fontSize', 'size')
    .encode('title', 'name')
    .encode('tooltip', (d) => d.value.toFixed(2))
    .style('textAlign', 'center')
    .scale('x', { domain: [9, width], range: [0, 1] })
    .scale('y', { domain: [0, height], range: [0, 1] })
    .axis(false)
    .scale('fontSize', { type: 'identity' })
    .scale('rotate', { type: 'identity' })
    .scale('tooltip', { type: 'identity' });

  chart.render();
  return chart;
};

export const renderSkills = ({ container, width, height }) => {
  const chart = new G2.Chart({
    paddingLeft: 60,
    paddingTop: 10,
    paddingBottom: 30,
    container,
    width,
    height,
  });

  chart.coordinate({ type: 'transpose' });

  chart
    .interval()
    .data(SkillsData)
    .encode('x', 'type')
    .encode('y', 'value')
    .encode('color', 'type')
    .scale('y', { nice: true })
    .scale('x', { padding: 0.25 })
    .axis('x', {
      labelFill: '#fff',
      titleFill: '#fff',
      labelFontSize: 10,
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

  chart.render().node();
  return chart;
};

export const renderRelation = ({ container }) => {
  const data = RelationData;
  const graph = new G6.Graph({
    container,
    layout: {
      type: 'force',
      preventOverlap: true,
    },
    defaultNode: {
      color: '#5B8FF9',
    },
  });

  const nodes = data.nodes;
  graph.data({
    nodes,
    edges: data.edges.map(function (edge, i) {
      edge.id = 'edge' + i;
      return Object.assign({}, edge);
    }),
  });
  graph.render();

  const refreshDragedNodePosition = (e) => {
    const model = e.item.get('model');
    model.fx = e.x;
    model.fy = e.y;
  };
  graph.on('node:dragstart', function (e) {
    graph.layout();
    refreshDragedNodePosition(e);
  });
  graph.on('node:drag', function (e) {
    refreshDragedNodePosition(e);
  });
  graph.on('node:dragend', function (e) {
    e.item.get('model').fx = null;
    e.item.get('model').fy = null;
  });
  return graph;
};
