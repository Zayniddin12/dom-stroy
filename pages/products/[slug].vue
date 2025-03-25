<template>
  <div>
    <CommonBreadcrumb :routes="routes" class="container !pb-0" />
    <Transition name="fade" mode="out-in">
      <div
        class="container rounded-none relative grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 py-5"
      >
        <div>
          <client-only>
            <CardsProductHeader
              @buttonClicked="buttonClicked"
              class="mb-6"
              :is-liked="isLiked"
              :data="singleProduct?.data"
              :group="productGroups"
              @change-attribute="changeAttribute"
              @change="changeProduct"
              v-bind="{ loading }"
            />
          </client-only>
          <!-- About -->
          <CardsBlank
            :title="$t('about_product')"
            title-class="mb-4"
            :loading="loading"
            preloader-class="mb-4"
          >
            <CommonBlockPreloader
              :loading="loading"
              width="130px"
              height="28px"
              preloader-class="mb-2"
            >
              <h5
                class="text-xl text-dark dark:text-white font-normal mb-2 font-sans transition-300"
                v-if="singleProduct?.data?.description"
              >
                {{ $t('description') }}:
              </h5>
            </CommonBlockPreloader>
            <transition name="skeleton" mode="out-in">
              <div v-if="loading">
                <CommonBlockPreloader
                  v-for="i in 10"
                  :key="i"
                  :loading="loading"
                  :width="Math.floor(Math.random() * 4 + 7) * 10 + '%'"
                  height="24px"
                  preloader-class="mb-2"
                />
              </div>

              <div
                id="prod_description"
                class="overflow-hidden h-max relative"
                :class="[fullDescription ? 'max-h-max' : 'max-h-[262px]']"
                v-else
              >
                <div
                  class="text-dark dark:text-white text-base text-description transition-300"
                  v-html="singleProduct?.data?.description"
                ></div>

                <div
                  v-if="!fullDescription"
                  class="bg-gradient-to-t from-white via-white/80 to-transparent absolute w-full h-16 bottom-0 left-0 flex items-end"
                >
                  <button
                    class="text-sm text-dark font-bold transition-300 hover:text-red"
                    @click="fullDescription = true"
                  >
                    {{ $t('show_more') }}
                  </button>
                </div>
              </div>
            </transition>
            <div class="grid grid-cols-2 max-md:grid-cols-1 gap-x-3">
              <template v-for="(meta, idx) in metaInfos" :key="idx">
                <div v-if="meta?.text" class="w-full mt-8">
                  <CommonBlockPreloader
                    :loading="loading"
                    :width="$t(meta.label).length * 9 + 'px'"
                  >
                    <p class="text-gray-100 dark:text-gray-300 transition-300">
                      {{ $t(meta.label) }}:
                    </p>
                  </CommonBlockPreloader>
                  <CommonBlockPreloader
                    :loading="loading"
                    width="150px"
                    preloader-class="mt-1"
                  >
                    <p
                      class="text-dark dark:text-white font-normal transition-300"
                      v-if="meta?.label === 'preferred_gender'"
                    >
                      {{ $t(meta?.text ?? '') || '-' }}
                    </p>
                    <p
                      v-else
                      class="text-dark dark:text-white font-normal transition-300"
                    >
                      {{ meta?.text || '-' }}
                    </p>
                  </CommonBlockPreloader>
                </div>
              </template>
            </div>
          </CardsBlank>
          <!-- Reviews -->
          <CardsBlank class="mt-7 !mb-6 !px-0">
            <div class="grid grid-cols-1-max items-center px-6 mb-5">
              <CommonBlockPreloader
                v-bind="{ loading }"
                width="130px"
                height="34px"
              >
                <h4 class="blank-title flex items-center gap-2">
                  {{ $t('reviews') }}
                  <span
                    v-if="ratings?.total"
                    class="text-gray-200 text-xl font-semibold"
                    >({{ ratings?.total }})</span
                  >
                </h4>
              </CommonBlockPreloader>
              <CommonBlockPreloader
                :loading="loading"
                width="137px"
                height="40px"
                border-radius="6px"
              >
                <CommonButton
                  v-if="singleProduct?.data?.can_comment"
                  class="!px-4"
                  :text="$t('add_review')"
                  @click="addReview"
                />
                <div
                  v-else-if="singleProduct?.data?.has_comment"
                  class="relative group"
                >
                  <CommonButton
                    class="!px-4 absolute !left-0"
                    :text="$t('add_review')"
                    variant="secondary"
                    @mouseover="showTooltip = true"
                  />
                  <CommonTooltip
                    class="text-center"
                    :class="
                      showTooltip
                        ? '!-top-8 z-[30] p-4 !w-[300px] !left-0 md:left-1/2'
                        : '!top-[-80px] z-[-1]'
                    "
                    >{{ $t('commented_before') }}
                  </CommonTooltip>
                </div>
                <div v-else class="relative group">
                  <CommonButton
                    class="!px-4 absolute !left-0"
                    :text="$t('add_review')"
                    variant="secondary"
                    @mouseover="showTooltip = true"
                  />
                  <CommonTooltip
                    class="text-center"
                    :class="
                      showTooltip
                        ? '!-top-8 z-[30] p-4 !w-[300px] !left-0 md:left-1/2'
                        : '!top-[-80px] z-[-1]'
                    "
                    >{{ $t('leave_comment_requirement') }}
                  </CommonTooltip>
                </div>
              </CommonBlockPreloader>
            </div>
            <div>
              <CommonReview
                v-if="ratings?.total"
                class="mx-6"
                :loading="loading"
                :rates="ratings?.rates"
                :rate="ratings?.rate"
                :total="ratings?.total"
              />
              <CommonNoData
                v-else-if="!commentData.length"
                img="/images/no-data/Bill.svg"
                class="min-h-[240px]"
                img-styles="!mb-0"
                :title="$t('not_commented_yet')"
                :subtitle="t('not_commented_yet_text')"
              />
              <CardsFeedback
                class="py-4 px-px last:!pb-0"
                v-for="(feedback, idx) in commentData"
                :key="idx"
                :data="feedback"
                :loading="commentDataLoading && !commentLoadingMore"
                :class="idx > 0 ? 'border-t border-gray-500' : 'border-none'"
              />
              <CommonButton
                variant="light"
                class="!px-5 mt-3 mx-auto"
                v-if="!loading && commentData?.length < commentDataTotal"
                @click="loadMoreComment"
                :loading="commentLoadingMore"
              >
                <span class="inline-flex space-x-1">
                  <i class="icon-arrow-down-solid text-xl text-red" />
                  <span>{{ $t('load_more') }}</span>
                </span>
              </CommonButton>
            </div>
          </CardsBlank>
          <!-- Similar products -->
          <CommonSectionsSectionHead
            title="similar_products"
            section-title="all_goods"
            :section-link="`/products/?sections=${single?.category?.id}`"
            v-if="!(!loadingSimilarProds && !similarProducts.length)"
            class="px-4 md:p-0"
          />
          <div
            class="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10 md:mb-[104px] px-4 md:px-0"
            v-if="!(!loadingSimilarProds && !similarProducts.length)"
          >
            <CardsProduct
              :card="item"
              v-for="(item, idx) in loadingSimilarProds ? 4 : similarProducts"
              :loading="loadingSimilarProds"
              :key="idx"
            />
          </div>
        </div>
        <!-- Ad-->
        <div class="w-full hidden lg:block relative">
          <a
            :href="advertisement?.redirect_url"
            target="_blank"
            v-if="!loading && advertisement"
            class="sticky top-[200px]"
          >
            <img
              v-if="advertisement?.cover"
              :src="advertisement?.cover"
              class="w-full"
              alt="uic.group"
            />
          </a>
        </div>
        <!-- About card -->
      </div>
    </Transition>
    <CommonModalsAddReview
      :show="showModal"
      @close="showModal = false"
      @send="sendReview"
      :loading="addingComment"
    />
  </div>
