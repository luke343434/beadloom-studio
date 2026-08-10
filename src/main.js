import './style.css';

const materialPhotoMap = {
  amber: 'gemstone-color.jpg', agate: 'gemstone-color.jpg', onyx: 'gemstone-dark.jpg',
  sandal: 'wood-red.jpg', ebony: 'wood-red.jpg', walnut: 'wood-prayer.jpg', bodhi: 'wood-prayer.jpg',
  lapis: 'gemstone-blue.jpg', tiger: 'gemstone-dark.jpg', obsidian: 'gemstone-dark.jpg', turquoise: 'turquoise-charms.jpg', malachite: 'turquoise-charms.jpg',
  jade: 'gemstone-color.jpg', 'jade-green': 'turquoise-charms.jpg', xiuyan: 'gemstone-color.jpg',
  crystal: 'quartz-bracelet.jpg', amethyst: 'quartz-bracelet.jpg', 'rose-quartz': 'pearl-beads.jpg', moonstone: 'pearl-beads.jpg', aquamarine: 'gemstone-blue.jpg', garnet: 'gemstone-dark.jpg',
  glass: 'pearl-beads.jpg', 'ceramic-blue': 'jewelry-market.jpg',
  silver: 'metal-silver.jpg', 'gold-spacer': 'metal-gold.jpg', 'copper-spacer': 'metal-gold.jpg', 'lotus-spacer': 'metal-silver.jpg',
  'ruyi-charm': 'gold-charms.jpg', 'gourd-charm': 'gold-charms.jpg', 'red-tassel': 'jewelry-market.jpg',
};

const builtInBeads = [
  { id: 'amber', name: '老蜜蜡', type: '琥珀', material: '有机宝石', size: 12, color: '琥珀金', tone: '#c77f32', category: '琥珀玛瑙', finish: '柔光蜡面', note: '温润通透，随光线呈现蜜糖层次', shape: 'round' },
  { id: 'agate', name: '南红玛瑙', type: '玛瑙', material: '矿石', size: 10, color: '柿子红', tone: '#bd503a', category: '琥珀玛瑙', finish: '玻璃光泽', note: '色泽浓郁，适合做醒目点缀', shape: 'round' },
  { id: 'onyx', name: '黑玛瑙', type: '玛瑙', material: '矿石', size: 8, color: '曜石黑', tone: '#292b2d', category: '琥珀玛瑙', finish: '高抛光', note: '利落沉稳，适合压住整体色调', shape: 'round' },
  { id: 'sandal', name: '小叶紫檀', type: '紫檀木', material: '木质', size: 10, color: '深绛红', tone: '#6f252c', category: '木质菩提', finish: '细腻木纹', note: '沉稳含蓄，适合作为手串主材', shape: 'round' },
  { id: 'ebony', name: '黑檀木', type: '黑檀', material: '木质', size: 10, color: '乌木黑', tone: '#35302c', category: '木质菩提', finish: '哑光木纹', note: '色调深沉，纹理细密', shape: 'round' },
  { id: 'walnut', name: '桃核珠', type: '桃核', material: '天然籽', size: 12, color: '核桃棕', tone: '#7c5036', category: '木质菩提', finish: '天然沟纹', note: '天然纹路明显，适合文玩风格', shape: 'round' },
  { id: 'bodhi', name: '星月菩提', type: '菩提子', material: '天然籽', size: 9, color: '象牙白', tone: '#d9c9a8', category: '木质菩提', finish: '星点肌理', note: '浅色基底带天然星点', shape: 'round' },
  { id: 'lapis', name: '青金石', type: '半宝石', material: '矿石', size: 8, color: '群青蓝', tone: '#315b7d', category: '天然矿石', finish: '自然颗粒', note: '深蓝底色带点点金色矿斑', shape: 'round' },
  { id: 'tiger', name: '虎眼石', type: '石英', material: '矿石', size: 10, color: '金棕色', tone: '#95683c', category: '天然矿石', finish: '猫眼光带', note: '移动时会出现自然流动的光带', shape: 'round' },
  { id: 'obsidian', name: '黑曜石', type: '火山玻璃', material: '矿石', size: 10, color: '墨黑色', tone: '#24282b', category: '天然矿石', finish: '玻璃光泽', note: '黑色纯净，适合作为基础主珠', shape: 'round' },
  { id: 'turquoise', name: '绿松石', type: '磷酸盐矿物', material: '矿石', size: 8, color: '松石蓝', tone: '#4f9995', category: '天然矿石', finish: '天然铁线', note: '清爽蓝绿色，适合作为跳色', shape: 'round' },
  { id: 'malachite', name: '孔雀石', type: '碳酸盐矿物', material: '矿石', size: 8, color: '孔雀绿', tone: '#39735a', category: '天然矿石', finish: '天然条纹', note: '深浅绿色纹带富有层次', shape: 'round' },
  { id: 'jade', name: '和田玉', type: '软玉', material: '玉石', size: 12, color: '青白玉', tone: '#b8c2b6', category: '玉石翡翠', finish: '温润油光', note: '柔和的青白色，留白感很强', shape: 'round' },
  { id: 'jade-green', name: '翡翠珠', type: '硬玉', material: '玉石', size: 10, color: '晴水绿', tone: '#79a48a', category: '玉石翡翠', finish: '水润光泽', note: '清透柔和的浅绿色', shape: 'round' },
  { id: 'xiuyan', name: '岫玉', type: '蛇纹石玉', material: '玉石', size: 10, color: '浅湖绿', tone: '#9cb7a0', category: '玉石翡翠', finish: '蜡状光泽', note: '颜色柔和，适合大面积使用', shape: 'round' },
  { id: 'crystal', name: '白水晶', type: '石英', material: '水晶', size: 8, color: '透明白', tone: '#d9dfdc', category: '水晶彩宝', finish: '通透切面', note: '通透清亮，增加手串呼吸感', shape: 'round' },
  { id: 'amethyst', name: '紫水晶', type: '石英', material: '水晶', size: 8, color: '葡萄紫', tone: '#765c83', category: '水晶彩宝', finish: '玻璃光泽', note: '柔和紫色，适合优雅配色', shape: 'round' },
  { id: 'rose-quartz', name: '粉晶', type: '石英', material: '水晶', size: 10, color: '樱花粉', tone: '#cf9ca3', category: '水晶彩宝', finish: '柔雾光泽', note: '低饱和粉色，气质轻柔', shape: 'round' },
  { id: 'moonstone', name: '月光石', type: '长石', material: '半宝石', size: 8, color: '月光白', tone: '#bdc7ca', category: '水晶彩宝', finish: '蓝色晕彩', note: '转动时带有柔和蓝色晕光', shape: 'round' },
  { id: 'aquamarine', name: '海蓝宝', type: '绿柱石', material: '彩宝', size: 8, color: '海水蓝', tone: '#80aebc', category: '水晶彩宝', finish: '清透晶体', note: '清澈浅蓝，适合春夏设计', shape: 'round' },
  { id: 'garnet', name: '石榴石', type: '石榴石族', material: '彩宝', size: 7, color: '酒红色', tone: '#75353e', category: '水晶彩宝', finish: '玻璃光泽', note: '深酒红色，适合细珠叠戴', shape: 'round' },
  { id: 'glass', name: '琉璃珠', type: '手工玻璃', material: '玻璃', size: 8, color: '烟灰紫', tone: '#817184', category: '琉璃陶瓷', finish: '半透明', note: '轻盈通透，让整串更有呼吸感', shape: 'round' },
  { id: 'ceramic-blue', name: '青花陶瓷珠', type: '陶瓷', material: '陶瓷', size: 10, color: '青花蓝', tone: '#537489', category: '琉璃陶瓷', finish: '釉面纹样', note: '青花纹样适合国风设计', shape: 'round' },
  { id: 'silver', name: '银隔片', type: 'S925银', material: '金属', size: 6, color: '哑光银', tone: '#a6aaa6', category: '金属配件', finish: '拉丝表面', note: '作为节奏分隔，增加材质对比', shape: 'spacer' },
  { id: 'gold-spacer', name: '鎏金隔片', type: '铜镀金', material: '金属', size: 6, color: '暖金色', tone: '#c6a25e', category: '金属配件', finish: '细砂金面', note: '适合暖色系手串的节奏分隔', shape: 'spacer' },
  { id: 'copper-spacer', name: '古铜隔片', type: '黄铜', material: '金属', size: 7, color: '古铜色', tone: '#99704c', category: '金属配件', finish: '做旧表面', note: '适合复古或文玩风格', shape: 'spacer' },
  { id: 'lotus-spacer', name: '莲花托', type: '花托配件', material: '合金', size: 9, color: '旧银色', tone: '#969793', category: '金属配件', finish: '浮雕纹样', note: '用于主珠两侧，强化中心层次', shape: 'spacer' },
  { id: 'ruyi-charm', name: '如意吊坠', type: '吊坠', material: '金属', size: 14, color: '暖金色', tone: '#bc9652', category: '吊坠流苏', finish: '镜面浮雕', note: '可作为手串视觉中心', shape: 'charm' },
  { id: 'gourd-charm', name: '葫芦吊坠', type: '吊坠', material: '金属', size: 15, color: '古铜色', tone: '#9b6a42', category: '吊坠流苏', finish: '做旧表面', note: '适合国风与文玩搭配', shape: 'charm' },
  { id: 'red-tassel', name: '朱砂流苏', type: '流苏', material: '丝线', size: 18, color: '朱砂红', tone: '#a8483d', category: '吊坠流苏', finish: '丝线编织', note: '用于增加垂坠感和东方气质', shape: 'charm' },
].map((bead) => ({ ...bead, photo: `${import.meta.env.BASE_URL}materials/${materialPhotoMap[bead.id]}` }));

