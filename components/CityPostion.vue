<template>
  <div class="positon u-flex-col nowarp" v-if="pageData">
    <!-- hotCity -->
    <div class="u-flex">
      <span class="c-6">热门城市</span>
      <ul class="u-flex">
        <li class="u-m-l-20" @click="scrollTo(i)" v-for="i in pageData.hotCity">
          {{ i.name }}
        </li>
      </ul>
    </div>
    <!-- cityInitial -->
    <div class="u-flex u-col-top u-m-t-20">
      <span class="c-6">按拼音首字母选择</span>
      <ul class="u-flex u-m-l-20">
        <li
          class="letter"
          @click="onhere(i)"
          :class="{ here: i == active_idx }"
          v-for="(i, index) in pageData.cityInitial"
          :key="index"
        >
          {{ i }}
        </li>
      </ul>
    </div>
    <!-- cityList -->
    <div class="cityList u-m-t-20" :style="style">
      <div
        class="u-m-b-20"
        :id="`${i.initial}`"
        v-for="(i, idx) in pageData.cityList"
        :key="idx"
      >
        <ul class="u-flex u-flex-wrap">
          <span class="u-font-16 bold u-m-r-20">{{ i.initial }}</span>
          <li
            class="u-m-r-20 c-6"
            :id="`city_${city.id}`"
            @click="scrollTo(city)"
            :class="{ cc: cityId == city.id }"
            v-for="(city, index) in i.list"
            :key="index"
          >
            {{ city.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageData: "",
      active_idx: "",
      cityId: "",
      style: {},
    };
  },
  methods: {
    onhere(i) {
      this.active_idx = i;
      this.$el
        .querySelector(`#${i}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    },
    scrollTo(city) {
      this.$emit("myEvent", city);
      this.cityId = city.id;
      this.$el
        .querySelector(`#city_${city.id}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    },
  },
};
</script>
<style lang="scss" scoped>
.positon {
  flex: 1;
  background-color: #fff;
  border-radius: 10px;
  padding: calc-px(30px);
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }

  ul {
    flex-wrap: wrap;
  }
  .cityList {
    min-height: 220px;
    max-height: 220px;
    overflow-y: scroll;
    line-height: 25px;
  }
  .letter {
    width: 24.51px;
    height: 24.51px;
    line-height: 24.51px;
    text-align: center;
  }
  .here {
    border-radius: 3px;
    color: #fff;
    background: #c9151e;
  }
}
</style>
