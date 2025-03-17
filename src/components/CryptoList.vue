<template>
	<div class="mt-4">
		<h2 class="text-xl font-bold mb-4">{{ selectedItem }}</h2>

		<div class="grid grid-cols-1 lg:grid-cols-2 nv:grid-cols-3 gap-4">
			<div
				v-for="coin in cryptoData"
				:key="coin.shortName"
				class="bg-background border border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
			>
				<div class="p-6 lg:p-3 ">
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
						<div
							class="w-28 flex flex-col items-end justify-start gap-2"
						>
							<div class="flex items-center">
								<span
									class="text-xs bg-background-border px-2 py-1 rounded-full"
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
