<template>
  <div
    class="p-2.5 rounded-xl border border-solid border-gray-500 flex-center-between"
  >
    <div class="flex-y-center gap-2">
      <CommonBlockPreloader width="44px" height="44px" :loading="loading">
        <div class="w-11 h-11 rounded-lg bg-transparent flex-center">
          <img
            :src="image"
            class="w-auto h-auto"
            :alt="card?.processing"
          />
        </div>
      </CommonBlockPreloader>
      <CommonBlockPreloader width="160px" height="20.8px" :loading="loading">
        <p class="text-base leading-130 text-dark font-semibold dark:text-white">
          {{ card?.number }}
        </p>
      </CommonBlockPreloader>
    </div>
    <CommonBlockPreloader width="30px" height="30px" :loading="loading">
      <button @click="$emit('delete')">
        <i
          class="icon-trash text-3xl text-gray-200 hover:text-red dark:hover:text-secondary_red transition-300"
        />
      </button>
    </CommonBlockPreloader>
  </div>
</template>

<script setup lang="ts">
interface Props {
  card: {
    id: number
    name: string
    processing: string
    number: string
    expiry_date: number
  }
  loading?: boolean
}


const paymentSystems = {
  "8600": "uzcard",
  "9860": "humo",
  "5440": "mastercard",
  "4200": "visa",
  "4073": "visa",
  "5614": "humo",
};

const image = computed(() => {
  const paymentSystem: string = String(props.card?.number)
    .split("")
    .slice(0, 4)
    .join("");
  const systems = paymentSystems;
  if (!systems[paymentSystem as keyof typeof systems]) {
    return "/images/payments/card.svg";
  } else {
    return `/images/payments/${
      systems[paymentSystem as keyof typeof systems]
    }.svg`;
  }
});

const props = withDefaults(defineProps<Props>(), {})
const svgGenerator = computed(() => {
  return props.card?.processing?.toLowerCase()
})
</script>
