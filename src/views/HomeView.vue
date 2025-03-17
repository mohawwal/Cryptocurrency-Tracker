<template>
	<main class="my-8 text-sm">
		<header class="flex flex-col lg:flex-row gap-4 items-center w-full">
			<div
				class="flex items-center border-2 border-border hover:border-primary rounded-lg px-3 py-2 w-full lg:w-3/4 bg-background"
			>
				<Search class="w-4 h-4 text-gray-500" />
				<input
					v-model="searchQuery"
					type="search"
					placeholder="search..."
					class="w-full bg-transparent outline-none px-2"
					@input="filterCryptoData"
				/>
			</div>

			<div
				class="relative w-full lg:w-1/5"
				ref="currencyDropdownRef"
			>
				<button
					@click="toggleCurrency"
					class="flex items-center justify-between px-4 py-2 border-2 border-border hover:border-primary rounded-lg w-full bg-background"
				>
					<p>{{ selectedCurrency }}</p>
					<ChevronDown class="w-4 h-4 ml-2" />
				</button>
				<div
					v-if="showDropdown"
					class="absolute left-0 w-full mt-2 border-2 border-border rounded-lg p-2 bg-background z-10"
				>
					<ul class="flex flex-col">
						<li
							v-for="currency in currencies"
							:key="currency"
							@click="selectCurrency(currency)"
							class="cursor-pointer px-3 py-2 hover:bg-border rounded-md"
						>
							{{ currency }}
						</li>
					</ul>
				</div>
			</div>

			<button
				@click="fetchCryptoData"
				class="flex items-center justify-center gap-2 px-4 py-2 rounded-lg w-full lg:w-auto min-w-[200px] bg-primary border hover:border-foreground"
				:disabled="isLoading"
			>
				<RefreshCw class="w-4 h-4" :class="{ 'animate-spin': isLoading }" />
				<p>{{ isLoading ? 'Loading...' : 'Refresh' }}</p>
			</button>
		</header>
		<div class="mt-5">
			<span class="text-muted-foreground"> Last Updated: {{ lastUpdated }} </span>

			<div class="flex flex-wrap my-3 gap-3">
				<ul
					class="flex flex-wrap dark:bg-muted bg-border gap-2 items-center p-1 rounded-md cursor-pointer"
				>
					<li
						v-for="(item, index) in menuItems"
						:key="index"
						@click="selectItem(item.name)"
						class="flex items-center gap-2 px-3 py-2 rounded-sm"
						:class="{
							'bg-sidebar': selectedItem === item.name,
							'hover:bg-sidebar-border': selectedItem !== item.name,
						}"
					>
						<component
							:is="item.icon"
							class="w-4 h-4 transition-all duration-200 ease-in-out"
						/>
					</li>
				</ul>
			</div>
			<div class="mt-5">
				<CryptoList
					:selectedItem="selectedItem"
					:cryptoData="filteredCryptoData"
					:selectedCurrency="selectedCurrency"
					:isLoading="isLoading"
				/>
			</div>
		</div>
	</main>
</template>

<script setup>
import { onMounted, computed, watch } from "vue";
import { ref } from "vue";
import {
	ChevronDown,
	Search,
	RefreshCw,
	TrendingUp,
	TrendingDown,
	HandCoins,
} from "lucide-vue-next";
import { useClickOutside } from "../composables/usesClickOutside";
import CryptoList from "../components/CryptoList.vue";
import CoinGeckoApi from "../services/CoinGeckoApi";

const selectedCurrency = ref("USD");
const showDropdown = ref(false);
const currencies = ["USD", "EUR", "NGN", "GBP", "JPY"];
const currencyDropdownRef = ref(null);
const lastUpdated = ref(new Date().toLocaleTimeString());
const searchQuery = ref("");
const originalCryptoData = ref([]);
const filteredCryptoData = ref([]);
const isLoading = ref(true);

const toggleCurrency = () => {
	showDropdown.value = !showDropdown.value;
};

const selectCurrency = (currency) => {
	selectedCurrency.value = currency;
	showDropdown.value = false;
	fetchCryptoData();
};

const menuItems = [
	{ name: "All Cryptocurrencies", icon: HandCoins },
	{ name: "Top Gainers", icon: TrendingUp },
	{ name: "Top Lost", icon: TrendingDown },
];

const selectedItem = ref(menuItems[0].name);

const fetchCryptoData = async (params = {}) => {
	try {
		isLoading.value = true;
		const result = await CoinGeckoApi.getCryptoData({
			vs_currency: selectedCurrency.value.toLowerCase(),
			...params
		});
		originalCryptoData.value = result.data;
		filterCryptoData();
		lastUpdated.value = new Date().toLocaleTimeString();
	} catch (err) {
		console.log("Error in fetchCryptoData:", err);
	} finally {
		isLoading.value = false;
	}
};

const filterCryptoData = () => {
	let filtered = [...originalCryptoData.value];
	
	if (searchQuery.value.trim() !== "") {
		const query = searchQuery.value.toLowerCase();
		filtered = filtered.filter(coin => 
			coin.name.toLowerCase().includes(query) || 
			coin.symbol.toLowerCase().includes(query)
		);
	}
	
	if (selectedItem.value === "Top Gainers") {
		filtered = filtered.filter(coin => coin.price_change_percentage_24h > 0)
			.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
	} else if (selectedItem.value === "Top Lost") {
		filtered = filtered.filter(coin => coin.price_change_percentage_24h < 0)
			.sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
	}
	
	filteredCryptoData.value = filtered;
};

const selectItem = (itemName) => {
	selectedItem.value = itemName;
	filterCryptoData();
};

watch(searchQuery, () => {
	filterCryptoData();
});

useClickOutside(currencyDropdownRef, () => {
	showDropdown.value = false;
});

onMounted(() => {
	fetchCryptoData();
});
</script>