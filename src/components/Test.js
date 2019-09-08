import { mapState } from 'vuex'

export default {
  name: 'test',
  functional: true,
  props: {
    cIs: {
      type: String,
      default: 'el-select'
    },
    cLabel: {
      type: String,
      default: '请设置label'
    },
  },
  computed: {
    ...mapState(['category']),
  },
  render(createElement, context) {
    const { cIs, cLabel } = context.props
    
    return createElement('div', [
      cLabel,
      createElement(cIs, context.data, context.children),
    ])
  }
}
