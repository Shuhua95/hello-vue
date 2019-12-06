<template>
  <section class="page__doctor-detail">
    <div class="card">
      <dl>
        <dt>张医生</dt>
        <dd>
          <p>男 | 38</p>
          <p>XXX医院 | 内科</p>
        </dd>
      </dl>
      <p class="card-number">XXXXXXXXXXXXXXXXXXXXX</p>
    </div>
    <dl>
      <dt>擅长：</dt>
      <dd>
        <p>ipsum dolor sit amet consectetur adipisicing elit. Iure minima voluptatem sed deleniti accusantium eum eveniet doloremque a, nemo veritatis id, aspernatur magni temporibus neque sequi quo exercitationem architecto et.</p>
      </dd>
      <dt>简介：</dt>
      <dd>
        <p>ipsum dolor sit amet consectetur adipisicing elit. Ducimus laborum iste ullam pariatur? Vitae eaque obcaecati optio quasi, commodi error exercitationem aliquam explicabo nisi soluta, ipsa deserunt, dolorum recusandae pariatur!</p>
      </dd>
      <dt>执业范围：</dt>
      <dd class="dept-items">
        <div class="dept-item">
          <h6 class="dept-name violet">内科</h6>
          <p class="dept-desc">神经内科</p>
          <span class="dept-date">01.02</span>
        </div>
        <div class="dept-item">
          <h6 class="dept-name green">内科</h6>
          <p class="dept-desc">神经内科</p>
          <span class="dept-date">01.02</span>
        </div>
        <div class="dept-item">
          <h6 class="dept-name blue">内科</h6>
          <p class="dept-desc">神经内科</p>
          <span class="dept-date">01.02</span>
        </div>
        <div class="dept-item">
          <h6 class="dept-name red">内科</h6>
          <p class="dept-desc">神经内科</p>
          <span class="dept-date">01.02</span>
        </div>
      </dd>
    </dl>
  </section>
</template>

<style lang="scss">
$colors:
  'violet' rgba(144, 19, 254, 0.1) #9013fe,
  'green' rgba(0, 206, 124, 0.1) #00ce7d,
  'blue' rgba(0, 140, 255, 0.1) #008bff,
  'red' rgba(255, 0, 162, 0.1) #ff00a2;

.page__doctor-detail {
  overflow: hidden;

  @each $name, $backgroundColor, $color in $colors {
    .#{$name} {
      background-color: $backgroundColor;
      color: $color;
    }
  }

  dl,
  dd {
    margin: 0;
  }

  .card {
    margin: 28px;
    padding: 40px;
    background-color: #138de8;
    border-radius: 18px;
    color: #fff;

    > dl {
      padding-left: 180px;
    }
  }

  .card-number {
    margin: 50px 0 0 0;
  }

  > dl,
  > dl dd + dt {
    margin: 50px 0 0 0;
  }

  > dl {
    margin-bottom: 50px;
    color: #323c47;
    font-size: 28px;

    dt {
      padding: 20px 30px;
      border-top: 1px solid #e7e7e7;
    }

    dd {
      padding: 0 30px;

      p {
        margin: 0;
        line-height: 38px;
      }
    }
  }

  .dept-items {
    margin-left: -5%;
  }

  .dept-item {
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0 0 5%;
    padding-bottom: 6px;
    height: 34px;
    width: 45%;
    border-bottom: 1px solid #e8e9ea;
  }

  .dept-name {
    margin: 0;
    padding: 0 10px;
    height: 30px;
    border-radius: 14px;
    font-size: 20px;
    line-height: 30px;
  }

  .dept-desc {
    padding-left: 24px;
    flex: 1 1 auto;
    font-size: 26px;
    color: #002257;
    line-height: 26px;
  }

  .dept-date {
    font-size: 22px;
    line-height: 22px;
    color: #97a3b4;
  }
}
</style>
