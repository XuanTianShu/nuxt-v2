import Vue from 'vue'
import ElementUI from 'element-ui'
import html2canvas from 'html2canvas';
import VueAwesomeSwiper from 'vue-awesome-swiper'
// import QRCode from 'qrcode'


Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI)
Vue.prototype.$html2canvas = html2canvas;
// Vue.prototype.$QRCode = (text, callback) => {
//   QRCode.toDataURL(text, { errorCorrectionLevel: 'H' }, callback)
// }