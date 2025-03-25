<template>
  <div
    v-if="filterItems && Object.keys(filterItems)?.length > 0"
    :class="wrapperClass"
  >
    <div class="flex items-center justify-between flex-col">
      <!--  ALL SECTIONS  -->
      <FormCheckboxCustom
        :label="t('all_sections')"
        :model-value="isAllSelected"
        class="border-b border-gray-500 dark:border-gray-100 transition-300"
        @click="onSelectAll"
      />

      <div class="w-full">
        <!--  VISIBLE ITEMS  -->
        <div
          v-for="(item, visibleIdx) in visibleFilters"
          :key="visibleIdx"
          :class="{ 'border-b mb-2': visibleIdx < visibleFilters.length - 1 }"
          class="w-full border-gray-500 pb-1 dark:border-gray-100 transition-300"
        >
          <!--  COLLAPSABLE PARENT  -->
          <div class="flex-y-center w-full group">
            <FormCheckboxCustom
              :parent="
                item.categories &&
                someChildrenChecked(item.categories, visibleIdx) &&
                !isCategoryFullyChecked(item)
              "
              :model-value="item.checked"
              class="!w-auto border-b-0 !mb-1.5"
              @click="updateParent(item, item.checked, visibleIdx)"
            />
            <div
              class="flex items-center justify-between flex-grow cursor-pointer"
              @click="updateParentVisibility(visibleIdx, item.categories)"
            >
              <p
                class="font-normal letter-3 leading-130 text-[#2B3646] dark:text-white text-sm transition-300 group-hover:text-orange"
              >
                {{ item[labelKey] }}
              </p>
              <div
                v-if="item?.categories?.length > 0"
                class="icon-chevron-down transition-300 text-2xl text-dark dark:text-white leading-19 transition-300"
                :class="{ 'rotate-180 !text-red': item.expanded }"
              />
            </div>
          </div>

          <!--  CATEGORY  -->
          <CollapseTransition>
            <div class="pl-4" v-if="item.expanded">
              <div
                class="w-full border-b border-gray-500 dark:border-gray-100 transition-300 last:!border-b-0 py-2"
                v-for="(category, categoryIdx) in item?.categories"
                :key="categoryIdx"
              >
                <div class="flex-y-center group">
                  <FormCheckboxCustom
                    :parent="
                      category.categories &&
                      someSubcategoryChecked(
                        category.categories,
                        categoryIdx
                      ) &&
                      !isCategoryFullyChecked(category)
                    "
                    :model-value="category.checked"
                    class="!w-auto border-b-0 !mb-1.5"
                    @click="updateCategory(category, visibleIdx, categoryIdx)"
                  />
                  <div
                    class="flex items-center justify-between flex-grow cursor-pointer"
                    @click="
                      updateCategoryVisibility(
                        visibleIdx,
                        categoryIdx,
                        category.categories
                      )
                    "
                  >
                    <p
                      class="font-normal letter-3 leading-130 text-[#2B3646] dark:text-white text-sm transition-300 group-hover:text-orange"
                    >
                      <span>{{ category[labelKey] }}</span>
                    </p>
                    <div
                      v-if="category?.categories?.length > 0"
                      class="icon-chevron-down transition-300 text-2xl text-dark dark:text-white leading-19 transition-300"
                      :class="{ 'rotate-180 !text-red': category.expanded }"
                    />
                  </div>
                </div>

                <!--  SUB CHILDREN  -->
                <CollapseTransition>
                  <div class="pl-4" v-if="category.expanded">
                    <FormCheckboxCustom
                      v-for="(subCategory, idx) in category?.categories"
                      :key="idx"
                      :model-value="subCategory.checked"
                      class="border-b border-gray-500 dark:border-gray-100 transition-300 last:!border-b-0 last:!mb-0 first:!mt-2"
                      :label="subCategory[labelKey]"
                      :name="subCategory[labelKey]"
                      @click="onSelectSubcategory(category, idx)"
                    />
                  </div>
                </CollapseTransition>
              </div>
            </div>
          </CollapseTransition>
        </div>

        <!--  HIDDEN ITEMS  -->
        <CollapseTransition>
          <div v-if="showHiddenFilters">
            <div
              v-for="(hiddenItem, hiddenIdx) in hiddenFilters"
              :key="hiddenIdx"
              class="w-full border-gray-500 pb-1 border-b dark:border-gray-100 transition-300 last:!border-b-0 first:border-t pt-2"
            >
              <!--  COLLAPSABLE PARENT  -->
              <div class="flex-y-center w-full group">
                <FormCheckboxCustom
                  :parent="
                    hiddenItem.categories &&
                    someChildrenChecked(
                      hiddenItem.categories,
                      hiddenIdx + visibleItemsCount
                    ) &&
                    !isCategoryFullyChecked(hiddenItem)
                  "
                  :model-value="hiddenItem.checked"
                  class="!w-auto border-b-0 !mb-1.5"
                  @click="
                    updateParent(
                      hiddenItem,
                      hiddenItem.checked,
                      hiddenIdx + visibleItemsCount
                    )
                  "
                />
                <div
                  class="flex items-center justify-between flex-grow cursor-pointer"
                  @click="
                    updateParentVisibility(
                      hiddenIdx + visibleItemsCount,
                      hiddenItem.categories
                    )
                  "
                >
                  <p
                    class="font-normal letter-3 leading-130 text-[#2B3646] dark:text-white transition-300 text-sm transition-300 group-hover:text-dark_red"
                  >
                    {{ hiddenItem[labelKey] }}
                  </p>
                  <div
                    v-if="hiddenItem?.categories?.length > 0"
                    class="icon-chevron-down transition-300 text-2xl text-dark dark:text-white leading-19"
                    :class="{ 'rotate-180 !text-red': hiddenItem.expanded }"
                  />
                </div>
              </div>

              <!--  CATEGORY  -->
              <CollapseTransition>
                <div class="pl-4" v-if="hiddenItem.expanded">
                  <div
                    class="w-full border-b border-gray-500 last:!border-b-0 py-2"
                    v-for="(category, categoryIdx) in hiddenItem?.categories"
                    :key="categoryIdx"
                  >
                    <div class="flex-y-center group">
                      <FormCheckboxCustom
                        :parent="
                          category.categories &&
                          someSubcategoryChecked(
                            category.categories,
                            categoryIdx
                          ) &&
                          !isCategoryFullyChecked(category)
                        "
                        :model-value="category.checked"
                        class="!w-auto border-b-0 !mb-1.5"
                        @click="
                          updateCategory(
                            category,
                            hiddenIdx + visibleItemsCount,
                            categoryIdx
                          )
                        "
                      />
                      <div
                        class="flex items-center justify-between flex-grow cursor-pointer"
                        @click="
                          updateCategoryVisibility(
                            hiddenIdx + visibleItemsCount,
                            categoryIdx,
                            category.categories
                          )
                        "
                      >
                        <p
                          class="font-normal letter-3 leading-130 text-[#2B3646] dark:text-white text-sm transition-300 group-hover:text-orange"
                        >
                          <span>{{ category[labelKey] }}</span>
                        </p>
                        <div
                          v-if="category?.categories?.length > 0"
                          class="icon-chevron-down transition-300 text-2xl text-dark leading-19"
                          :class="{ 'rotate-180 !text-red': category.expanded }"
                        />
                      </div>
                    </div>

                    <!--  SUB CHILDREN  -->
                    <CollapseTransition>
                      <div class="pl-4" v-if="category.expanded">
                        <FormCheckboxCustom
                          v-for="(subCategory, idx) in category?.categories"
                          :key="'HSCI' + idx"
                          :model-value="subCategory.checked"
                          class="border-b border-gray-500 last:!border-b-0 last:!mb-0 first:!mt-2"
                          :label="subCategory[labelKey]"
                          :name="subCategory[labelKey]"
                          @click="
                            onSelectSubcategory(
                              category,
                              idx,
                              hiddenItem?.categories,
                              catgoryIdx
                            )
                          "
                        />
                      </div>
                    </CollapseTransition>
                  </div>
                </div>
              </CollapseTransition>
            </div>
          </div>
        </CollapseTransition>

        <!--  HIDDEN TOGGLE  -->
        <ProductFilterMoreAction
          v-if="items.length - visibleItemsCount > 0"
          :hidden-items-count="items.length - visibleItemsCount"
          :expanded="showHiddenFilters"
          @expand="showHiddenFilters = !showHiddenFilters"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import ProductFilterMoreAction from '~/components/Product/Filter/FilterMoreAction.vue'
