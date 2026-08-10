import './style.css';

const beadLibrary = [
  { id: 'amber', name: '老蜜蜡', type: '琥珀', material: '有机宝石', size: 12, color: '琥珀金', tone: '#c77f32', category: '矿石', finish: '柔光蜡面', note: '温润通透，随光线呈现蜜糖层次' },
  { id: 'sandal', name: '小叶紫檀', type: '紫檀木', material: '木质', size: 10, color: '深绛红', tone: '#6f252c', category: '木质', finish: '细腻木纹', note: '沉稳含蓄，适合作为手串主材' },
  { id: 'lapis', name: '青金石', type: '半宝石', material: '矿石', size: 8, color: '群青蓝', tone: '#315b7d', category: '矿石', finish: '自然颗粒', note: '深蓝底色带点点金色矿斑' },
  { id: 'agate', name: '南红玛瑙', type: '玛瑙', material: '矿石', size: 10, color: '柿子红', tone: '#bd503a', category: '矿石', finish: '玻璃光泽', note: '色泽浓郁，适合做醒目点缀' },
  { id: 'jade', name: '和田玉', type: '软玉', material: '玉石', size: 12, color: '青白玉', tone: '#b8c2b6', category: '玉石', finish: '温润油光', note: '柔和的青白色，留白感很强' },
  { id: 'glass', name: '琉璃珠', type: '手工玻璃', material: '玻璃', size: 8, color: '烟灰紫', tone: '#817184', category: '玻璃', finish: '半透明', note: '轻盈通透，让整串更有呼吸感' },
  { id: 'silver', name: '银隔片', type: 'S925银', material: '金属', size: 6, color: '哑光银', tone: '#a6aaa6', category: '金属', finish: '拉丝表面', note: '作为节奏分隔，增加材质对比' },
  { id: 'tiger', name: '虎眼石', type: '石英', material: '矿石', size: 10, color: '金棕色', tone: '#95683c', category: '矿石', finish: '猫眼光带', note: '移动时会出现自然流动的光带' },
];

const initialDesignIds = [
  'sandal', 'sandal', 'lapis', 'sandal', 'amber', 'sandal', 'agate', 'sandal',
  'lapis', 'sandal', 'amber', 'sandal', 'sandal', 'jade', 'sandal', 'lapis',
];

function getBead(reference) {
  const id = typeof reference === 'string' ? reference : reference?.beadId ?? reference?.id;
  const base = beadLibrary.find((bead) => bead.id === id) ?? beadLibrary[0];
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
  selectedBeadIndex: 4,
  braceletSize: 17.5,
  design: createInitialDesign(),
  selectedBeadUids: new Set(),
  selectionAnchorIndex: 4,
  multiSelectMode: false,
  draggedBeadIndex: -1,
  libraryDraggedId: null,
  dragTargetIndex: -1,
  contextMenu: null,
  exportNotice: '',
  saved: false,
};

state.selectedBeadUids.add(state.design[4].uid);

const app = document.querySelector('#app');

