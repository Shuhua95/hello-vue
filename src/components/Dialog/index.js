import Dialog from './Dialog'

Dialog.install = function (Vue) {
  Vue.prototype.$dialog = Dialog
}

export default Dialog