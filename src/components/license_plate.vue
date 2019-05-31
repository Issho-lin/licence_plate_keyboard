<template>
  <div class="license-plate noselect">
    <div class="cph-box">
      <h3>请输入车牌号</h3>
      <div class="cph-wrap cph-wrap-shadow">
        <span :class="{active: (clickIndex)==index}" v-for="(item, index) in shadow" :key="index" @click="cphInputClick(index)">{{ cph[index] || (index===7 ? '+' : '') }}</span>
      </div>
      <!-- <div class="cph-wrap" style="z-index: 2" @click="cphInputClick">
        <span :class="{active: (activeIndex-1)==index}" v-for="(item,index) in cph" :key="index">{{item}}</span>
      </div> -->
    </div>
    <transition name="slide">
      <div class="keyboard-wrap" @click="clickBoard" v-show="show_keyboard">
        <div class="close"><a href="javascript:;" @click="closeBoard">关闭</a></div>
        <div v-if="activeIndex==0">
          <div class="keyboard">
            <span @touchstart="touchstart" @touchend="touchend" v-for="(item, index) in provice.slice(0,10)" :key="index">{{ item }}</span>
          </div>
          <div class="keyboard">
            <span @touchstart="touchstart" @touchend="touchend" v-for="(item, index) in provice.slice(10,19)" :key="index">{{ item }}</span>
          </div>
          <div class="keyboard">
            <span @touchstart="touchstart" @touchend="touchend" v-for="(item, index) in provice.slice(19,26)" :key="index">{{ item }}</span>
          </div>
          <div class="keyboard">
            <span @touchstart="touchstart" @touchend="touchend" v-for="(item, index) in provice.slice(26)" :key="index">{{ item }}</span>
            <span @touchstart="touchstart" @touchend="touchend" class="k-del"></span>
          </div>
        </div>
        <div v-else>
          <div class="keyboard" v-if="activeIndex > 1">
            <span @touchstart="touchstart" @touchend="touchend" v-for="(item, index) in numbers" :key="index">{{ item }}</span>
          </div>
          <div class="keyboard">
            <span @touchstart="touchstart" @touchend="touchend" v-for="(item, index) in letters.slice(0,10)" :key="index">{{ item }}</span>
          </div>
          <div class="keyboard">
            <span @touchstart="touchstart" @touchend="touchend" v-for="(item, index) in letters.slice(10,19)" :key="index">{{ item }}</span>
          </div>
          <div class="keyboard">
            <span @touchstart="touchstart" @touchend="touchend" class="k-done" id="k-done2" v-if="activeIndex<6 && isOk">完成</span>
            <span @touchstart="touchstart" @touchend="touchend" v-for="(item, index) in letters.slice(19)" :key="index">{{ item }}</span>
            <span @touchstart="touchstart" @touchend="touchend" class="k-del"></span>
          </div>
          <div class="keyboard" v-if="activeIndex>=6">
            <span @touchstart="touchstart" @touchend="touchend" v-for="(item, index) in specials" :key="index">{{ item }}</span>
            <span @touchstart="touchstart" @touchend="touchend" class="k-done">完成</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'license-plate',

    data() {
      return {
        provice: ["京", "津", "沪", "渝", "翼", "豫", "云", "辽", "黑", "湘", "皖", "鲁", "新", "苏", "浙", "赣", "鄂", "桂", "甘", "晋", "蒙", "陕", "吉", "闵", "贵", "粤", "青", "藏", "川", "宁", "琼", "使"],
        numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        letters: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"],
        specials: ['领', '警', '港', '澳', '学', '挂'],
        cph: [],
        newCph: [],
        shadow: new Array(8),
        show_keyboard: false,
        clickIndex: 0,
        isOk: false
      }
    },
    methods: {
      clickBoard(e) {
        if (e.target.tagName.toLowerCase() == 'span') {
          if (e.target.className.indexOf('k') == -1 && this.clickIndex < 8) {
            // this.cph.push(e.target.textContent)
            // console.log(this.clickIndex)
            this.cph[this.clickIndex] = e.target.textContent
            // console.log(this.cph)
            this.newCph = this.cph
            this.clickIndex++
            if (this.clickIndex > 7) this.clickIndex = 7
          }
          if (e.target.className == 'k-del') {
            // this.cph.pop()
            this.newCph[this.clickIndex] = ''
            this.cph = this.newCph
            this.clickIndex--
            if (this.clickIndex < 0) this.clickIndex = 0
          }
          if (e.target.className == 'k-done') {
            // this.setPlateNumber(this.cph)
            this.cphInputClick()
            this.$emit('plate-number', this.cph)
          }
        }
      },
      cphInputClick(i) {
        // console.log(i)
        this.clickIndex = i
        // console.log(this.clickIndex);
        this.show_keyboard = true
      },
      closeBoard() {
        this.show_keyboard = false
      },
      touchstart(e) {
        e.target.classList.add('active_key')
      },
      touchend(e) {
        e.target.classList.remove('active_key')
      }
    },
    computed: {
      activeIndex() {
        this.isOk = this.cph.length>=6 && !this.cph.filter((item, index) => { return index < 6 }).includes('')
        return this.clickIndex
      }
    }
  }
