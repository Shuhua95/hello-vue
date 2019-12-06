<template>
  <section class="grid">
    <div class="box1">1</div>
    <div class="box2">2</div>
    <div class="box3">3</div>
    <div class="box4">4</div>
    <div class="box5">5</div>
  </section>  
</template>

<style lang="scss">
/* autoprefixer grid: autoplace */

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 200px);
  grid-column-gap: 10px;
  grid-row-gap: 1em;

  > * {
    background: #ddd;
  }

  .box1 {
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 3;
  }

  .box2 {
    grid-column-start: 1;
    grid-row-start: 3;
    grid-row-end: 5;
  }
}
</style>