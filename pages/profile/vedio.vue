<template>
  <Transition name="fade" mode="out-in">
    <CardsBlank :key="loading" class="!bg-inherit">
      <transition name="fade" mode="out-in">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 dark:bg-dark-200"
        >
          <template v-if="loading">
            <CardsInstructionLoader
              v-for="i in videoLessons"
              :key="i"
              loading
            />
          </template>
          <template v-else>
            <CardsVedio
              v-for="(item, index) in videoLessons"
              :key="index"
              :card="item"
            />
          </template>
        </div>
      </transition>
    </CardsBlank>
  </Transition>
</template>

<script setup lang="ts">
import { useCommonStore } from '~/store/common'

const commonStore = useCommonStore()

const videoLessons = computed(() => commonStore.videoLessons)
async function fetchData() {
  return await Promise.all([commonStore.fetchVideoLessons()])
}

fetchData()

const data = ref([
  {
    id: 1,
    img: '/images/defaults/vedio.png',
    title: 'Shamol1 energetikasi bazasini boglash qurilishi',
  },
  {
    id: 2,
    img: '/images/defaults/vedio.png',
    title: 'Shamol2 energetikasi bazasini boglash qurilishi',
  },
  {
    id: 3,
    img: '/images/defaults/vedio.png',
    title: 'Shamol3 energetikasi bazasini boglash qurilishi',
  },
  {
    id: 4,
    img: '/images/defaults/vedio.png',
    title: 'Shamol4 energetikasi bazasini boglash qurilishi',
  },
  {
    id: 5,
    img: '/images/defaults/vedio.png',
    title: 'Shamol5 energetikasi bazasini boglash qurilishi',
  },
  {
    id: 6,
    img: '/images/defaults/vedio.png',
    title: 'Shamol6 energetikasi bazasini boglash qurilishi',
  },
  {
    id: 7,
    img: '/images/defaults/vedio.png',
    title: 'Shamol7 energetikasi bazasini boglash qurilishi',
  },
  {
    id: 8,
    img: '/images/defaults/vedio.png',
    title: 'Shamol8 energetikasi bazasini boglash qurilishi',
  },
])

const loading = ref(false) // loading false qilib qo'yamiz, chunki ma'lumotlarni dinamik o'qishimiz shart emas

onMounted(() => {
  // Bu yerda loading true qilib qo'yib, keyin false qilib qo'yish mumkin, agar xohlasangiz
  loading.value = false
})
</script>