function filteredBeads() {
  const query = state.search.trim().toLowerCase();
  return beadLibrary.filter((bead) => {
    const matchesCategory = state.activeCategory === '全部' || bead.category === state.activeCategory;
    const matchesSearch = !query || `${bead.name}${bead.type}${bead.material}`.toLowerCase().includes(query);
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
  const categories = ['全部', '木质', '矿石', '玉石', '玻璃', '金属'];
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
          <div class="panel-heading"><div><span class="section-kicker">COLLECTION</span><h1>珠子库</h1></div><span class="count-label">${beadLibrary.length} 件</span></div>
          <div class="search-box"><span>⌕</span><input id="search" type="search" value="${state.search}" placeholder="搜索珠子、材质..." aria-label="搜索珠子" /><kbd>/</kbd></div>
          <div class="category-tabs" role="tablist">${categories.map((category) => `<button class="category-tab ${state.activeCategory === category ? 'active' : ''}" data-category="${category}" role="tab" aria-selected="${state.activeCategory === category}">${category}</button>`).join('')}</div>
          <div class="bead-list">${beads.map((bead) => `
            <button class="bead-card ${state.selectedLibraryId === bead.id && state.selectedBeadIndex < 0 ? 'selected' : ''}" data-bead="${bead.id}" draggable="true" aria-pressed="${state.selectedLibraryId === bead.id && state.selectedBeadIndex < 0}" aria-label="${bead.name}，拖入手串或点击选择">
              <span class="bead-thumb ${bead.id}" style="${beadStyle(bead)}"><span></span></span>
              <span class="bead-card-copy"><strong>${bead.name}</strong><span>${bead.type} · ${bead.size} mm</span></span>
              <span class="add-symbol" aria-hidden="true">⠿</span>
            </button>`).join('') || '<p class="empty-state">没有找到匹配的珠子</p>'}</div>
          <button class="library-footer" data-action="add"><span>＋</span> 添加选中的珠子</button>
        </aside>

        <section class="design-panel">
          <div class="design-header"><div><span class="section-kicker">YOUR COMPOSITION</span><h2>春日留白 <button class="edit-title" aria-label="编辑设计名称">✎</button></h2><p>从左侧拖入珠子；多选后可批量移动、复制或删除</p></div><div class="view-controls"><button class="view-button active" aria-label="圆形视图">◉</button><button class="view-button" aria-label="平铺视图">☷</button></div></div>
          <div class="bracelet-stage" aria-label="手串预览区">
            <div class="stage-note top-note">可视化预览 <span></span></div>
            <div class="orbit orbit-outer"></div><div class="orbit orbit-inner"></div><div class="center-label"><span>HANDMADE</span><strong>${state.braceletSize.toFixed(1)}</strong><small>手围 cm</small></div>
            <div class="bracelet-beads">${state.design.map((instance, index) => {
              const bead = getBead(instance);
              const angle = (360 / state.design.length) * index - 90;
              const selected = state.selectedBeadUids.has(instance.uid);
              const primary = state.selectedBeadIndex === index;
              const scale = 0.68 + (bead.size / 20) * 0.55;
              return `<button class="bracelet-bead ${bead.id} ${selected ? 'selected' : ''} ${primary ? 'primary-selected' : ''}" data-index="${index}" draggable="true" aria-pressed="${selected}" aria-label="第 ${index + 1} 颗，${bead.name}${selected ? '，已选择' : ''}" style="--angle:${angle}deg;--scale:${scale};${beadStyle(bead)}"><span class="selection-check">✓</span><span class="bead-glow"></span><span class="bead-shine"></span></button>`;
            }).join('')}${state.design.map((_, insertIndex) => {
              const angle = (360 / state.design.length) * (insertIndex - 0.5) - 90;
              return `<span class="drop-slot" data-insert-index="${insertIndex}" style="--angle:${angle}deg" aria-hidden="true"><i></i></span>`;
            }).join('')}</div>
            <div class="stage-note bottom-note"><span class="legend-line"></span>拖拽插入 · Ctrl/Cmd 多选</div>
          </div>
          <div class="design-toolbar"><span class="toolbar-count"><strong>${state.design.length}</strong> 颗珠子</span><button class="multi-select-button ${state.multiSelectMode ? 'active' : ''}" data-action="toggle-multi" aria-pressed="${state.multiSelectMode}">✓ 多选${selectionCount ? ` · ${selectionCount}` : ''}</button><span class="toolbar-divider"></span><button data-action="select-all">全选</button><button data-action="duplicate" ${selectionCount < 1 ? 'disabled' : ''}>⧉ 复制${selectionCount > 1 ? ` ${selectionCount} 颗` : ''}</button><button data-action="move-left" ${selectionCount < 1 ? 'disabled' : ''}>← 左移</button><button data-action="move-right" ${selectionCount < 1 ? 'disabled' : ''}>右移 →</button><button class="delete-button" data-action="delete" ${selectionCount < 1 || selectionCount >= state.design.length ? 'disabled' : ''}>⌫ 删除${selectionCount > 1 ? ` ${selectionCount} 颗` : ''}</button></div>
        </section>

        <aside class="inspector-panel">
          <div class="inspector-heading"><span class="section-kicker">INSPECTOR</span><h2>${selectionCount > 1 ? `已选 ${selectionCount} 颗` : state.selectedBeadIndex >= 0 ? '已选珠子' : '准备添加'}</h2></div>
          <div class="selected-preview"><span class="large-bead ${selectedBead.id}" style="${beadStyle(selectedBead)}"><span></span></span><div><strong>${selectedBead.name}</strong><span>${selectedBead.type}</span></div><button data-action="clear-selection" aria-label="取消选择">×</button></div>
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
          <header><span class="mini-bead ${contextBead.id}" style="${beadStyle(contextBead)}"></span><div><small>${contextSelectionCount > 1 ? `已选 ${contextSelectionCount} 颗 · 当前第 ${state.contextMenu.index + 1} 颗` : `第 ${state.contextMenu.index + 1} 颗`}</small><strong>${contextBead.name}</strong></div><button data-action="close-context" aria-label="关闭">×</button></header>
          <div class="context-field"><label for="bead-size">珠子直径 <output data-size-value>${contextBead.size} mm</output></label><input id="bead-size" data-property="size" type="range" min="4" max="20" step="1" value="${contextBead.size}" /><div><span>4 mm</span><span>20 mm</span></div></div>
          <div class="context-field color-field"><label for="bead-color">珠子颜色</label><div><input id="bead-color" data-property="tone" type="color" value="${contextBead.tone}" /><span>${contextBead.color}</span></div></div>
          <div class="context-actions"><button data-action="context-duplicate">⧉ 复制此珠</button><button data-action="reset-bead">↺ 恢复默认</button></div>
          <button class="context-delete" data-action="context-delete" ${contextSelectionCount >= state.design.length ? 'disabled' : ''}>⌫ ${contextSelectionCount > 1 ? `删除已选 ${contextSelectionCount} 颗珠子` : '从手串中删除'}</button>
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
    selectOnly(4);
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

function drawExportBead(context, bead, x, y, radius) {
  context.save();
  context.shadowColor = 'rgba(58, 43, 32, .24)';
  context.shadowBlur = radius * 0.32;
  context.shadowOffsetX = radius * 0.12;
  context.shadowOffsetY = radius * 0.18;

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

function exportDesign() {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 1000;
  const context = canvas.getContext('2d');
  const beads = state.design.map((instance) => getBead(instance));
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
    drawExportBead(context, bead, centerX + Math.cos(angle) * orbitRadius, centerY + Math.sin(angle) * orbitRadius, radius);
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

document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
    event.preventDefault();
    handleAction('save');
  }
  if (event.key === '/' && document.activeElement?.tagName !== 'INPUT') {
    event.preventDefault();
    app.querySelector('#search')?.focus();
  }
  if (event.key === 'Escape' && state.contextMenu) {
    state.contextMenu = null;
    render();
  }
});

render();
