/* Bootstrap Native - https://www.npmjs.com/package/bootstrap.native - https://thednp.github.io/bootstrap.native */
import Alert from './../../../../node_modules/bootstrap.native/src/components/alert-native.js'
import Button from './../../../../node_modules/bootstrap.native/src/components/button-native.js'
//import Carousel from './../../../../node_modules/bootstrap.native/src/components/carousel-native.js'
import Collapse from './../../../../node_modules/bootstrap.native/src/components/collapse-native.js'
import Dropdown from './../../../../node_modules/bootstrap.native/src/components/dropdown-native.js'
import Modal from './../../../../node_modules/bootstrap.native/src/components/modal-native.js'
import Popover from './../../../../node_modules/bootstrap.native/src/components/popover-native.js'
import ScrollSpy from './../../../../node_modules/bootstrap.native/src/components/scrollspy-native.js'
import Tab from './../../../../node_modules/bootstrap.native/src/components/tab-native.js'
import Toast from './../../../../node_modules/bootstrap.native/src/components/toast-native.js'
import Tooltip from './../../../../node_modules/bootstrap.native/src/components/tooltip-native.js'

import './../../../../node_modules/bootstrap.native/src/util/init.js'
import initCallback from './../../../../node_modules/bootstrap.native/src/util/initCallback.js'
import removeDataAPI from './../../../../node_modules/bootstrap.native/src/util/removeDataAPI.js'
import componentsInit from './../../../../node_modules/bootstrap.native/src/util/componentsInit.js'
import {version as Version} from './../../../../node_modules/bootstrap.native/package.json'

export default {
  Alert,
  Button,
//  Carousel,
  Collapse,
  Dropdown,
  Modal,
  Popover,
  ScrollSpy,
  Tab,
  Toast,
  Tooltip,

  initCallback,
  removeDataAPI,
  componentsInit,
  Version
}

/* Bootstrap Native */