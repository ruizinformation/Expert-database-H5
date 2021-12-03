/*
 * @Author: zhangmin
 * @Date: 2021-02-25 10:22:38
 * @LastEditors: zhangmin
 * @LastEditTime: 2021-02-25 15:37:38
 * @Description: vant组件  按需引入
 */
import Vue from 'vue';

import {
    Button,
    Cell,
    CellGroup,
    Icon,
    Image as VanImage,
    Col,
    Row,
    Popup,
    Toast,
    Calendar,
    Cascader,
    Checkbox,
    CheckboxGroup,
    DatetimePicker,
    Field,
    Form,
    NumberKeyboard,
    PasswordInput,
    Picker,
    RadioGroup,
    Radio,
    Rate,
    Search,
    Slider,
    Stepper,
    Switch,
    Uploader,
    ActionSheet,
    Dialog,
    DropdownMenu,
    DropdownItem,
    Loading,
    Notify,
    Overlay,
    PullRefresh,
    ShareSheet,
    SwipeCell,
    Badge,
    Circle,
    Collapse,
    CollapseItem,
    CountDown,
    Divider,
    Empty,
    ImagePreview,
    Lazyload,
    List,
    NoticeBar,
    Popover,
    Progress,
    Skeleton,
    Step,
    Steps,
    Sticky,
    Swipe,
    SwipeItem,
    Tag,
    Grid,
    GridItem,
    IndexBar,
    IndexAnchor,
    NavBar,
    Pagination,
    Sidebar,
    SidebarItem,
    Tab,
    Tabs,
    Tabbar,
    TabbarItem,
    // TreeSelect,
    // AddressEdit,
    // AddressList,
    // Area,
    // Card,
    // ContactCard,
    // ContactEdit,
    // ContactList,
    // CouponCell,
    // CouponList,
    // GoodsAction,
    // GoodsActionIcon,
    // GoodsActionButton,
    // SubmitBar,
    // Sku
  } from 'vant'
  Vue.use(Button)
  Vue.use(Cell)
  Vue.use(CellGroup)
  Vue.use(Icon)
  Vue.use(VanImage)
  Vue.use(Col)
  Vue.use(Row)
  Vue.use(Popup)
  Vue.use(Toast)
  Vue.use(Calendar)
  Vue.use(Cascader)
  Vue.use(Checkbox)
  Vue.use(CheckboxGroup)
  Vue.use(DatetimePicker)
  Vue.use(Field)
  Vue.use(Form)
  Vue.use(NumberKeyboard)
  Vue.use(PasswordInput)
  Vue.use(NumberKeyboard)
  Vue.use(Picker)
  Vue.use(RadioGroup)
  Vue.use(Radio)
  Vue.use(Rate)
  Vue.use(Search)
  Vue.use(Slider)
  Vue.use(Stepper)
  Vue.use(Switch)
  Vue.use(Uploader)
  Vue.use(ActionSheet)
  Vue.use(Dialog)
  Vue.use(DropdownMenu)
  Vue.use(DropdownItem)
  Vue.use(Loading)
  Vue.use(Notify)
  Vue.use(Overlay)
  Vue.use(PullRefresh)
  Vue.use(ShareSheet)
  Vue.use(SwipeCell)
  Vue.use(Badge)
  Vue.use(Circle)
  Vue.use(Collapse)
  Vue.use(CollapseItem)
  Vue.use(CountDown)
  Vue.use(Divider)
  Vue.use(Empty)
  Vue.use(ImagePreview)
  Vue.use(Lazyload)
  Vue.use(List)
  Vue.use(NoticeBar)
  Vue.use(Popover)
  Vue.use(Progress)
  Vue.use(Skeleton)
  Vue.use(Step)
  Vue.use(Steps)
  Vue.use(Sticky)
  Vue.use(Swipe)
  Vue.use(SwipeItem)
  Vue.use(Tag)
  Vue.use(Grid)
  Vue.use(GridItem)
  Vue.use(IndexBar)
  Vue.use(IndexAnchor)
  Vue.use(NavBar)
  Vue.use(Pagination)
  Vue.use(Sidebar)
  Vue.use(SidebarItem)
  Vue.use(Tab)
  Vue.use(Tabs)
  Vue.use(Tabbar)
  Vue.use(TabbarItem)
  // Vue.use(TreeSelect)
  // Vue.use(AddressEdit)
  // Vue.use(AddressList)
  // Vue.use(Area)
  // Vue.use(Card)
  // Vue.use(ContactCard)
  // Vue.use(ContactEdit)
  // Vue.use(ContactList)
  // Vue.use(CouponCell)
  // Vue.use(CouponList)
  // Vue.use(GoodsAction)
  // Vue.use(GoodsActionIcon)
  // Vue.use(GoodsActionButton)
  // Vue.use(SubmitBar)
  // Vue.use(Sku)
  Vue.prototype.$toast = Toast