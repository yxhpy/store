import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { 
  Tabbar, 
  TabbarItem, 
  Icon,
  NavBar,
  Search,
  Swipe,
  SwipeItem,
  Button,
  Toast,
  Dialog,
  Tab,
  Tabs,
  Card,
  Tag,
  List,
  Empty,
  SwipeCell,
  Stepper,
  Popup,
  Cell,
  CellGroup,
  PullRefresh,
  Rate,
  Field,
  ActionSheet,
  showSuccessToast,
  Image as VanImage,
  Uploader,
  Grid,
  GridItem,
  AddressList,
  AddressEdit,
  Collapse,
  CollapseItem,
  CouponCell,
  CouponList,
  CountDown
} from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// 注册 Vant 组件
app.use(Tabbar)
   .use(TabbarItem)
   .use(Icon)
   .use(NavBar)
   .use(Search)
   .use(Swipe)
   .use(SwipeItem)
   .use(Button)
   .use(Toast)
   .use(Dialog)
   .use(Tab)
   .use(Tabs)
   .use(Card)
   .use(Tag)
   .use(List)
   .use(Empty)
   .use(SwipeCell)
   .use(Stepper)
   .use(Popup)
   .use(Cell)
   .use(CellGroup)
   .use(PullRefresh)
   .use(Rate)
   .use(Field)
   .use(ActionSheet)
   .use(VanImage)
   .use(Uploader)
   .use(Grid)
   .use(GridItem)
   .use(AddressList)
   .use(AddressEdit)
   .use(Collapse)
   .use(CollapseItem)
   .use(CouponCell)
   .use(CouponList)
   .use(CountDown)

app.config.globalProperties.$showSuccessToast = showSuccessToast

app.mount('#app')

console.log('Main.js executed')