let customMaterials = [];
let customCategories = [];
try {
  customCategories = JSON.parse(localStorage.getItem('beadloom-custom-categories') ?? '[]');
  if (!Array.isArray(customCategories)) customCategories = [];
} catch {
  customCategories = [];
}

function allMaterials() {
  return [...builtInBeads, ...customMaterials];
}

const initialDesignIds = [];

function getBead(reference) {
  const id = typeof reference === 'string' ? reference : reference?.beadId ?? reference?.id;
  const base = allMaterials().find((bead) => bead.id === id) ?? builtInBeads[0];
  return typeof reference === 'object' ? { ...base, ...reference, id: base.id, beadId: base.id } : base;
}

function createBeadInstance(beadId, overrides = {}) {
  const base = getBead(beadId);
  return {
    uid: overrides.uid ?? crypto.randomUUID(),
    beadId: base.id,
    size: Number(overrides.size ?? base.size),
    tone: overrides.tone ?? base.tone,
    color: overrides.color ?? base.color,
  };
}

function createInitialDesign() {
  return initialDesignIds.map((id) => createBeadInstance(id));
}

const state = {
  activeCategory: '全部',
  search: '',
  selectedLibraryId: 'amber',
  selectedBeadIndex: -1,
  braceletSize: 17.5,
  design: createInitialDesign(),
  selectedBeadUids: new Set(),
  selectionAnchorIndex: -1,
  multiSelectMode: false,
  draggedBeadIndex: -1,
  libraryDraggedId: null,
  dragTargetIndex: -1,
  contextMenu: null,
  exportNotice: '',
  libraryManagerOpen: false,
  managerDraftPhoto: '',
  managerError: '',
  saved: false,
};

const app = document.querySelector('#app');

function filteredBeads() {
  const query = state.search.trim().toLowerCase();
  return allMaterials().filter((bead) => {
    const matchesCategory = state.activeCategory === '全部'
      || (state.activeCategory === '我的素材' ? bead.custom : bead.category === state.activeCategory);
    const matchesSearch = !query || `${bead.name}${bead.type}${bead.material}${bead.category}${bead.color}`.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });
}

function totals() {
  const length = state.design.reduce((sum, instance) => sum + getBead(instance).size, 0);
  const circumference = state.braceletSize.toFixed(1);
  const targetLength = state.braceletSize * 10;
  return { length, circumference, gap: Math.max(0, targetLength - length).toFixed(1) };
}

function beadStyle(bead, extra = '') {
  return `--bead-tone:${bead.tone};--bead-highlight:${bead.id === 'jade' ? '#f1f4ec' : bead.id === 'silver' ? '#ecebe5' : '#fff0c8'};${extra}`;
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}

function materialPhoto(bead, className = 'bead-photo') {
  return bead.photo ? `<img class="${className}" src="${escapeHtml(bead.photo)}" alt="" />` : '';
}

function openMaterialDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('beadloom-material-library', 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains('materials')) request.result.createObjectStore('materials', { keyPath: 'id' });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function loadCustomMaterials() {
  const database = await openMaterialDatabase();
  return new Promise((resolve, reject) => {
    const request = database.transaction('materials', 'readonly').objectStore('materials').getAll();
    request.onsuccess = () => resolve(request.result ?? []);
    request.onerror = () => reject(request.error);
  });
}

