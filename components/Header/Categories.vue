<template>
  <div
    class="bg-white dark:bg-dark-100 duration-300 border-t border-gray-500 dark:border-[#444] hidden lg:block"
  >
    <div
      class="container flex-y-center justify-between py-4 !overflow-x-scroll lg:!overflow-hidden"
    >
      <div
        v-for="(category, categoryIdx) in headerList"
        :key="categoryIdx"
        class="flex items-center"
      >
        <CommonBlockPreloader
          :loading="
            categoriesStore.headerListLoading ? categoryIdx % 2 === 0 : false
          "
          width="120px"
          height="18px"
          content-wrapper-class="flex-y-center"
        >
          <div
            :class="{
              '!text-red':
                $route.path === '/products' &&
                String($route.query?.sections)
                  .split(',')
                  .includes(String(category?.category)),
            }"
            class="transition-300 duration-500 animated-link group flex-y-center h-3.5 inline-block font-semibold text-sm leading-[14px] text-dark dark:text-white hover:text-red flex-shrink-0 cursor-pointer"
            @click="goProducts(category.category)"
          >
            <div class="mask relative p-0 h-3.5 overflow-hidden">
              <div class="transition-300 group-hover:-translate-y-4">
                <span
                  class="animated-link-title1 block transition-300 duration-500 origin-[right_center] group-hover:rotate-[20deg] group-hover:text-red"
                >
                  {{ category.title }}
                </span>
                <span
                  class="animated-link-title2 block transition-300 duration-500 origin-[left_center] rotate-[20deg] group-hover:rotate-[0deg] group-hover:text-red"
                >
                  {{ category.title }}
                </span>
              </div>
            </div>
          </div>
          <span
            v-if="!category?.id && categoryIdx !== headerList.length - 1"
            class="w-px h-3 bg-gray-300 rounded inline-block flex-shrink-0"
          />
        </CommonBlockPreloader>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCategoriesStore } from '~/store/categories'
import { useRouter } from '#imports'

const categoriesStore = useCategoriesStore()
const localePath = useLocalePath()
const router = useRouter()

function addEmptyObject(list: {}[]) {
  const newList: {}[] = []
  list.forEach((i, idx) => {
    newList.push(i)
    if (idx !== list.length - 1) {
      newList.push({})
    }
  })
  return newList
}

const headerList = ref()
watch(
  () => categoriesStore.headerListLoading,
  (newValue: boolean) => {
    // console.log('categoriesStore.headerListLoading', categoriesStore.headerListLoading)
    if (!newValue) {
      headerList.value = addEmptyObject(categoriesStore.headerList) as []
    }
  }
)

onMounted(() => {
  if (categoriesStore.headerList?.length) {
    headerList.value = addEmptyObject(categoriesStore.headerList) as []
  }
})

async function goProducts(category: number) {
  await router.push(localePath({ path: '/products', query: { sections: category, keep: String(true) } }))
}
</script>
