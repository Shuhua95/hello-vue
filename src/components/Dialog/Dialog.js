import Vue from 'vue'
import {
  Dialog as ElDialog,
} from 'element-ui'

let dialogInstance = null

const Dialog = ({
  props = {},
  children,
  event = {}
} = {}) => {
  const DialogConstructor = Vue.extend({
    name: 'Dialog',
    data() {
      return {
        visible: false
      }
    },
    methods: {
      open() {
        this.visible = true
      },
      close() {
        dialogInstance.handleClose()
      }
    },
    render(h) {
      const getChildren = children =>
        Object.entries(children)
        .map(([slot, Node]) =>
          slot === 'content' ?
          h(Node, {
            on: {
              close: this.close
            }
          }) : h(Node, {
            slot,
            on: {
              close: this.close
            }
          })
        )


      return h(ElDialog, {
        props: {
          ...props,
          visible: this.visible,
          appendToBody: true,
        },
        on: {
          'update:visible': visible => this.visible = visible,
          ...event,
        },
      }, getChildren(children))
    }
  })

  const instance = new DialogConstructor()
  instance.$mount()
  document.body.appendChild(instance.$el)

  dialogInstance = instance.$children[0]

  return instance
}

export default Dialog