</script>

<style scoped>

.noselect {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.license-plate .cph-wrap {
    display: flex;
    justify-content: flex-start;
    font-size: 18px;
    line-height: 40px;
    min-height: 40px;
    position: absolute;
    left: 15px;
    right: 15px;
    top: 94px;
}
.license-plate .cph-wrap-shadow {
    /* box-shadow: 0 1px 8px rgba(92,169,214,.43);
    background: #f7f7f7; */
    background-color: #fff;
    z-index: 0;
}
.license-plate .cph-wrap-shadow span {
    color: #0084ff !important;
    font-size: 18px;
}

.license-plate .cph-wrap span {
    position: relative;
    text-align: center;
    width: 29.5px;
    height: 40px;
    border-radius: 2px;
    border: 1px solid #999999;
    /* margin: 0 3.5px; */
    margin-right: 7px;
    background-color: #fff;
    color: #000;
    z-index: 99;
}
.license-plate .cph-wrap span:first-of-type {
    margin-left: 0;
}
.license-plate .cph-wrap span:nth-of-type(8) {
    margin-right: 0;
}
.license-plate .cph-wrap span:last-child::before {
    content: none;
}

.license-plate .cph-wrap .active {
    /* border-bottom: 3px solid #007AFF;  */
    /* background: #fff; */
    width: 29.5px;
    height: 40px;
    background-color: #CFD3DD;
}

.license-plate .keyboard-wrap {
    background: #CFD3DD;
    padding: 0px 2px 0;
    position: fixed;
    bottom: 0;
    width: 100%;
}
.license-plate .keyboard {
    display: flex;
    justify-content: center;
    flex-flow: row wrap;
    position: relative;
}
.license-plate .keyboard span {
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 2px #666;
    width: calc(10% - 4px);
    text-align: center;
    height: 46px;
    line-height: 46px;
    margin: 0 2px 8px;
    font-size: 16px;
}

.license-plate .keyboard > div {
    display: flex;
}

.license-plate .keyboard .k-del {
    background: #ABB1BD url(../static/img/x-mark.svg) no-repeat center center;
    width: 40px;
    position: absolute;
    right: 2px;
    display: block;

}

.license-plate .keyboard .k-del img {
   display: block;
    margin: 9px auto; 
}
.license-plate .keyboard .k-done {
    width: 60px;
    position: absolute;
    right: 2px;
    display: block;
    background-color: #0084FF;
    color: #fff;
}
.license-plate .keyboard #k-done2 {
  left: 2px;
  width: 40px;
}
.license-plate .slide-enter-active, .slide-leave-active {
    transition: all .3s;
    opacity: 1;
    transform: translateY(0);
}
.license-plate .slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(400px);
}
.cph-box {
    position: relative;
    width: 315px;
    height: 180px;
    margin: 65px auto;
    background-color: #fff;
    border-radius: 5px;
}
.cph-box h3 {
    font-size: 18px;
    color: #fff;
    background-color: #0084FF;
    text-align: center;
    line-height: 50px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    font-weight: normal;
}
.close {
    background-color: #fff;
    margin-bottom: 10px;
    line-height: 40px;
    padding-right: 10px;
    display: flex;
    justify-content: flex-end;
}
.close a {
    color: #000;
    text-decoration: none;
    display: block;
    width: 40px;
    height: 40px;
    text-align: center;
    font-size: 16px;
}
span.hide {
    opacity: 0;
}
.active_key {
  background-color: #000;
  opacity: 0.2;
}
</style>
