<template>
  <div id="app">
    <nav class="navigation">
      <a href="/" class="navigation__link navigation__link_pink">index</a>
      <a href="/infinite" class="navigation__link navigation__link_orange">infinite</a>
    </nav>
    <main>
      <section class="container"></section>
    </main>
  </div>
</template>

<script>
import "../assets/stylus/base.styl";

export default {
  name: "sass"
};
</script>

<style lang="scss">
@import "@/assets/scss/_variables.scss";

%btn {
  display: inline-block;
  padding: 8px 10px;
  border-radius: 6px;
  color: #fff;
}

.navigation {
  font: 20px/ 24px fantasy {
    weight: bold;
  }

  &__link + &__link {
    margin-left: 10px;
  }

  &__link {
    @extend %btn;

    transition: background 0.4s $decelerate-easing;

    &:hover {
      background: $blue;
    }

    &.has-visited {
      background: $teal-blue;
    }

    &.is-selected {
      text-decoration: underline;
    }
  }

  &__link_orange {
    background: $orange;
  }

  &__link_pink {
    background: $pink;

    &:hover {
      color: $teal-blue;
      background: #fff;
    }
  }
}
</style>
