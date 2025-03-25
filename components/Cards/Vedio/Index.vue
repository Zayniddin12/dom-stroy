<template>
  <div>
    <div @click="showModal = true">
      <div
        class="rounded-xl overflow-hidden w-full h-[212px] bg-cover bg-center flex items-end group"
        :style="{ backgroundImage: `url(${card?.cover})` }"
      >
        <div
          class="bg-gradient-to-b from-black/0 to-[#1a1a1a70] backdrop-blur-sm w-full p-3"
        >
          <p
            class="text-white text-sm font-semibold line-clamp-2 group-hover:text-red transition duration-300"
          >
            {{ card?.title }}
          </p>
        </div>
      </div>
    </div>
    <CommonModalsModal
      max-width
      contentClass="w-full h-[500px]"
      :show="showModal"
      @close="showModal = false"
    >
      <template #default>
        <iframe
          v-if="card?.video"
          :src="embedUrl(card.video)"
          frameborder="0"
          allowfullscreen
          class="h-full w-full"
        ></iframe>
      </template>
    </CommonModalsModal>
  </div>
</template>

<script setup lang="ts">
interface Props {
  card: {
    title: string
    id: number
    cover: string
    video: string
  }
  loading?: boolean
}

defineProps<Props>()

const showModal = ref(false)

// Helper function to construct the embed URL
const embedUrl = (videoUrl: string): string => {
  const videoId = videoUrl.split('v=')[1]?.split('&')[0]
  const videoShort = videoUrl.split('shorts/')[1]?.split('&')[0]
  if (videoId !== undefined) {
    return `https://www.youtube.com/embed/${videoId}`
  } else if (videoShort !== undefined) {
    return `https://www.youtube.com/embed/${videoShort}`
  } else {
    return ''
  }
}
</script>