import { useRouter } from 'vue-router'
import useUpdateRouteQuery from '~/composables/updateRouteQuery'

interface IItem {
  checked: boolean
  expanded: boolean
  id: number
  categories: { checked: boolean; id: number }[]
}

interface IDefault {
  id: number
  checked: boolean
  expanded?: boolean
}

interface ISubcategory extends IDefault {}

interface ICategory extends IDefault {
  categories: ISubcategory[]
}

interface IParent extends IDefault {
  categories: ICategory[]
}

interface Props {
  items: IParent[]
  labelKey?: string
  valueKey?: string
  wrapperClass?: string
  name?: string
  queryKey?: string
  clearTrigger?: 0
}
const props = withDefaults(defineProps<Props>(), {
  wrapperClass: 'flex flex-col gap-4',
  labelKey: 'title',
  valueKey: 'id',
  name: `checkbox-${Math.floor(Math.random() * 1000)}`,
  queryKey: 'section',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | object): void
  (e: 'update:modelValue', value: string | number | object): void
  // TODO
  // NOW THIS FUNCTIONALITY IS NOT WORKING. BECAUSE BY DEFAULT EXCEPT FIRST ITEM OF FILTER, OTHER  FILTER ITEMS ARE
  // HIDDEN WITH V-IF. WE SHOULD CHECK IT FROM PARENT, IF THE CHILDREN FIELD CHECKED OR NOT.
  (e: 'toggle-expand', value: boolean): void
}>()

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const filterItems = ref<IParent[]>(unref(props.items))
const collapse = ref(10000)