async function saveCustomMaterial(material) {
  const database = await openMaterialDatabase();
  return new Promise((resolve, reject) => {
    const request = database.transaction('materials', 'readwrite').objectStore('materials').put(material);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function deleteCustomMaterial(id) {
  const database = await openMaterialDatabase();
  return new Promise((resolve, reject) => {
    const request = database.transaction('materials', 'readwrite').objectStore('materials').delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function optimizeMaterialPhoto(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error('图片读取失败'));
      image.onload = () => {
        const size = Math.min(image.width, image.height);
        const sourceX = (image.width - size) / 2;
        const sourceY = (image.height - size) / 2;
        const canvas = document.createElement('canvas');
        canvas.width = 720;
        canvas.height = 720;
        const context = canvas.getContext('2d');
        context.drawImage(image, sourceX, sourceY, size, size, 0, 0, 720, 720);
        resolve(canvas.toDataURL('image/jpeg', .84));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function findNearestInsertIndex(clientX, clientY) {
  let nearest = { index: -1, distance: Infinity, element: null };
  app.querySelectorAll('[data-insert-index]').forEach((slot) => {
    const rect = slot.getBoundingClientRect();
    const distance = Math.hypot(clientX - (rect.left + rect.width / 2), clientY - (rect.top + rect.height / 2));
    if (distance < nearest.distance) nearest = { index: Number(slot.dataset.insertIndex), distance, element: slot };
  });
  app.querySelectorAll('.drop-slot.is-target').forEach((slot) => slot.classList.remove('is-target'));
  nearest.element?.classList.add('is-target');
  state.dragTargetIndex = nearest.index;
  return nearest.index;
}

function isPointInStage(clientX, clientY) {
  const stage = app.querySelector('.bracelet-stage');
  if (!stage) return false;
  const rect = stage.getBoundingClientRect();
  return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
}

function selectedIndexes() {
  return state.design
    .map((bead, index) => state.selectedBeadUids.has(bead.uid) ? index : -1)
    .filter((index) => index >= 0);
}

function selectOnly(index) {
  const bead = state.design[index];
  state.selectedBeadUids = new Set(bead ? [bead.uid] : []);
  state.selectedBeadIndex = bead ? index : -1;
  state.selectionAnchorIndex = bead ? index : -1;
}

function moveSelectionToInsert(sourceIndex, targetIndex) {
  if (sourceIndex < 0 || targetIndex < 0) return false;
  const source = state.design[sourceIndex];
  const movingUids = state.selectedBeadUids.has(source.uid) && state.selectedBeadUids.size > 1
    ? new Set(state.selectedBeadUids)
    : new Set([source.uid]);
  const movingIndexes = state.design.map((bead, index) => movingUids.has(bead.uid) ? index : -1).filter((index) => index >= 0);
  const first = movingIndexes[0];
  const last = movingIndexes.at(-1);
  if (targetIndex >= first && targetIndex <= last + 1 && movingIndexes.length === last - first + 1) return false;
  const movingBeads = state.design.filter((bead) => movingUids.has(bead.uid));
  const removedBeforeTarget = movingIndexes.filter((index) => index < targetIndex).length;
  const remaining = state.design.filter((bead) => !movingUids.has(bead.uid));
  const adjustedIndex = Math.max(0, targetIndex - removedBeforeTarget);
  remaining.splice(adjustedIndex, 0, ...movingBeads);
  state.design = remaining;
  state.selectedBeadUids = new Set(movingBeads.map((bead) => bead.uid));
  state.selectedBeadIndex = adjustedIndex;
  state.selectionAnchorIndex = adjustedIndex;
  state.saved = false;
  return true;
}

function insertLibraryBead(beadId, targetIndex) {
  if (!beadId || targetIndex < 0) return false;
  const instance = createBeadInstance(beadId);
  state.design.splice(targetIndex, 0, instance);
  state.selectedBeadUids = new Set([instance.uid]);
  state.selectedBeadIndex = targetIndex;
  state.selectionAnchorIndex = targetIndex;
  state.selectedLibraryId = beadId;
  state.saved = false;
  return true;
}

function render() {
  const selectedLibrary = getBead(state.selectedLibraryId);
  const selectedBead = state.selectedBeadIndex >= 0 ? getBead(state.design[state.selectedBeadIndex]) : selectedLibrary;
  const contextInstance = state.contextMenu ? state.design[state.contextMenu.index] : null;
  const contextBead = contextInstance ? getBead(contextInstance) : null;
  const contextSelectionCount = state.contextMenu?.selectedUids?.filter((uid) => state.design.some((bead) => bead.uid === uid)).length ?? 0;
  const { length, circumference, gap } = totals();
  const categories = ['全部', ...new Set([...allMaterials().map((bead) => bead.category), ...customCategories]), '我的素材'];
  const beads = filteredBeads();
  const selectionCount = state.selectedBeadUids.size;

  app.innerHTML = `
    <div class="app-shell">
      <header class="topbar">
        <a class="brand" href="#" aria-label="串拾 Studio 首页">
          <span class="brand-mark"><i></i><i></i><i></i></span>
          <span><strong>串拾</strong><em>BEADLOOM</em></span>
        </a>
        <div class="topbar-context"><span class="eyebrow">当前设计</span><span class="context-name">春日留白</span><span class="save-state ${state.saved ? 'is-saved' : ''}"><span class="save-dot"></span>${state.saved ? '已保存' : '未保存'}</span></div>
        <div class="top-actions">
          <button class="text-button" data-action="reset">重置</button>
          <button class="outline-button" data-action="export">导出图片 <span>↗</span></button>
          <button class="primary-button" data-action="save"><span class="button-icon">✓</span> 保存设计</button>
          <button class="avatar" aria-label="用户菜单">L</button>
        </div>
      </header>

      <main class="workspace">
        <aside class="library-panel">
          <div class="panel-heading"><div><span class="section-kicker">COLLECTION</span><h1>素材库</h1></div><div class="library-heading-actions"><span class="count-label">${allMaterials().length} 件</span><button data-action="open-manager">管理 ＋</button></div></div>
          <div class="search-box"><span>⌕</span><input id="search" type="search" value="${state.search}" placeholder="搜索珠子、材质..." aria-label="搜索珠子" /><kbd>/</kbd></div>
          <div class="category-tabs" role="tablist">${categories.map((category) => `<button class="category-tab ${state.activeCategory === category ? 'active' : ''}" data-category="${category}" role="tab" aria-selected="${state.activeCategory === category}">${category}</button>`).join('')}</div>
          <div class="bead-list">${beads.map((bead) => `
            <button class="bead-card ${state.selectedLibraryId === bead.id && state.selectedBeadIndex < 0 ? 'selected' : ''}" data-bead="${bead.id}" draggable="true" aria-pressed="${state.selectedLibraryId === bead.id && state.selectedBeadIndex < 0}" aria-label="${bead.name}，拖入手串或点击选择">
              <span class="bead-thumb ${bead.id} shape-${bead.shape ?? 'round'}" style="${beadStyle(bead)}">${materialPhoto(bead)}<span></span></span>
              <span class="bead-card-copy"><strong>${bead.name}</strong><span>${bead.type} · ${bead.size} mm</span></span>
              <span class="add-symbol" aria-hidden="true">⠿</span>
            </button>`).join('') || '<p class="empty-state">没有找到匹配的珠子</p>'}</div>
          <button class="library-footer" data-action="add"><span>＋</span> 添加选中的珠子</button>
        </aside>

        <section class="design-panel">
          <div class="design-header"><div><span class="section-kicker">YOUR COMPOSITION</span><h2>春日留白 <button class="edit-title" aria-label="编辑设计名称">✎</button></h2><p>从左侧拖入珠子；多选后可批量移动、复制或删除</p></div><div class="view-controls"><button class="view-button active" aria-label="圆形视图">◉</button><button class="view-button" aria-label="平铺视图">☷</button></div></div>
          <div class="bracelet-stage" aria-label="手串预览区">
            <div class="stage-note top-note">可视化预览 <span></span></div>
            <div class="orbit orbit-outer"></div><div class="orbit orbit-inner"></div><div class="center-label"><span>${state.design.length ? 'HANDMADE' : 'EMPTY DESIGN'}</span><strong>${state.design.length ? state.braceletSize.toFixed(1) : '0'}</strong><small>${state.design.length ? '手围 cm' : '颗珠子'}</small></div>
            <div class="bracelet-beads">${state.design.length ? state.design.map((instance, index) => {
              const bead = getBead(instance);
              const angle = (360 / state.design.length) * index - 90;
              const selected = state.selectedBeadUids.has(instance.uid);
              const primary = state.selectedBeadIndex === index;
              const scale = 0.68 + (bead.size / 20) * 0.55;
              return `<button class="bracelet-bead ${bead.id} shape-${bead.shape ?? 'round'} ${selected ? 'selected' : ''} ${primary ? 'primary-selected' : ''}" data-index="${index}" draggable="true" aria-pressed="${selected}" aria-label="第 ${index + 1} 颗，${bead.name}${selected ? '，已选择' : ''}" style="--angle:${angle}deg;--scale:${scale};${beadStyle(bead)}"><span class="selection-check">✓</span>${materialPhoto(bead, 'bracelet-photo')}<span class="bead-glow"></span><span class="bead-shine"></span></button>`;
            }).join('') + state.design.map((_, insertIndex) => {
              const angle = (360 / state.design.length) * (insertIndex - 0.5) - 90;
              return `<span class="drop-slot" data-insert-index="${insertIndex}" style="--angle:${angle}deg" aria-hidden="true"><i></i></span>`;
            }).join('') : '<span class="empty-drop-zone" data-insert-index="0"><i>＋</i><strong>拖入第一颗珠子</strong><small>从左侧实拍素材库开始</small></span>'}</div>
            <div class="stage-note bottom-note"><span class="legend-line"></span>${state.design.length ? '拖拽插入 · Ctrl/Cmd 多选' : '当前为空手串'}</div>
          </div>
          <div class="design-toolbar"><span class="toolbar-count"><strong>${state.design.length}</strong> 颗珠子</span><button class="multi-select-button ${state.multiSelectMode ? 'active' : ''}" data-action="toggle-multi" aria-pressed="${state.multiSelectMode}">✓ 多选${selectionCount ? ` · ${selectionCount}` : ''}</button><span class="toolbar-divider"></span><button data-action="select-all">全选</button><button data-action="duplicate" ${selectionCount < 1 ? 'disabled' : ''}>⧉ 复制${selectionCount > 1 ? ` ${selectionCount} 颗` : ''}</button><button data-action="move-left" ${selectionCount < 1 ? 'disabled' : ''}>← 左移</button><button data-action="move-right" ${selectionCount < 1 ? 'disabled' : ''}>右移 →</button><button class="delete-button" data-action="delete" ${selectionCount < 1 || selectionCount >= state.design.length ? 'disabled' : ''}>⌫ 删除${selectionCount > 1 ? ` ${selectionCount} 颗` : ''}</button></div>
        </section>

        <aside class="inspector-panel">
          <div class="inspector-heading"><span class="section-kicker">INSPECTOR</span><h2>${selectionCount > 1 ? `已选 ${selectionCount} 颗` : state.selectedBeadIndex >= 0 ? '已选珠子' : '准备添加'}</h2></div>
          <div class="selected-preview"><span class="large-bead ${selectedBead.id} shape-${selectedBead.shape ?? 'round'}" style="${beadStyle(selectedBead)}">${materialPhoto(selectedBead, 'large-photo')}<span></span></span><div><strong>${selectedBead.name}</strong><span>${selectedBead.type}</span></div><button data-action="clear-selection" aria-label="取消选择">×</button></div>
          <div class="detail-list"><div><span>材质</span><strong>${selectedBead.material}</strong></div><div><span>颜色</span><strong><i class="color-dot" style="background:${selectedBead.tone}"></i>${selectedBead.color}</strong></div><div><span>直径</span><strong>${selectedBead.size} mm</strong></div><div><span>表面</span><strong>${selectedBead.finish}</strong></div></div>
          <p class="bead-note">“${selectedBead.note}”</p>
          <button class="add-inspector-button" data-action="add"><span>＋</span> 加入手串</button>
          <div class="measure-section"><div class="measure-heading"><span class="section-kicker">MEASUREMENTS</span><span>实时估算</span></div><div class="measure-grid"><div class="measure-card"><span>成品周长</span><strong>${circumference}<small> cm</small></strong></div><div class="measure-card"><span>珠子总长</span><strong>${length}<small> mm</small></strong></div><div class="measure-card"><span>预留空隙</span><strong>${gap}<small> mm</small></strong></div><div class="measure-card"><span>建议线长</span><strong>${(state.braceletSize + 5).toFixed(0)}<small> cm</small></strong></div></div></div>
          <div class="size-section"><div class="measure-heading"><span class="section-kicker">WRIST SIZE</span><strong>${state.braceletSize.toFixed(1)} cm</strong></div><input id="size-range" class="size-range" type="range" min="14" max="22" step="0.5" value="${state.braceletSize}" aria-label="手腕尺寸" /><div class="range-labels"><span>14 cm</span><span>22 cm</span></div></div>
        </aside>
      </main>
      <footer class="statusbar"><span><i class="status-light"></i> 设计模式</span><span>最后编辑：刚刚</span><span class="status-tip">按 <kbd>⌘ S</kbd> 保存设计</span></footer>
      ${state.exportNotice ? `<div class="export-toast" role="status">✓ ${state.exportNotice}</div>` : ''}
      ${contextBead ? `
        <button class="context-backdrop" data-action="close-context" aria-label="关闭珠子编辑菜单"></button>
        <section class="bead-context-menu" style="left:${state.contextMenu.x}px;top:${state.contextMenu.y}px" role="dialog" aria-label="编辑${contextBead.name}">
          <header><span class="mini-bead ${contextBead.id} shape-${contextBead.shape ?? 'round'}" style="${beadStyle(contextBead)}">${materialPhoto(contextBead, 'mini-photo')}</span><div><small>${contextSelectionCount > 1 ? `已选 ${contextSelectionCount} 颗 · 当前第 ${state.contextMenu.index + 1} 颗` : `第 ${state.contextMenu.index + 1} 颗`}</small><strong>${contextBead.name}</strong></div><button data-action="close-context" aria-label="关闭">×</button></header>
          <div class="context-field"><label for="bead-size">珠子直径 <output data-size-value>${contextBead.size} mm</output></label><input id="bead-size" data-property="size" type="range" min="4" max="20" step="1" value="${contextBead.size}" /><div><span>4 mm</span><span>20 mm</span></div></div>
          <div class="context-field color-field"><label for="bead-color">珠子颜色</label><div><input id="bead-color" data-property="tone" type="color" value="${contextBead.tone}" /><span>${contextBead.color}</span></div></div>
          <div class="context-actions"><button data-action="context-duplicate">⧉ 复制此珠</button><button data-action="reset-bead">↺ 恢复默认</button></div>
          <button class="context-delete" data-action="context-delete" ${contextSelectionCount >= state.design.length ? 'disabled' : ''}>⌫ ${contextSelectionCount > 1 ? `删除已选 ${contextSelectionCount} 颗珠子` : '从手串中删除'}</button>
        </section>` : ''}
      ${state.libraryManagerOpen ? `
        <button class="manager-backdrop" data-action="close-manager" aria-label="关闭素材管理"></button>
        <section class="material-manager" role="dialog" aria-modal="true" aria-labelledby="material-manager-title">
          <header class="manager-header"><div><span class="section-kicker">MY COLLECTION</span><h2 id="material-manager-title">素材库管理</h2><p>上传自己手里的珠子与配件，建立个人素材库</p></div><button data-action="close-manager" aria-label="关闭">×</button></header>
          <div class="manager-layout">
            <form id="material-form" class="material-form">
              <label class="photo-uploader" for="material-photo">
                ${state.managerDraftPhoto ? `<img src="${escapeHtml(state.managerDraftPhoto)}" alt="待添加素材预览" />` : '<span>＋</span><strong>拍照或上传图片</strong><small>自动裁切并压缩</small>'}
                <input id="material-photo" type="file" accept="image/*" capture="environment" />
              </label>
              <div class="manager-fields">
                <label>素材名称<input class="manager-input" name="name" required maxlength="24" placeholder="例如：我的白水晶" /></label>
                <label>品种<input class="manager-input" name="type" required maxlength="24" placeholder="例如：天然水晶" /></label>
                <label>类目<select class="manager-input" name="category" required>${categories.filter((category) => category !== '全部' && category !== '我的素材').map((category) => `<option>${escapeHtml(category)}</option>`).join('')}</select></label>
                <label>材质<input class="manager-input" name="material" maxlength="24" placeholder="矿石 / 金属 / 木质" /></label>
                <label>尺寸 mm<input class="manager-input" name="size" type="number" min="2" max="40" step="1" value="10" required /></label>
                <label>形态<select class="manager-input" name="shape"><option value="round">圆珠</option><option value="spacer">隔片 / 花托</option><option value="charm">吊坠 / 异形</option></select></label>
                <label>颜色名称<input class="manager-input" name="color" maxlength="16" placeholder="例如：奶油白" /></label>
                <label>代表色<input class="manager-input manager-color" name="tone" type="color" value="#b88b62" /></label>
                <label class="manager-wide">表面效果<input class="manager-input" name="finish" maxlength="30" placeholder="抛光、磨砂、天然纹理..." /></label>
              </div>
              ${state.managerError ? `<p class="manager-error">${escapeHtml(state.managerError)}</p>` : ''}
              <button class="manager-submit" type="submit">保存到我的素材库</button>
            </form>
            <div class="manager-side">
              <div class="category-creator"><div><span class="section-kicker">CATEGORIES</span><h3>自定义类目</h3></div><div><input id="new-category" class="manager-input" maxlength="12" placeholder="输入新类目" /><button data-action="add-category">添加</button></div></div>
              <div class="custom-category-list">${customCategories.length ? customCategories.map((category) => `<span>${escapeHtml(category)}<button data-delete-category="${escapeHtml(category)}" aria-label="删除类目${escapeHtml(category)}">×</button></span>`).join('') : '<small>还没有自定义类目</small>'}</div>
              <div class="custom-material-heading"><span>我的素材</span><strong>${customMaterials.length} 件</strong></div>
              <div class="custom-material-list">${customMaterials.length ? customMaterials.map((bead) => `<article><span class="manager-material-thumb">${materialPhoto(bead, 'manager-photo')}</span><div><strong>${escapeHtml(bead.name)}</strong><small>${escapeHtml(bead.category)} · ${bead.size} mm</small></div><button data-delete-material="${bead.id}" ${state.design.some((item) => item.beadId === bead.id) ? 'disabled aria-label="素材正在设计中，不能删除"' : `aria-label="删除${escapeHtml(bead.name)}"`}>删除</button></article>`).join('') : '<p class="manager-empty">上传照片，建立你的第一件私人素材</p>'}</div>
            </div>
          </div>
        </section>` : ''}
    </div>`;
  bindEvents();
}

function bindEvents() {
  app.querySelectorAll('[data-bead]').forEach((element) => {
    element.addEventListener('click', () => {
      state.selectedLibraryId = element.dataset.bead;
      state.selectedBeadIndex = -1;
      state.selectedBeadUids.clear();
      render();
    });
    element.addEventListener('dragstart', (event) => {
      state.libraryDraggedId = element.dataset.bead;
      state.draggedBeadIndex = -1;
      event.dataTransfer.effectAllowed = 'copy';
      event.dataTransfer.setData('application/x-bead-id', element.dataset.bead);
      event.dataTransfer.setData('text/plain', `library:${element.dataset.bead}`);
      element.classList.add('dragging');
      app.querySelector('.bracelet-stage')?.classList.add('is-dragging', 'is-library-dragging');
    });
    element.addEventListener('dragend', () => {
      state.libraryDraggedId = null;
      element.classList.remove('dragging');
      app.querySelector('.bracelet-stage')?.classList.remove('is-dragging', 'is-library-dragging');
    });
    element.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return;
      const beadId = element.dataset.bead;
      const origin = { x: event.clientX, y: event.clientY };
      let dragging = false;
      let targetIndex = -1;
      let lastPoint = origin;

      const handleMove = (moveEvent) => {
        lastPoint = { x: moveEvent.clientX, y: moveEvent.clientY };
        if (!dragging && Math.hypot(lastPoint.x - origin.x, lastPoint.y - origin.y) < 7) return;
        moveEvent.preventDefault();
        if (!dragging) {
          dragging = true;
          state.libraryDraggedId = beadId;
          element.classList.add('dragging');
          app.querySelector('.bracelet-stage')?.classList.add('is-dragging', 'is-library-dragging');
        }
        if (isPointInStage(lastPoint.x, lastPoint.y)) targetIndex = findNearestInsertIndex(lastPoint.x, lastPoint.y);
      };

      const handleUp = () => {
        if (dragging) {
          if (isPointInStage(lastPoint.x, lastPoint.y)) insertLibraryBead(beadId, targetIndex);
          state.libraryDraggedId = null;
          state.dragTargetIndex = -1;
          render();
        }
        window.removeEventListener('pointermove', handleMove);
        window.removeEventListener('pointerup', handleUp);
      };

      window.addEventListener('pointermove', handleMove, { passive: false });
      window.addEventListener('pointerup', handleUp, { once: true });
    });
  });
  app.querySelectorAll('[data-category]').forEach((element) => element.addEventListener('click', () => {
    state.activeCategory = element.dataset.category;
    render();
  }));
  app.querySelector('#search')?.addEventListener('input', (event) => {
    state.search = event.target.value;
    state.selectedBeadIndex = -1;
    state.selectedBeadUids.clear();
    render();
    const input = app.querySelector('#search');
    input.focus();
    input.setSelectionRange(state.search.length, state.search.length);
  });
  app.querySelector('#size-range')?.addEventListener('input', (event) => {
    state.braceletSize = Number(event.target.value);
    state.saved = false;
    render();
  });
  app.querySelectorAll('[data-index]').forEach((element) => element.addEventListener('click', (event) => {
    const index = Number(element.dataset.index);
    const uid = state.design[index].uid;
    const additive = state.multiSelectMode || event.ctrlKey || event.metaKey;
    if (event.shiftKey && state.selectionAnchorIndex >= 0) {
      const start = Math.min(state.selectionAnchorIndex, index);
      const end = Math.max(state.selectionAnchorIndex, index);
      if (!additive) state.selectedBeadUids.clear();
      state.design.slice(start, end + 1).forEach((bead) => state.selectedBeadUids.add(bead.uid));
    } else if (additive) {
      if (state.selectedBeadUids.has(uid)) state.selectedBeadUids.delete(uid);
      else state.selectedBeadUids.add(uid);
      state.selectionAnchorIndex = index;
    } else {
      selectOnly(index);
    }
    state.selectedBeadIndex = state.selectedBeadUids.has(uid)
      ? index
      : selectedIndexes().at(-1) ?? -1;
    if (state.selectedBeadIndex >= 0) state.selectedLibraryId = state.design[state.selectedBeadIndex].beadId;
    state.contextMenu = null;
    render();
  }));
  app.querySelectorAll('[data-index]').forEach((element) => {
    element.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      const index = Number(element.dataset.index);
      if (!state.selectedBeadUids.has(state.design[index].uid)) selectOnly(index);
      else state.selectedBeadIndex = index;
      state.selectedLibraryId = state.design[index].beadId;
      state.contextMenu = {
        index,
        selectedUids: state.selectedBeadUids.has(state.design[index].uid)
          ? [...state.selectedBeadUids]
          : [state.design[index].uid],
        x: Math.max(12, Math.min(event.clientX, window.innerWidth - 276)),
        y: Math.max(12, Math.min(event.clientY, window.innerHeight - 370)),
      };
      render();
    });
    element.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return;
      const sourceIndex = Number(element.dataset.index);
      const origin = { x: event.clientX, y: event.clientY };
      let dragging = false;
      let targetIndex = -1;
      element.setPointerCapture(event.pointerId);

      const handleMove = (moveEvent) => {
        if (!dragging && Math.hypot(moveEvent.clientX - origin.x, moveEvent.clientY - origin.y) < 6) return;
        moveEvent.preventDefault();
        if (!dragging) {
          dragging = true;
          state.draggedBeadIndex = sourceIndex;
          element.classList.add('dragging');
          app.querySelector('.bracelet-stage')?.classList.add('is-dragging');
        }
        element.style.setProperty('--drag-x', `${moveEvent.clientX - origin.x}px`);
        element.style.setProperty('--drag-y', `${moveEvent.clientY - origin.y}px`);
        targetIndex = findNearestInsertIndex(moveEvent.clientX, moveEvent.clientY);
      };

      const handleUp = () => {
        if (!dragging) {
          window.removeEventListener('pointermove', handleMove);
          window.removeEventListener('pointerup', handleUp);
          window.removeEventListener('mousemove', handleMove);
          window.removeEventListener('mouseup', handleUp);
          return;
        }
        moveSelectionToInsert(sourceIndex, targetIndex);
        state.draggedBeadIndex = -1;
        state.dragTargetIndex = -1;
        state.contextMenu = null;
        render();
        window.removeEventListener('pointermove', handleMove);
        window.removeEventListener('pointerup', handleUp);
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('mouseup', handleUp);
      };

      window.addEventListener('pointermove', handleMove, { passive: false });
      window.addEventListener('pointerup', handleUp, { once: true });
      window.addEventListener('mousemove', handleMove, { passive: false });
      window.addEventListener('mouseup', handleUp, { once: true });
    });
    element.addEventListener('dragstart', (event) => {
      state.draggedBeadIndex = Number(element.dataset.index);
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', element.dataset.index);
      element.classList.add('dragging');
      app.querySelector('.bracelet-stage')?.classList.add('is-dragging');
    });
    element.addEventListener('dragend', () => {
      state.draggedBeadIndex = -1;
      state.dragTargetIndex = -1;
      element.classList.remove('dragging');
      app.querySelector('.bracelet-stage')?.classList.remove('is-dragging');
    });
  });
  app.querySelector('.bracelet-stage')?.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = state.libraryDraggedId ? 'copy' : 'move';
    findNearestInsertIndex(event.clientX, event.clientY);
  });
  app.querySelector('.bracelet-stage')?.addEventListener('drop', (event) => {
    event.preventDefault();
    const targetIndex = findNearestInsertIndex(event.clientX, event.clientY);
    const libraryId = state.libraryDraggedId || event.dataTransfer.getData('application/x-bead-id') || event.dataTransfer.getData('text/plain').replace(/^library:/, '');
    if (state.libraryDraggedId || event.dataTransfer.getData('text/plain').startsWith('library:')) {
      insertLibraryBead(libraryId, targetIndex);
    } else {
      const sourceIndex = state.draggedBeadIndex >= 0 ? state.draggedBeadIndex : Number(event.dataTransfer.getData('text/plain'));
      moveSelectionToInsert(sourceIndex, targetIndex);
    }
    state.draggedBeadIndex = -1;
    state.libraryDraggedId = null;
    state.dragTargetIndex = -1;
    state.contextMenu = null;
    render();
  });
  app.querySelector('[data-property="size"]')?.addEventListener('input', (event) => {
    const index = state.contextMenu?.index;
    if (index == null) return;
    const size = Number(event.target.value);
    state.design[index].size = size;
    state.saved = false;
    app.querySelector('[data-size-value]').textContent = `${size} mm`;
    app.querySelector(`.bracelet-bead[data-index="${index}"]`)?.style.setProperty('--scale', 0.68 + (size / 20) * 0.55);
  });
  app.querySelector('[data-property="size"]')?.addEventListener('change', () => render());
  app.querySelector('[data-property="tone"]')?.addEventListener('input', (event) => {
    const index = state.contextMenu?.index;
    if (index == null) return;
    state.design[index].tone = event.target.value;
    state.design[index].color = '自定义色';
    state.saved = false;
    app.querySelector(`.bracelet-bead[data-index="${index}"]`)?.style.setProperty('--bead-tone', event.target.value);
    app.querySelector('.mini-bead')?.style.setProperty('--bead-tone', event.target.value);
  });
  app.querySelector('[data-property="tone"]')?.addEventListener('change', () => render());
  app.querySelector('#material-photo')?.addEventListener('change', async (event) => {
    const [file] = event.target.files;
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      state.managerError = '请选择图片文件';
      render();
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      state.managerError = '原图不能超过 15 MB';
      render();
      return;
    }
    try {
      state.managerDraftPhoto = await optimizeMaterialPhoto(file);
      state.managerError = '';
      const uploader = app.querySelector('.photo-uploader');
      uploader.querySelector('img')?.remove();
      uploader.querySelectorAll(':scope > span, :scope > strong, :scope > small').forEach((element) => element.remove());
      const preview = document.createElement('img');
      preview.src = state.managerDraftPhoto;
      preview.alt = '待添加素材预览';
      uploader.insertBefore(preview, event.target);
      uploader.classList.add('has-photo');
    } catch {
      state.managerError = '图片处理失败，请换一张图片';
      render();
    }
  });
  app.querySelector('#material-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (!state.managerDraftPhoto) {
      state.managerError = '请先拍照或上传素材图片';
      render();
      return;
    }
    const material = {
      id: `custom-${crypto.randomUUID()}`,
      name: String(form.get('name')).trim(),
      type: String(form.get('type')).trim(),
      category: String(form.get('category')).trim(),
      material: String(form.get('material')).trim() || '自有素材',
      size: Number(form.get('size')),
      shape: String(form.get('shape')),
      color: String(form.get('color')).trim() || '实物颜色',
      tone: String(form.get('tone')),
      finish: String(form.get('finish')).trim() || '实物表面',
      note: '用户拍照上传的自有珠子或配件',
      photo: state.managerDraftPhoto,
      custom: true,
      createdAt: new Date().toISOString(),
    };
    try {
      await saveCustomMaterial(material);
      customMaterials.push(material);
      state.managerDraftPhoto = '';
      state.managerError = '';
      state.selectedLibraryId = material.id;
      state.activeCategory = '我的素材';
      state.exportNotice = '素材已保存';
      render();
      setTimeout(() => {
        state.exportNotice = '';
        render();
      }, 2200);
    } catch {
      state.managerError = '素材保存失败，请检查浏览器存储空间';
      render();
    }
  });
  app.querySelectorAll('[data-delete-material]').forEach((element) => element.addEventListener('click', async () => {
    const id = element.dataset.deleteMaterial;
    if (state.design.some((item) => item.beadId === id)) return;
    await deleteCustomMaterial(id);
    customMaterials = customMaterials.filter((bead) => bead.id !== id);
    if (state.selectedLibraryId === id) state.selectedLibraryId = builtInBeads[0].id;
    render();
  }));
  app.querySelectorAll('[data-delete-category]').forEach((element) => element.addEventListener('click', () => {
    const category = element.dataset.deleteCategory;
    if (customMaterials.some((bead) => bead.category === category)) {
      state.managerError = '该类目中还有素材，需先删除或移动素材';
      render();
      return;
    }
    customCategories = customCategories.filter((item) => item !== category);
    localStorage.setItem('beadloom-custom-categories', JSON.stringify(customCategories));
    render();
  }));
  app.querySelector('.bead-context-menu')?.addEventListener('contextmenu', (event) => event.preventDefault());
  app.querySelector('.context-backdrop')?.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    state.contextMenu = null;
    render();
  });
  app.querySelectorAll('[data-action]').forEach((element) => element.addEventListener('click', () => {
    if (element.matches('input')) return;
    handleAction(element.dataset.action);
  }));
}

