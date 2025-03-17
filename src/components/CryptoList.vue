<template>
	<div class="mt-4">
		<h2 class="text-xl font-bold mb-4">{{ selectedItem }}</h2>

		<div
			v-if="isLoading"
			class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4"
		>
			<div
				v-for="i in 6"
				:key="`skeleton-${i}`"
				class="bg-background border border-border rounded-lg shadow-sm overflow-hidden animate-pulse"
			>
				<Skeleton />
			</div>
		</div>

		<div
			v-else
			class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4"
		>
			<div
				v-for="coin in cryptoData"
				:key="coin.id"
				class="bg-background border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
				@click="navigateToCoin(coin.id)"
			>
				<div class="p-6 lg:p-3">
					<div class="flex items-start justify-between gap-2">
						<div class="w-full">
							<div class="flex items-center gap-3">
								<img
									:src="coin.image"
									alt="crypto logo"
									class="w-9 h-9 rounded-full"
								/>
								<div>
									<h3 class="font-semibold text-base">{{ coin.name }}</h3>
									<span class="text-xs text-muted-foreground">{{
										coin.symbol.toUpperCase()
									}}</span>
								</div>
							</div>
							<div class="flex flex-col gap-1">
								<p class="font-bold text-lg mt-1">
									{{ formatCurrencyValue(coin.current_price, selectedCurrency) }}
								</p>
							</div>
						</div>
						<div class="w-28 flex flex-col items-end justify-start gap-2">
							<div class="flex items-center">
								<span
									class="text-xs bg-background-border px-2 py-1 rounded-full"
									>Rank #{{ coin.market_cap_rank }}
								</span>
							</div>
							<div>
								<p
									:class="getPriceChangeClass(coin.price_change_percentage_24h)"
								>
									{{ coin.price_change_percentage_24h?.toFixed(3) || '0.000' }}%
								</p>
							</div>
						</div>
					</div>
					<div class="text-muted-foreground text-sm">
						Market Cap: {{ formatMarketCap(coin.market_cap, selectedCurrency) }}
					</div>
				</div>
			</div>
		</div>
		<div
			v-if="!isLoading && cryptoData.length === 0"
			class="text-center py-8"
		>
			<p class="text-muted-foreground">
				No cryptocurrencies found matching your criteria.
			</p>
		</div>
	</div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import Skeleton from "./Skeleton.vue";
import { useRouter } from "vue-router";
import {
	formatCurrencyValue,
	formatMarketCap,
	getPriceChangeClass,
} from "../composables/formatUtils";

const router = useRouter();

const props = defineProps({
	selectedItem: {
		type: String,
		required: true,
	},
	cryptoData: {
		type: Array,
		required: true,
		default: () => [],
	},
	selectedCurrency: {
		type: String,
		required: true,
		default: "USD",
	},
	isLoading: {
		type: Boolean,
		default: false,
	},
});

const navigateToCoin = (coinId) => {
	router.push({
		name: "details",
		params: { id: coinId },
	});
};

const isModalOpen = ref(false);
const selectedCoinId = ref('');

const openCoinDetails = (coinId) => {
  selectedCoinId.value = coinId;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>