export const WordCloudData = [
  { value: 14, name: '美猴王' },
  { value: 8, name: '孙悟空' },
  { value: 4, name: '弼马温' },
  { value: 20, name: '齐天大圣' },
  { value: 8, name: '孙行者' },
  { value: 12, name: '斗战胜佛' },
  { value: 6, name: '上仙' },
  { value: 6, name: '猴哥' },
  { value: 10, name: '大师兄' },
  { value: 6, name: '石猴' },
  { value: 6, name: '至尊宝' },
  { value: 8, name: '金牌打野' },
];

export const SkillsData = [
  { type: '大圣神威', value: 6 },
  { type: '护身咒法', value: 5 },
  { type: '斗战冲锋', value: 4 },
  { type: '如意金箍', value: 4 },
];

export const RelationData = {
  id: '唐僧',
  children: [
    { id: '孙悟空(我)' },
    { id: '猪悟能', children: [{ id: '白龙马' }] },
    { id: '沙悟净' },
  ],
};

export const RadarData = [
  { item: '忠诚度', score: 2 },
  { item: '佛性', score: 1 },
  { item: '沟通能力', score: 2 },
  { item: '心性修行', score: 1 },
  { item: '神通', score: 5 },
];