const value = ref<Array<string | number | object>>([])
const showHiddenFilters = ref(false)
const visibleItemsCount = ref(4)

const visibleFilters = computed(() =>
  filterItems.value.slice(0, visibleItemsCount.value)
)

const hiddenFilters = computed(() =>
  filterItems.value.slice(visibleItemsCount.value)
)

function updateParentVisibility(idx: number, categories: []) {
  if (categories?.length === 0 || (!categories && filterItems.value[idx])) {
    filterItems.value[idx].checked = !filterItems.value[idx]?.checked
  } else {
    filterItems.value[idx].expanded = !filterItems.value[idx].expanded
  }
}

function updateCategoryVisibility(
  parentIdx: number,
  idx: number,
  categories: []
) {
  if (
    categories?.length === 0 ||
    (!categories && filterItems.value[parentIdx].categories[idx])
  ) {
    filterItems.value[parentIdx].categories[idx].checked =
      !filterItems.value[parentIdx].categories[idx]?.checked
  } else {
    filterItems.value[parentIdx].categories[idx].expanded =
      !filterItems.value[parentIdx].categories[idx].expanded
  }
}

const allChildrenChecked = computed(
  () => (items: { checked: boolean; categories: { checked: boolean }[] }[]) =>
    items?.length > 0 &&
    items.every(
      (category: { checked: boolean; categories: { checked: boolean }[] }) => {
        category?.checked && category.categories.length > 0
          ? allChildrenChecked.value({
              checked: category?.checked,
              categories: category.categories,
            })
          : true
      }
    )
)

function isCategoryFullyChecked(category: any): boolean {
  if (!category.categories || category.categories.length === 0) {
    // If this category has no children, return its checked value
    return category?.checked
  } else {
    // If this category has children, check if all of them are checked
    const allChildrenChecked = category.categories.every(isCategoryFullyChecked)
    return category?.checked && allChildrenChecked
  }
}

const someChildrenChecked = computed(
  () => (categories: { checked: boolean }[], idx: number) => {
    const someChecked = categories?.some(
      (category: { checked: boolean }) => category?.checked
    )
    if (categories?.length > 0 && filterItems.value[idx]) {
      filterItems.value[idx].checked = someChecked
    }

    return someChecked
  }
)

const someSubcategoryChecked = computed(
  () => (categories: { checked: boolean }[], idx: number) => {
    return categories.some(
      (category: { checked: boolean }) => category?.checked
    )
  }
)

function updateChildrenState(
  categories: { checked: boolean; categories: { checked: boolean }[] }[],
  newValue: boolean
) {
  categories.forEach(
    (i: { checked: boolean; categories: { checked: boolean }[] }) => {
      i.checked = newValue

      if (i.categories.length > 0) {
        i.categories.forEach((i: { checked: boolean }) => {
          i.checked = newValue
        })
      }
    }
  )
}