</template>

<script lang="ts" setup>
import type { TReviewPayloadData } from '~/types/feedback'
import { useRoute } from 'vue-router'
import type { TComments, TComment, IRatings } from '~/types/comments'
import { useAuthStore } from '~/store/auth'
import * as pkg from 'vue-toastification'
import type { TProductSingle } from '~/types/ProductSingle'
import type { TProducts, TProduct } from '~/types/products'
import { useSettingsStore } from '~/store/settings'
import { getText } from '~/helpers'

const { useToast } = pkg
const toast = useToast()

const { $event } = useNuxtApp()

const route = useRoute()
const isLiked = ref(false)

const { t } = useI18n()
const single = ref<TProductSingle>()
const loading = ref(true)
const commentData = ref<TComment[]>([])
const commentDataTotal = ref(0)
const commentDataPage = ref(1)
const commentDataLoading = ref(true)
const commentLoadingMore = ref(false)
const loadingSimilarProds = ref(false)
const loadingProductGroup = ref(true)
const productGroups = ref<TProduct[]>()
const similarProducts = ref<TProducts['results']>([])
const ratings = ref<IRatings>()
const showTooltip = ref(false)

const settingsStore = useSettingsStore()

const advertisement = computed(() =>
  settingsStore.ads?.find((ad) => ad.type === 'in_product_single')
)

