<template>
  <section class="page__patient">
    <dl>
      <template v-for="(value, key, index) in data">
        <dt :key="`dt-${index}`">{{ key }}</dt>
        <dd :key="`dd-${index}`">{{ value }}</dd>
      </template>
    </dl>

    <button class="page__patient-next">下一步</button>
  </section>
</template>

<script>
export default {
  name: 'Patient',
  data() {
    return {
      data: {
        '登记等次': 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto dignissimos aspernatur, aut ex praesentium numquam provident unde suscipit magni. Nemo autem accusantium placeat vitae. Nisi itaque aliquid ut eos omnis!',
        '执业许可证': 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto dignissimos aspernatur, aut ex praesentium numquam provident unde suscipit magni. Nemo autem accusantium placeat vitae. Nisi itaque aliquid ut eos omnis!',
        '诊疗范围': 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto dignissimos aspernatur, aut ex praesentium numquam provident unde suscipit magni. Nemo autem accusantium placeat vitae. Nisi itaque aliquid ut eos omnis!',
        '奖惩办法公示': 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto dignissimos aspernatur, aut ex praesentium numquam provident unde suscipit magni. Nemo autem accusantium placeat vitae. Nisi itaque aliquid ut eos omnis!',
        '奖惩信息公示': 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto dignissimos aspernatur, aut ex praesentium numquam provident unde suscipit magni. Nemo autem accusantium placeat vitae. Nisi itaque aliquid ut eos omnis!',
      }
    }
  }
}
</script>

<style lang="scss">
.page__patient {
  padding: 30px;

  > dl {
    margin: 0 0 90px 0;

    dt {
      margin-bottom: 25px;
      color: #3a3a3a;
      font-size: 36px;
      line-height: 50px;
    }

    dd {
      margin: 0;
      color: #9a9a9a;
      font-size: 28px;
      line-height: 38px;
    }

    dd + dt {
      margin-top: 68px;
    }
  }
}

.page__patient-next {
  position: fixed;
  right: 0;
  bottom: 20px;
  left: 0;
  margin: 0 auto;
  width: 80%;
  height: 70px;
  background: #16BFFF;
  color: #fff;
  border-radius: 6px;
}
</style>