function updateParentState(
  idx: number,
  key = 'checked',
  state = !filterItems.value[idx][key]
) {
  filterItems.value[idx][key] = state
}

function updateParent(
  item: {
    categories: { checked: boolean; categories: { checked: boolean }[] }[]
  },
  isChecked: boolean,
  idx: number
) {
  if (item.categories?.length === 0 || !item.categories) {
    // IF CHILDREN NOT EXISTS JUST CHANGE PARENT STATE
    updateParentState(idx, 'checked')
  } else if (!isChecked) {
    // IF PARENT NOT CHECKED, CHECK ALL CHILDREN
    updateChildrenState(item.categories, true)
  } else {
    // IF PARENT CHECKED
    if (isCategoryFullyChecked(item)) {
      // IF ALL CHILDREN CHECKED, UNCHECK ALL CHILDREN AND PARENT
      updateChildrenState(item.categories, false)
      updateParentState(idx, 'checked', false)
    } else if (someChildrenChecked.value(item.categories, idx)) {
      // IF NOT ALL CHILDREN CHECKED, CHECK ALL CHILDREN AND PARENT
      updateChildrenState(item.categories, true)
      updateParentState(idx, 'checked', true)
    }
  }
}

function updateCategoryState(
  parentIdx: number,
  idx: number,
  key = 'checked',
  state = !filterItems.value[parentIdx].categories[idx][key]
) {
  filterItems.value[parentIdx].categories[idx][key] = state
}

function updateSubcategoryState(
  subcategories: { checked: boolean }[],
  newValue: boolean
) {
  subcategories.forEach((i: { checked: boolean }) => {
    i.checked = newValue
  })
}

function onSelectSubcategory(
  category: { categories: { checked: boolean }[]; checked: boolean },
  subcategoryIdx: number
) {
  category.categories[subcategoryIdx].checked =
    !category.categories[subcategoryIdx].checked
}

function updateCategory(
  category: { checked: boolean; categories: { checked: boolean }[] },
  parentIdx: number,
  idx: number
) {
  if (category.categories?.length === 0 || !category.categories) {
    // IF CHILDREN NOT EXISTS JUST CHANGE PARENT STATE
    updateCategoryState(parentIdx, idx, 'checked')
  } else if (!category?.checked) {
    // IF PARENT NOT CHECKED, CHECK ALL CHILDREN
    updateCategoryState(parentIdx, idx, 'checked', true)
    updateSubcategoryState(category.categories, true)
  } else {
    // IF PARENT CHECKED
    if (isCategoryFullyChecked(category)) {
      // IF ALL CHILDREN CHECKED, UNCHECK ALL CHILDREN AND PARENT
      updateSubcategoryState(category.categories, false)
      updateCategoryState(parentIdx, idx, 'checked', false)
    } else if (someSubcategoryChecked.value(category.categories, idx)) {
      // IF NOT ALL CHILDREN CHECKED, CHECK ALL CHILDREN AND PARENT
      updateSubcategoryState(category.categories, true)
      updateCategoryState(parentIdx, idx, 'checked', true)
    }
  }
}

const loading = ref(true)
const checkedItems = ref<number[]>([])

watch(
  () => filterItems.value,
  (newValue) => {
    if (!loading.value) {
      checkedItems.value = [...newValue].reduce((acc: number[], parent) => {
        if (parent?.categories?.length > 0) {
          let checkedChildren = parent.categories.reduce(
            (acc: number[], child) => {
              if (child?.categories?.length > 0) {
                let checkedGrandchildren = child.categories.filter(
                  (grandchild) => grandchild?.checked
                )
                if (checkedGrandchildren.length == child.categories.length) {
                  acc.push(child.id)
                } else {
                  checkedGrandchildren.forEach((grandchild) =>
                    acc.push(grandchild.id)
                  )
                }
              } else if (child?.checked) {
                acc.push(child.id)
              }
              return acc
            },
            []
          )

          if (
            parent.categories.every((p) =>
              checkedChildren.some((ch) => String(ch) === String(p.id))
            )
          ) {
            acc.push(parent.id)
          } else {
            checkedChildren.forEach((child) => acc.push(child))
          }
        } else if (parent?.checked) {
          acc.push(parent.id)
        }
        return acc
      }, [])

      useUpdateRouteQuery(
        props.queryKey,
        route.query?.clear ? '' : checkedItems.value.join(',')
      )
    }
  },
  { deep: true }
)