const productSlug = computed(() => route.params?.slug)

const { data: singleProduct } = await useAsyncData<any, any>(() => {
  return fetchSingleProduct(productSlug.value)
})

const buttonClicked = () => {
  setTimeout(() => {
    fetchSingleProduct(productSlug.value)
    isLiked.value = singleProduct.value.data.isLiked
  })
}

await fetchProductGroup(singleProduct.value?.data?.product_group)

function fetchSingleProduct(id: string) {
  return useFetcher<TProductSingle>(`products/detail/${id}/`, {
    method: 'GET',
  })
}

const fullDescription = ref(true)

const authStore = useAuthStore()
const commentDataSize = ref(4)

onMounted(() => {
  // fetchSingleProductComment(singleProduct.value?.data?.id)
  fetchSingleProductRatings(singleProduct.value?.data?.id)
  fetchSimilarProducts(singleProduct.value?.data?.id)
  settingsStore.fetchAds()

  setTimeout(() => {
    const description = document.querySelector(
      '#prod_description'
    ) as HTMLDivElement
    if (description && description?.scrollHeight > 270) {
      fullDescription.value = false
    }
  }, 1)
})

function fetchSingleProductComment(id: string) {
  commentDataLoading.value = true
  return new Promise((resolve, reject) => {
    useFetcher<TComments>(`products/${id}/comments/`, {
      method: 'GET',
      params: {
        size: commentDataSize.value,
        page: commentDataPage.value,
      },
    })
      .then((res) => {
        if (res?.data) {
          commentDataTotal.value = res?.data?.total
          if (commentData.value?.length)
            commentData.value = [...commentData.value, ...res.data?.results]
          else commentData.value = res?.data?.results
        }
        if (res?.error) {
          showError({ statusCode: 404, statusMessage: 'Page Not Found' })
        }
        resolve(res)
      })
      .finally(() => (commentDataLoading.value = false))
  })
}

fetchSingleProductComment(singleProduct.value?.data?.id)

function fetchSingleProductRatings(id: string) {
  return new Promise((resolve, reject) => {
    useFetcher<IRatings>(
      `products/${singleProduct.value?.data?.id}/comments/rates/`,
      {
        method: 'GET',
      }
    )
      .then((res) => {
        if (res?.data) {
          ratings.value = res.data
        }
        if (res?.error) {
          // showError({ statusCode: 404, statusMessage: 'Page Not Found' })
        }
        resolve(res)
      })
      .finally(() => {
        setTimeout(() => {
          loading.value = false
        }, 200)
      })
  })
}

function fetchSimilarProducts(id: string) {
  return new Promise((resolve, reject) => {
    loadingSimilarProds.value = true
    useFetcher<TProducts>(`products/${id}/similar/`, {
      method: 'GET',
      params: {
        size: 4,
      },
    })
      .then((res) => {
        if (res?.data) {
          similarProducts.value = res.data.results
        }
        if (res?.error) {
          // showError({ statusCode: 404, statusMessage: 'Page Not Found' })
        }
        resolve(res)
      })
      .finally(() => {
        // loading.value = false
        loadingSimilarProds.value = false
        setTimeout(() => {
          loading.value = false
        }, 200)
      })
  })
}

