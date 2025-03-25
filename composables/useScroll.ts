import { onMounted } from 'vue'
import { isIOS } from '~/helpers'

export function useScroll() {
  const documentBody = ref<HTMLElement>()
  const documentHeader = ref<Element | null>()

  onMounted(() => {
    if (process.client) {
      documentBody.value = document.body
      documentHeader.value = document.querySelector('.header')
    }
  })

  function showOverflow() {
    documentBody.value?.classList.remove('!overflow-hidden')
    if (!isIOS()) {
      documentBody.value?.classList.remove('!pr-[17px]')
      documentHeader.value?.classList.remove('!pr-[17px]')
    }
  }

  function hideOverflow() {
    documentBody.value?.classList.add('!overflow-hidden')
    if (!isIOS()) {
      documentBody.value?.classList.add('!pr-[17px]')
      documentHeader.value?.classList.add('!pr-[17px]')
    }
  }
  return { showOverflow, hideOverflow }
}
