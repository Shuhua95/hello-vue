<template>
  <div
    class="el-tree"
    :class="{
        'el-tree--highlight-current': highlightCurrent,
        'is-dragging': !!dragState.draggingNode,
        'is-drop-not-allow': !dragState.allowDrop,
        'is-drop-inner': dragState.dropType === 'inner'
      }"
    role="tree"
  >
    <RecycleScroller
      :items="root.childNodes"
      :item-size="26"
      v-slot="{ item }"
    >
      <!--   v-for="child in root.childNodes" -->
      <el-tree-node
        :node="item"
        :props="props"
        :render-after-expand="renderAfterExpand"
        :show-checkbox="showCheckbox"
        :key="getNodeKey(item)"
        :render-content="renderContent"
        @node-expand="handleNodeExpand"
      ></el-tree-node>
      <div>
        {{ item.data.label }}
      </div>
    </RecycleScroller>
    <div class="el-tree__empty-block" v-if="isEmpty">
      <span class="el-tree__empty-text">{{ emptyText }}</span>
    </div>
    <div v-show="dragState.showDropIndicator" class="el-tree__drop-indicator" ref="dropIndicator"></div>
  </div>
</template>

<script>
import { Tree } from 'element-ui'
import { RecycleScroller } from 'vue-virtual-scroller'

export default {
  components: {
    RecycleScroller,
  },
  mixins: [Tree],
}
</script>
