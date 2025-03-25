<template>
  <CommonDropdown
    list-style="!z-[50]"
    @focusout="dropDownActive = false"
    @on-click="dropDownActive = !dropDownActive"
  >
    <template #head>
      <div class="flex-center group">
        <span
          class="transition-200 text-gray-100 dark:text-gray-300 text-xs leading-130 font-roboto font-medium group-hover:text-orange"
        >
          {{ activeLang }}
        </span>
        <span
          class="icon-chevron-down transition-200 inline-block text-xl ml-1 transform !text-gray-300 dark:text-dark-300 group-hover:!text-orange"
          :class="[dropDownActive ? '!-rotate-180' : '']"
        />
      </div>
    </template>
    <li
      v-for="(item, ind) in languageList"
      :key="item?.value"
      class="transition-200 group flex items-center pl-3 py-4 pr-3.5 text-sm font-semibold !relative cursor-pointer hover:!bg-[#FEF8FA] !z-[99999999999]"
      @click="switchLanguage(item)"
    >
      <div
        class="text-gray-100 dark:text-white group-hover:text-dark flex justify-between w-full"
        :class="{ '!text-red': locale === item.value }"
      >
        <span>{{ item.name }}</span>
        <i v-if="locale === item.value" class="icon-unread text-red text-xl" />
        <span
          v-if="ind !== languageList.length - 1"
          class="absolute w-full left-2 right-0 h-px block bottom-0 bg-[#E5EAEE]"
        />
      </div>
    </li>
  </CommonDropdown>
</template>
<script lang="ts" setup>
import CommonDropdown from '../Dropdown/Dropdown.vue'

const { locale, setLocale } = useI18n()
interface ILanguage {
  value: string
  name: string
}

const languageList = ref<ILanguage[]>([
  { value: 'uz', name: 'Ўзбекча' },
  { value: 'sr', name: "O'zbekcha" },
  { value: 'ru', name: 'Русский' },
])

const activeLanguage = ref<ILanguage | undefined>({
  value: 'ru',
  name: 'Русский',
})
const dropDownActive = ref(true)

const switchLanguage = (item: ILanguage) => {
  setLocale(item.value)
}
const activeLang = computed(() => {
  return languageList.value.find((el) => el.value === locale.value)?.name
})
</script>