onMounted(() => {
  updateChecked(filterItems.value)
  loading.value = false
})

function updateChecked(list: IParent[]) {
  if (list?.length > 0) {
    for (let i = 0; i < list.length; i++) {
      if (checkQuery(list[i].id)) {
        list[i].checked = true
        // list[i].expanded = true;

        if (i >= visibleItemsCount.value) {
          showHiddenFilters.value = true
        }

        updateChildren(list[i].categories, i)
      } else {
        updateChecked(list[i].categories as IParent[])

        // Check if all third-level subcategories are unchecked
        const allSubcategoriesUnchecked = list[i].categories?.every(
          (subcat) => !checkQuery(subcat.id)
        )

        if (allSubcategoriesUnchecked) {
          list[i].checked = false
          // list[i].expanded = false;
        }
      }

      if (someChildrenChecked.value(list[i].categories, i)) {
        // list[i].expanded = true;
      }

      if (list[i].categories?.length > 0) {
        const categoryIds = list[i].categories.map((category) => category.id)
        if (categoryIds?.some((id) => checkQuery(id))) {
          list[i].checked = true

          // list[i].expanded = true;

          if (i >= visibleItemsCount.value) {
            showHiddenFilters.value = true
          }
        }
      }
    }
  }
}

function updateChildren(categories: ICategory[], parentIdx: number) {
  if (categories?.length > 0) {
    for (let i = 0; i < categories.length; i++) {
      categories[i].checked = true
      // categories[i].expanded = true

      if (parentIdx >= visibleItemsCount.value) {
        showHiddenFilters.value = true
      }

      if (categories[i].categories.length > 0) {
        updateChildren(categories[i].categories as ICategory[], i)
      }

      if (categories[i].categories?.length > 0) {
        const subcategoryIds = categories[i].categories.map(
          (subcategory) => subcategory.id
        )
        if (
          subcategoryIds.some((id) => checkQuery(id)) ||
          checkQuery(categories[i].id)
        ) {
          categories[i].checked = true
          // categories[i].expanded = true

          if (parentIdx >= visibleItemsCount.value) {
            showHiddenFilters.value = true
          }
        }
      }
    }
  }
}

function checkQuery(value: number) {
  const routeQuery = route.query[props.queryKey] as string

  if (!routeQuery) {
    return false
  }

  const isArray = routeQuery?.includes(',')

  const queryValue = isArray ? routeQuery.split(',') : routeQuery

  return isArray
    ? queryValue?.includes(String(value))
    : queryValue === String(value)
}

function removeRouteQuery() {
  for (let key in route.query) {
    if (key === 'keep') {
      delete route.query[key]
    }
  }
}

const isAllSelected = ref(true)
function onSelectAll() {
  if (!isAllSelected.value) {
    isAllSelected.value = true

    filterItems.value.forEach((parent, idx) => {
      updateParentState(idx, 'checked', true)
      updateParentState(idx, 'expanded', true)

      if (parent.categories) {
        updateChildrenState(parent.categories, true)
      }
    })
  } else {
    isAllSelected.value = false

    filterItems.value.forEach((parent, idx) => {
      updateParentState(idx, 'checked', false)
      updateParentState(idx, 'expanded', false)

      if (parent.categories) {
        updateChildrenState(parent.categories, false)
      }
    })
  }
}

watch(
  () => route.query[props.queryKey],
  (newValue) => {
    isAllSelected.value =
      !newValue || newValue?.length === 1 || (newValue && newValue?.length > 0)
        ? filterItems.value.every((f) =>
            String(newValue)
              .split(',')
              .some((query: string) => String(f.id) === query)
          )
        : false
  },
  {
    immediate: true,
  }
)

watch(
  () => props.clearTrigger,
  () => onSelectAll()
)

watch(
  () => route.query,
  () => {
    if (!(route.query.keep && route.query.keep === 'true')) {
      updateChecked(filterItems.value)
    }
  },
  {
    deep: true,
    immediate: true,
  }
)
</script>
