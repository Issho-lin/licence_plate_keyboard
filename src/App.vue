<template>
  <div id="app">
    <h3 class="merchant-title"><span v-cloak>{{ carPark }}--{{ merchantName }}</span></h3>
    <licensePlate v-if="page === 0" v-on:plate-number="setPlateNumber"></licensePlate>
    <div v-if="page === 1" class="status_page" v-cloak>
      <img src="./static/img/success.png" alt="" class="status_img">
      <p>提交成功！（{{ time }}秒后返回）</p>
    </div>
    <div v-if="page === 2" class="status_page" v-cloak>
      <img src="./static/img/fail.png" alt="" class="status_img">
      <p>提交失败！（{{ time }}秒后返回）</p>
    </div>
    <div v-if="page === 3" class="status_page" v-cloak>
      <img src="./static/img/fail.png" alt="" class="status_img">
      <p>{{ msg }}！（{{ time }}秒后返回）</p>
    </div>
  </div>
</template>

<script>
  import licensePlate from './components/license_plate.vue'
  import axios from 'axios'
  export default {
    name: 'app',
    components: {
      licensePlate
    },
    data() {
      return {
        carNo: null,
        id: null,
        baseUrl: null,
        url: null,
        page: 0,
        msg: null,
        carPark: null,
        merchantName: null,
        merchantCode: null,
        time: 5,
        inter: null
      }
    },
    methods: {
      setInterval() {
        this.inter = setInterval(() => {
          this.time--
            if (this.time === 0) {
              this.page = 0
              clearInterval(this.inter)
              this.time = 5
            }
        }, 1000)
      },
      setPlateNumber(arr) {
        this.carNo = arr.join('')
        axios.post(this.url, {
          carNo: this.carNo
        }).then(res => {
          if (res && res.data) {
            if (res.data.code === 0) {
              this.page = 1
            } else {
              this.msg = res.data.msg
              this.page = 3
            }
          } else {
            this.page = 2
          }
          this.setInterval()
        }).catch(err => {
          this.page = 2
          this.setInterval()
          return err
        })
      }
    },
    created() {
      this.id = window.location.href.split('=')[1].split('&')[0]
      this.url = `/clife-estate-api-web-admin/estate/merchant/detail/${this.id}.do`
      try {
        let infoArr = decodeURI(window.location.href.split('?')[1]).split('&')
        this.carPark = infoArr[1].split('=')[1]
        this.merchantName = infoArr[2].split('=')[1]
        this.merchantCode = infoArr[3].split('=')[1]
      } catch (err) {
        // console.log(err)
        return err
      }
    }
  }
</script>

<style>
  html {
    font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", "Microsoft Yahei", sans-serif;
    background: #f4f5f7;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  * {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  body {
    margin: 0;
  }
  .merchant-title {
    margin: 0 auto;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #2B303E;
    font-size: 17px;
    color: #fff;
    text-align: center;
  }
  .status_img {
    width: 70px;
    height: 87px;
  }
  .status_page {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      text-align: center;
  }
  .status_page p {
      font-size: 15px;
      color: #484848;
      margin-top: 25px;
  }
  [v-cloak] {
    display: none;
  }
</style>
