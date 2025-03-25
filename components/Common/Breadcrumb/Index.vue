<template>
  <div class="hidden md:flex items-center py-3">
    <div
      v-for="(route, index) in routes"
      :key="index"
      class="flex items-center flex-wrap"
      :class="[checkLastRoute(index), `text-[${textColor}]`]"
    >
      <nuxt-link
        v-if="route.link"
        class="transition duration-500"
        :class="[`hover:text-[${hoverColor}]`]"
        :to="localePath(route.route)"
      >
        {{ route.name }}
      </nuxt-link>
      <p v-else-if="route.disabled">{{ route.name }} -</p>
      <nuxt-link
        v-else
        class="transition duration-500"
        :class="[`hover:text-[${hoverColor}]`]"
        :to="localePath(route.route)"
      >
        {{ route.name }}
      </nuxt-link>
      <div
        v-if="index !== routes.length - 1"
        class="mx-2 w-1 h-1 rounded-full bg-gray-300"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface IRoute {
  name: string
  route?: string
  target?: boolean
  link?: boolean
  disabled?: boolean
}

export interface Props {
  routes: IRoute[]
  hoverColor?: string
  textColor?: string
}
const props = withDefaults(defineProps<Props>(), {
  hoverColor: '#409eff',
  textColor: '#1c1e21',
})
const checkLastRoute = (index: number) => {
  if (index === props.routes.length - 1) {
    return 'font-normal text-gray-300 dark:text-gray-200 pointer-events-none cursor-not-allowed'
  } else {
    return 'font-bold text-gray-100 dark:text-white hover:text-dark cursor-pointer'
  }
}
const localePath = useLocalePath()
</script>
