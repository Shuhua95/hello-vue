<template>
  <section class="tween">
    <main>
      <div class="wrapper">
        <span class="target" v-for="item in list" :key="item">{{item}}</span>
      </div>

      <div ref="box" class="box"></div>

      <div ref="p">在相关论文《Chinese Text in the Wild》中，清华大学的研究人员以该数据集为基础训练了多种目前业内最先进的深度模型进行字符识别和字符检测。这些模型将作为基线算法为人们提供测试标准。这些图像源于腾讯街景，从中国的几十个不同城市中捕捉得到，不带任何特定目的的偏好。由于其多样性和复杂性，使得该数据集的收集很困难。它包含了平面文本、凸出文本、城市街景文本、乡镇街景文本、弱照明条件下的文本、远距离文本、部分显示文本等。对于每张图像，数据集中都标注了所有中文字符。对每个中文字符，数据集都标注了其真实字符、边界框和 6 个属性以指出其是否被遮挡、有复杂的背景、被扭曲、3D 凸出、艺术化，和手写体等。<strong>gsap</strong></div>
      <button @click="startTextAnimation">restart</button>
    </main>
    <button @click="GSAP">GSAP</button>
  </section>
</template>

<script>
import { TimelineLite, TweenLite, Back } from 'gsap'

export default {
  name: 'tween',
  data() {
    return {
      list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
  },
  mounted() {
    this.$nextTick(() => {
      const { box } = this.$refs

      this.timeline = new TimelineLite();
      this.timeline.add(
        TweenLite.to(box, 1, { x: 200, rotation: 90, ease: Back.easeInOut })
      );
      this.timeline.add(TweenLite.to(box, 0.5, { background: 'green' }, '-=0.5'));
    })
  },
  beforeDestroy() {
    'timeline' in this && this.timeline.clear()
    't2' in this && this.t2.clear()
  },
  methods: {
    startTextAnimation() {
      this.t2 ? this.t2.restart() : this.textAnimation()
    },
    textAnimation() {
      const { p } = this.$refs

      this.t2 = new TimelineLite()
      p.innerHTML = p.innerHTML
        .split(' ')
        .map(
          w =>
            `<div style="position:relative;display:inline-block;"><span style="position:relative;display:inline-block;">${w
              .split('')
              .join(
                '</span><span style="position:relative;display:inline-block;">'
              )}</span></div>`
        )
        .join(' ');
      this.t2.set(p, { perspective: 400 });
      const chars = p.querySelectorAll('span');
      this.t2.staggerFrom(
        chars,
        0.8,
        {
          opacity: 0,
          scale: 0,
          y: 80,
          rotationX: 180,
          transformOrigin: '0% 50% -50',
          ease: Back.easeOut
        },
        0.01,
        '+=0'
      )
    },
    GSAP() {
      this.timeline.staggerTo(
        '.target',
        1,
        { rotation: 90, y: 100, opacity: 0 },
        0.1
      )
    }
  }
}
</script>

<style lang="stylus" scoped>
.tween {
  display: flex;
  flex-direction: column;
  height: 100vh;

  > main {
    flex 1
  }
}

.wrapper
    display flex

.box {
  height: 60px;
  width: 60px;
  background: red;
}

.target {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  background: pink;
}
</style>

