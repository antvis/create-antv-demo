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

export const mapData = [
  { order: 1, oldName: '长安', todayName: '西安市', lng: 108.94, lat: 34.34 },
  { order: 2, oldName: '西渭桥', todayName: '咸阳市', lng: 108.71, lat: 34.33 },
  { order: 3, oldName: '武功县', todayName: '武功县', lng: 108.2, lat: 34.26 },
  { order: 4, oldName: '岐山县', todayName: '岐山县', lng: 107.62, lat: 34.44 },
  { order: 5, oldName: '凤翔府', todayName: '凤翔县', lng: 107.4, lat: 34.52 },
  { order: 6, oldName: '陇州', todayName: '陇县', lng: 106.86, lat: 34.89 },
  { order: 7, oldName: '上邽县', todayName: '天水市', lng: 105.72, lat: 34.58 },
  { order: 8, oldName: '达渭州', todayName: '陇西县', lng: 104.63, lat: 35.0 },
  {
    order: 9,
    oldName: '鸟鼠同穴山',
    todayName: '渭源县',
    lng: 104.22,
    lat: 35.14,
  },
  {
    order: 10,
    oldName: '狄道县',
    todayName: '临洮县',
    lng: 103.86,
    lat: 35.39,
  },
  { order: 11, oldName: '兰州', todayName: '兰州', lng: 103.83, lat: 36.06 },
  { order: 12, oldName: '乌鞘岭', todayName: '乌鞘岭', lng: 102.85, lat: 37.2 },
  { order: 13, oldName: '凉州', todayName: '武威市', lng: 102.64, lat: 37.93 },
  { order: 14, oldName: '甘州', todayName: '张掖市', lng: 100.45, lat: 38.92 },
  { order: 15, oldName: '肃州', todayName: '酒泉市', lng: 98.49, lat: 39.73 },
  { order: 16, oldName: '瓜州', todayName: '瓜州县', lng: 95.78, lat: 40.52 },
  { order: 17, oldName: '伊吾国', todayName: '哈密市', lng: 93.52, lat: 42.82 },
  {
    order: 17,
    oldName: '高昌国',
    todayName: '吐鲁番市东高昌故城',
    lng: 89.53,
    lat: 42.85,
  },
];
