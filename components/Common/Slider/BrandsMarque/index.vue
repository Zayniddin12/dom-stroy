<template>
  <div>
    <div class="marquee">
      <div class="marquee__group_left">
        <CardsBrand
          v-for="(item, index) in generateItem(partnersList)"
          :key="'F' + index"
          :brand="item"
          :loading="loading"
          :isGray="true"
        />
      </div>
    </div>

    <div class="marquee">
      <div class="marquee__group_right">
        <CardsBrand
          v-for="(item, index) in generateItem(partnersList)"
          :key="'G' + index"
          :brand="item"
          :loading="loading"
          :isGray="true"
        />
      </div>
    </div>
    <div class="marquee">
      <div class="marquee__group_left">
        <CardsBrand
          v-for="(item, index) in generateItem(partnersList)"
          :key="'H' + index"
          :brand="item"
          :loading="loading"
          :isGray="true"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TBrand } from '~/types/brand'

interface Props {
  partnersList: TBrand[]
  loading?: boolean
  reverse?: boolean
}
defineProps<Props>()
function generateItem(arr: TBrand[]) {
  let index = 0 // 1 / 2
  let generatedArray = [] // [{id: 1},{id: 2}, {id: 3}, {id: 1}]
  let checkResponseLength = arr?.length // 3
  let checkAdditionalItems = 100 - checkResponseLength // 97
  for (let i = 0; i <= checkAdditionalItems; i++) {
    generatedArray.push(arr[index])
    if (index + 1 === checkResponseLength) {
      index = 0
    } else {
      index++
    }
  }
  return generatedArray
}
</script>

<style>
.marquee {
  display: flex;
  overflow: hidden;
  user-select: none;
  gap: 3rem;
}

.marquee__group_left {
  flex-shrink: 0;
  margin-left: -200px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 16px;
  min-width: 100%;
  animation: scroll-left 1000s linear infinite;
}
.marquee__group_left:hover {
  animation-play-state: paused;
}

.marquee__group_right {
  flex-shrink: 0;
  margin-right: -200px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 16px;
  min-width: 100%;
  animation: scroll-right 1000s linear infinite;
}
.marquee__group_right:hover {
  animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
  .marquee__group_left {
    animation-play-state: paused;
  }
}

.marquee__group_left h4 {
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 1rem;
  border: 1px solid #ccc;
  padding: 3rem;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(-100% + 3rem));
  }
}

@keyframes scroll-right {
  0% {
    transform: translateX(-50%);
  }

  100% {
    transform: translateX(calc(0 + 3rem));
  }
}
</style>