function handleAction(action) {
  if (action === 'open-manager') {
    state.libraryManagerOpen = true;
    state.managerError = '';
  }
  if (action === 'close-manager') {
    state.libraryManagerOpen = false;
    state.managerDraftPhoto = '';
    state.managerError = '';
  }
  if (action === 'add-category') {
    const value = app.querySelector('#new-category')?.value.trim();
    if (!value) return;
    const existing = new Set([...allMaterials().map((bead) => bead.category), ...customCategories]);
    if (existing.has(value)) {
      state.managerError = '这个类目已经存在';
      render();
      return;
    }
    customCategories.push(value);
    localStorage.setItem('beadloom-custom-categories', JSON.stringify(customCategories));
    state.managerError = '';
  }
  if (action === 'add') {
    state.design.push(createBeadInstance(state.selectedLibraryId));
    selectOnly(state.design.length - 1);
    state.saved = false;
  }
  if (action === 'toggle-multi') {
    state.multiSelectMode = !state.multiSelectMode;
  }
  if (action === 'select-all') {
    state.multiSelectMode = true;
    state.selectedBeadUids = new Set(state.design.map((bead) => bead.uid));
    state.selectedBeadIndex = 0;
    state.selectionAnchorIndex = 0;
  }
  if (action === 'duplicate' && state.selectedBeadUids.size) {
    const indexes = selectedIndexes();
    const clones = indexes.map((index) => createBeadInstance(state.design[index].beadId, { ...state.design[index], uid: undefined }));
    const insertAt = indexes.at(-1) + 1;
    state.design.splice(insertAt, 0, ...clones);
    state.selectedBeadUids = new Set(clones.map((bead) => bead.uid));
    state.selectedBeadIndex = insertAt;
    state.selectionAnchorIndex = insertAt;
    state.saved = false;
  }
  if (action === 'delete' && state.selectedBeadUids.size && state.design.length > state.selectedBeadUids.size) {
    const firstIndex = selectedIndexes()[0];
    state.design = state.design.filter((bead) => !state.selectedBeadUids.has(bead.uid));
    selectOnly(Math.min(firstIndex, state.design.length - 1));
    state.saved = false;
  }
  if (action === 'move-left' && state.selectedBeadUids.size) {
    for (let index = 1; index < state.design.length; index += 1) {
      if (state.selectedBeadUids.has(state.design[index].uid) && !state.selectedBeadUids.has(state.design[index - 1].uid)) {
        [state.design[index - 1], state.design[index]] = [state.design[index], state.design[index - 1]];
      }
    }
    state.selectedBeadIndex = state.design.findIndex((bead) => bead.uid === [...state.selectedBeadUids][0]);
    state.selectionAnchorIndex = state.selectedBeadIndex;
    state.saved = false;
  }
  if (action === 'move-right' && state.selectedBeadUids.size) {
    for (let index = state.design.length - 2; index >= 0; index -= 1) {
      if (state.selectedBeadUids.has(state.design[index].uid) && !state.selectedBeadUids.has(state.design[index + 1].uid)) {
        [state.design[index + 1], state.design[index]] = [state.design[index], state.design[index + 1]];
      }
    }
    state.selectedBeadIndex = state.design.findIndex((bead) => bead.uid === [...state.selectedBeadUids][0]);
    state.selectionAnchorIndex = state.selectedBeadIndex;
    state.saved = false;
  }
  if (action === 'clear-selection') {
    state.selectedBeadIndex = -1;
    state.selectedBeadUids.clear();
    state.contextMenu = null;
  }
  if (action === 'close-context') state.contextMenu = null;
  if (action === 'context-duplicate' && state.contextMenu) {
    const index = state.contextMenu.index;
    state.design.splice(index + 1, 0, createBeadInstance(state.design[index].beadId, { ...state.design[index], uid: undefined }));
    selectOnly(index + 1);
    state.contextMenu = null;
    state.saved = false;
  }
  if (action === 'reset-bead' && state.contextMenu) {
    const index = state.contextMenu.index;
    const current = state.design[index];
    state.design[index] = createBeadInstance(current.beadId, { uid: current.uid });
    state.selectedLibraryId = current.beadId;
    state.contextMenu = null;
    state.saved = false;
  }
  if (action === 'context-delete' && state.contextMenu) {
    const index = state.contextMenu.index;
    const selectedUids = new Set(state.contextMenu.selectedUids ?? [state.design[index]?.uid]);
    if (selectedUids.size >= state.design.length) return;
    state.design = state.design.filter((bead) => !selectedUids.has(bead.uid));
    selectOnly(Math.min(index, state.design.length - 1));
    state.selectedLibraryId = state.design[state.selectedBeadIndex].beadId;
    state.contextMenu = null;
    state.saved = false;
  }
  if (action === 'reset') {
    state.design = createInitialDesign();
    selectOnly(-1);
    state.selectedLibraryId = 'amber';
    state.braceletSize = 17.5;
    state.multiSelectMode = false;
    state.contextMenu = null;
    state.saved = false;
  }
  if (action === 'save') {
    localStorage.setItem('beadloom-design', JSON.stringify({ design: state.design, braceletSize: state.braceletSize }));
    state.saved = true;
  }
  if (action === 'export') exportDesign();
  render();
}

