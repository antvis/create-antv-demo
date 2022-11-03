import { WordCloud, Bar, Radar } from '@antv/g2plot';
import G6 from '@antv/g6';
import {
  WordCloudData,
  SkillsData,
  RelationData,
  RadarData,
} from './mock-data';

export const renderRadar = ({ container }) => {
  const chart = new Radar(container, {
    data: RadarData,
    xField: 'item',
    yField: 'score',
    seriesField: 'user',
    meta: {
      score: {
        alias: '分数',
        min: 0,
        max: 80,
      },
    },
    xAxis: {
      label: {
        style: {
          fill: '#fff',
        },
      },
      line: null,
      tickLine: null,
      grid: {
        line: {
          style: {
            lineDash: null,
          },
        },
      },
    },
    yAxis: {
      label: {
        style: {
          fill: '#fff',
        },
      },
    },
    // 开启面积
    area: {},
    // 开启辅助点
    point: {
      size: 2,
    },
    legend: false,
  });
  chart.render();
  return chart;
};

export const renderWordCloud = ({ container }) => {
  const chart = new WordCloud(container, {
    data: WordCloudData,
    wordField: 'name',
    weightField: 'value',
    colorField: 'name',
    imageMask:
      'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*07tdTIOmvlYAAAAAAAAAAABkARQnAQ',
    wordStyle: {
      fontFamily: 'Verdana',
      fontSize: [8, 32],
    },
  });
  chart.render();
  return chart;
};

export const renderSkills = ({ container }) => {
  const chart = new Bar(container, {
    data: SkillsData,
    xField: 'value',
    yField: 'year',
    seriesField: 'year',
    xAxis: {
      grid: {
        line: false,
      },
      label: {
        style: {
          fill: '#fff',
        },
      },
    },
    yAxis: {
      line: null,
      tickLine: null,
      label: {
        style: {
          fill: '#fff',
        },
      },
    },
    legend: false,
  });
  chart.render();
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
