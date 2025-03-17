<template>
	<div class="mt-4">
		<h2 class="text-xl font-bold mb-4">{{ selectedItem }}</h2>

		<div v-if="isLoading" class="grid grid-cols-1 lg:grid-cols-2 nv:grid-cols-3 gap-4">
			<div
				v-for="i in 6"
				:key="`skeleton-${i}`"
				class="bg-background border border-border rounded-lg shadow-sm overflow-hidden animate-pulse"
			>
				<div class="p-6 lg:p-3">
					<div class="flex items-start justify-between gap-2">
						<div class="w-full">
							<div class="flex items-center gap-3">
								<div class="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700"></div>
								<div>
									<div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
									<div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12 mt-1"></div>
								</div>
							</div>
							<div class="flex flex-col gap-1">
								<div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mt-2"></div>
							</div>
						</div>
						<div class="w-28 flex flex-col items-end justify-start gap-2">
							<div class="flex items-center">
								<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
							</div>
							<div>
								<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-14 mt-2"></div>
							</div>
						</div>
					</div>
					<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 mt-2"></div>
				</div>
			</div>
		</div>

		<div v-else class="grid grid-cols-1 lg:grid-cols-2 nv:grid-cols-3 gap-4">
			<div
				v-for="coin in cryptoData"
				:key="coin.id"
				class="bg-background border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
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
									{{ formatCurrencyValue(coin.current_price) }}
								</p>
							</div>
						</div>
						<div class="w-28 flex flex-col items-end justify-start gap-2">
							<div class="flex items-center">
								<span class="text-xs bg-background-border px-2 py-1 rounded-full"
									>Rank #{{ coin.market_cap_rank }}
								</span>
							</div>
							<div>
								<p
									:class="
										coin.price_change_percentage_24h < 0
											? 'text-red-500 font-medium'
											: 'text-green-500 font-medium'
									"
								>
									{{ coin.price_change_percentage_24h.toFixed(3) }}%
								</p>
							</div>
						</div>
					</div>
					<div class="text-muted-foreground text-sm">
						Market Cap: {{ formatCurrencyValue(coin.market_cap) }}
					</div>
				</div>
			</div>
		</div>

		<div v-if="!isLoading && cryptoData.length === 0" class="text-center py-8">
			<p class="text-muted-foreground">No cryptocurrencies found matching your criteria.</p>
		</div>
	</div>
</template>

<script setup>
import { defineProps } from "vue";

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
		default: "USD"
	},
	isLoading: {
		type: Boolean,
		default: false
	}
});

const formatCurrencyValue = (value) => {
	const formatter = new Intl.NumberFormat(undefined, {
		style: 'currency',
		currency: props.selectedCurrency,
		minimumFractionDigits: 2,
		maximumFractionDigits: 6
	});
	return formatter.format(value);
};
</script>