function hexToRgb(hex) {
  const value = hex.replace('#', '');
  const normalized = value.length === 3 ? value.split('').map((character) => character + character).join('') : value;
  const number = Number.parseInt(normalized, 16);
  return { r: (number >> 16) & 255, g: (number >> 8) & 255, b: number & 255 };
}

function mixColor(hex, target, amount) {
  const source = hexToRgb(hex);
  const mixed = {
    r: Math.round(source.r + (target.r - source.r) * amount),
    g: Math.round(source.g + (target.g - source.g) * amount),
    b: Math.round(source.b + (target.b - source.b) * amount),
  };
  return `rgb(${mixed.r}, ${mixed.g}, ${mixed.b})`;
}

function drawExportBead(context, bead, x, y, radius, photoImage = null) {
  context.save();
  context.shadowColor = 'rgba(58, 43, 32, .24)';
  context.shadowBlur = radius * 0.32;
  context.shadowOffsetX = radius * 0.12;
  context.shadowOffsetY = radius * 0.18;

  if (photoImage) {
    const height = bead.shape === 'spacer' ? radius * .8 : bead.shape === 'charm' ? radius * 1.8 : radius * 2;
    context.beginPath();
    if (bead.shape === 'spacer') context.roundRect(x - radius, y - height / 2, radius * 2, height, height / 2);
    else if (bead.shape === 'charm') context.roundRect(x - radius * .8, y - height / 2, radius * 1.6, height, radius * .45);
    else context.arc(x, y, radius, 0, Math.PI * 2);
    context.clip();
    context.drawImage(photoImage, x - radius, y - radius, radius * 2, radius * 2);
    const overlay = context.createLinearGradient(x - radius, y - radius, x + radius, y + radius);
    overlay.addColorStop(0, 'rgba(255,255,255,.25)');
    overlay.addColorStop(.52, 'rgba(255,255,255,0)');
    overlay.addColorStop(1, 'rgba(30,22,18,.18)');
    context.fillStyle = overlay;
    context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    context.restore();
    return;
  }

  if (bead.id === 'silver') {
    const height = Math.max(12, radius * 0.72);
    const gradient = context.createLinearGradient(x - radius, y - height, x + radius, y + height);
    gradient.addColorStop(0, '#f1f1ec');
    gradient.addColorStop(.42, '#929792');
    gradient.addColorStop(.7, '#e4e5df');
    gradient.addColorStop(1, '#858a86');
    context.fillStyle = gradient;
    context.beginPath();
    context.roundRect(x - radius, y - height / 2, radius * 2, height, height / 2);
    context.fill();
    context.restore();
    return;
  }

  const gradient = context.createRadialGradient(x - radius * .34, y - radius * .38, radius * .06, x, y, radius * 1.08);
  gradient.addColorStop(0, mixColor(bead.tone, { r: 255, g: 244, b: 215 }, .72));
  gradient.addColorStop(.24, mixColor(bead.tone, { r: 255, g: 255, b: 255 }, .2));
  gradient.addColorStop(.65, bead.tone);
  gradient.addColorStop(1, mixColor(bead.tone, { r: 45, g: 32, b: 25 }, .34));
  context.fillStyle = gradient;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
  context.shadowColor = 'transparent';

  context.fillStyle = 'rgba(255,255,255,.35)';
  context.beginPath();
  context.ellipse(x - radius * .3, y - radius * .38, radius * .23, radius * .1, -.55, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = 'rgba(48,35,29,.56)';
  context.beginPath();
  context.arc(x, y, Math.max(3, radius * .1), 0, Math.PI * 2);
  context.fill();
  context.restore();
}

function drawRoundedPanel(context, x, y, width, height, radius) {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
  context.fill();
}

function loadExportImage(source) {
  return new Promise((resolve) => {
    if (!source) return resolve(null);
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = source;
  });
}

async function exportDesign() {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 1000;
  const context = canvas.getContext('2d');
  const beads = state.design.map((instance) => getBead(instance));
  const photoImages = await Promise.all(beads.map((bead) => loadExportImage(bead.photo)));
  const { length, gap } = totals();

  context.fillStyle = '#f4f0e9';
  context.fillRect(0, 0, canvas.width, canvas.height);
  const wash = context.createRadialGradient(565, 500, 80, 565, 500, 520);
  wash.addColorStop(0, 'rgba(226,215,201,.65)');
  wash.addColorStop(1, 'rgba(244,240,233,0)');
  context.fillStyle = wash;
  context.fillRect(0, 0, 1120, 1000);

  context.fillStyle = '#292823';
  context.font = '700 42px Georgia, "Noto Sans SC", serif';
  context.fillText('串拾 · 春日留白', 84, 96);
  context.fillStyle = '#9a9389';
  context.font = '500 16px "Noto Sans SC", sans-serif';
  context.fillText('BEADLOOM DESIGN SHEET', 86, 130);

  const centerX = 565;
  const centerY = 505;
  const orbitRadius = 290;
  context.strokeStyle = 'rgba(154,142,128,.28)';
  context.lineWidth = 2;
  context.beginPath();
  context.arc(centerX, centerY, orbitRadius + 47, 0, Math.PI * 2);
  context.stroke();
  context.setLineDash([8, 10]);
  context.beginPath();
  context.arc(centerX, centerY, orbitRadius - 82, 0, Math.PI * 2);
  context.stroke();
  context.setLineDash([]);

  beads.forEach((bead, index) => {
    const angle = (Math.PI * 2 * index / beads.length) - Math.PI / 2;
    const radius = 31 + (bead.size / 20) * 18;
    drawExportBead(context, bead, centerX + Math.cos(angle) * orbitRadius, centerY + Math.sin(angle) * orbitRadius, radius, photoImages[index]);
  });

  context.textAlign = 'center';
  context.fillStyle = '#a19a90';
  context.font = '500 14px "Noto Sans SC", sans-serif';
  context.fillText('HANDMADE · 手围', centerX, centerY - 28);
  context.fillStyle = '#6f6b63';
  context.font = '400 72px Georgia, serif';
  context.fillText(state.braceletSize.toFixed(1), centerX, centerY + 45);
  context.fillStyle = '#a19a90';
  context.font = '400 16px "Noto Sans SC", sans-serif';
  context.fillText('cm', centerX, centerY + 76);
  context.textAlign = 'left';

  context.fillStyle = '#fbf9f5';
  drawRoundedPanel(context, 1135, 62, 390, 876, 16);
  context.fillStyle = '#292823';
  context.font = '700 25px "Noto Sans SC", sans-serif';
  context.fillText('设计明细', 1184, 120);

  const metrics = [
    ['手围', `${state.braceletSize.toFixed(1)} cm`],
    ['珠子数量', `${beads.length} 颗`],
    ['珠子总长', `${length} mm`],
    ['预留空隙', `${gap} mm`],
  ];
  metrics.forEach(([label, value], index) => {
    const y = 170 + index * 62;
    context.fillStyle = '#9a9389';
    context.font = '400 15px "Noto Sans SC", sans-serif';
    context.fillText(label, 1184, y);
    context.fillStyle = '#34322d';
    context.font = '600 21px "Noto Sans SC", sans-serif';
    context.textAlign = 'right';
    context.fillText(value, 1475, y);
    context.textAlign = 'left';
  });

  context.strokeStyle = '#e1dbd2';
  context.beginPath();
  context.moveTo(1184, 408);
  context.lineTo(1475, 408);
  context.stroke();
  context.fillStyle = '#8f887e';
  context.font = '500 14px "Noto Sans SC", sans-serif';
  context.fillText('材料清单', 1184, 446);

  const grouped = new Map();
  beads.forEach((bead) => {
    const key = `${bead.id}-${bead.size}-${bead.tone}`;
    if (!grouped.has(key)) grouped.set(key, { bead, count: 0 });
    grouped.get(key).count += 1;
  });
  [...grouped.values()].slice(0, 9).forEach(({ bead, count }, index) => {
    const y = 492 + index * 49;
    context.fillStyle = bead.tone;
    context.beginPath();
    context.arc(1194, y - 5, 8, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = '#49463f';
    context.font = '500 15px "Noto Sans SC", sans-serif';
    context.fillText(`${bead.name} · ${bead.size} mm`, 1215, y);
    context.textAlign = 'right';
    context.fillStyle = '#777168';
    context.fillText(`× ${count}`, 1475, y);
    context.textAlign = 'left';
  });

  context.fillStyle = '#aaa39a';
  context.font = '400 13px "Noto Sans SC", sans-serif';
  context.fillText(`导出时间 ${new Date().toLocaleString('zh-CN')}`, 84, 948);
  context.textAlign = 'right';
  context.fillText('串拾 BEADLOOM · 设计仅供制作参考', 1516, 948);

  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `串拾-春日留白-${new Date().toISOString().slice(0, 10)}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    state.exportNotice = 'PNG 图片已生成';
    render();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      state.exportNotice = '';
      render();
    }, 2800);
  }, 'image/png');
}

document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
    event.preventDefault();
    handleAction('save');
  }
  if (event.key === '/' && document.activeElement?.tagName !== 'INPUT') {
    event.preventDefault();
    app.querySelector('#search')?.focus();
  }
  if (event.key === 'Escape' && (state.contextMenu || state.libraryManagerOpen)) {
    state.contextMenu = null;
    state.libraryManagerOpen = false;
    state.managerDraftPhoto = '';
    render();
  }
});

async function initializeApp() {
  try {
    customMaterials = await loadCustomMaterials();
  } catch {
    customMaterials = [];
  }
  const persisted = localStorage.getItem('beadloom-design');
  if (persisted) {
    try {
      const savedDesign = JSON.parse(persisted);
      if (Array.isArray(savedDesign.design) && savedDesign.design.length) {
        state.design = savedDesign.design.map((item) => typeof item === 'string' ? createBeadInstance(item) : createBeadInstance(item.beadId ?? item.id, item));
      }
      if (savedDesign.braceletSize) state.braceletSize = Number(savedDesign.braceletSize);
      state.saved = true;
    } catch { /* Ignore an invalid local draft and use the sample composition. */ }
  }
  selectOnly(Math.min(4, state.design.length - 1));
  state.selectedLibraryId = state.design[state.selectedBeadIndex]?.beadId ?? 'amber';
  render();
}

initializeApp();