function fetchProductGroup(id: string) {
  return new Promise((resolve, reject) => {
    loadingProductGroup.value = true
    useFetcher<TProducts>(`products/`, {
      method: 'GET',
      params: {
        product_group_id: id,
        ordering: `?`,
      },
    })
      .then((res) => {
        if (res?.data) {
          productGroups.value = res.data.results
        }
        if (res?.error) {
          // showError({ statusCode: 404, statusMessage: 'Page Not Found' })
        }
        resolve(res)
      })
      .finally(() => {
        // loading.value = false
        loadingProductGroup.value = false
        setTimeout(() => {
          loading.value = false
        }, 200)
      })
  })
}

const images = computed(() => {
  return single.value?.images?.map((el: object) => el?.default)
})

const metaInfos = computed(() => [
  {
    label: 'release_year',
    text: singleProduct.value?.data?.year,
  },
  {
    label: 'capacity',
    text: `${singleProduct.value?.data?.unit_value} ${singleProduct.value?.data?.unit?.title}`,
  },
  {
    label: 'net_weight',
    text: `${singleProduct.value?.data?.weight} ${t('gr')}`,
  },
  // text: `${+single.value?.weight!} ${single.value?.unit?.title}`,
  {
    label: 'brand',
    text: singleProduct.value?.data?.manufacturer?.title,
  },
  // {
  //   label: 'preferred_gender',
  //   text: single.value?.targeted_gender,
  // },
  {
    label: 'made_in',
    text: singleProduct.value?.data?.manufactured_country,
  },
  {
    label: 'target_auditory',
    text: singleProduct.value?.data?.targeted_audience,
  },
])

const showModal = ref(false)
const addReview = () => {
  if (authStore.user) {
    showModal.value = true
  } else {
    $event('open-required')
  }
}

const addingComment = ref(false)
const isCommented = ref(false)
const sendReview = async (data: TReviewPayloadData) => {
  data.product = singleProduct.value?.data?.id
  console.log(singleProduct)
  addingComment.value = true
  try {
    const { data: resData, error } = await useFetcher(`products/comment/`, {
      method: 'POST',
      body: { ...data },
    })
    if (error) {
      if (error.data?.message) {
        toast.error(error.data?.message)
      } else {
        toast.error(error.data?.errors[0]?.message)
      }
    } else {
      await fetchSingleProductRatings(
        singleProduct.value?.data?.value?.data?.id
      )
      toast.success(t('your_comment_added'))
      showModal.value = false
      isCommented.value = true
      commentData.value = [resData, ...commentData.value]
      // ratings.value!.total++
    }
  } catch (err) {}
  addingComment.value = false
}
const loadMoreComment = async () => {
  commentDataPage.value++
  commentLoadingMore.value = true
  await fetchSingleProductComment(singleProduct.value?.data?.value?.data?.id)
  commentLoadingMore.value = false
}

useHead({
  title: singleProduct.value?.data?.title,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: getText(singleProduct.value?.data?.description)?.slice(0, 160),
    },
    {
      hid: 'og:description',
      name: 'og:description',
      content: getText(singleProduct.value?.data?.description)?.slice(0, 160),
    },
    {
      hid: 'image',
      name: 'image',
      content: singleProduct.value?.data?.images[0]?.large,
    },
    {
      hid: 'og:image',
      name: 'og:image',
      content: singleProduct.value?.data?.images[0]?.large,
    },
    {
      hid: 'og:title',
      name: 'og:title',
      content: singleProduct.value?.data?.title,
    },
  ],
})
const routes = [
  {
    name: t('main'),
    route: '/',
  },
  {
    name: t('products'),
    route: '/products',
  },
  {
    name: productSlug,
  },
]

function changeAttribute(data: { attribute: number; value: string }) {
  singleProduct.value.data.attributes[
    singleProduct.value?.data.attributes.findIndex(
      (el) => el.attribute === data.attribute
    )
  ] = data
  singleProduct.value.data.realtime_count = 0
}
</script>

<style scoped>
.text-description a {
  color: blue;
}

.text-description a:hover {
  text-decoration: underline;
}

.text-description ol,
.text-description ul {
  padding-left: 16px;
}

.text-description ul {
  list-style-type: disc;
}

.text-description ol {
  list-style-type: auto;
}

@media (max-width: 576px) {
  .container {
    width: 100% !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
}
</style>
