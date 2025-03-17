<template>
  <div class="container mx-auto px-4 py-8 max-w-6xl">
    <div v-if="isLoading" class="animate-fade-in">
      <DetailSkeleton />
    </div>
    
    <div v-else class="animate-fade-in">
      <button 
        @click="goBack" 
        class="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6"></path>
        </svg>
        Back to list
      </button>
    
      <div class="flex flex-col md:flex-row gap-6">
        <div class="w-full md:1/2 lg:w-3/4 bg-background border border-border rounded-lg sm:p-6 p-4 transition-all duration-300 hover:shadow-md">
          <div class="flex items-start gap-4">
            <img :src="coinData.image?.large" :alt="coinData.name" class="w-14 h-14 rounded-full" />
            <div>
              <div class="flex items-start flex-row gap-5">
                <div>
                  <h1 class="text-xl font-bold">{{ coinData.name }}</h1>
                  <p  class="text-muted-foreground py-1 text-xs">
                    {{ coinData.symbol?.toUpperCase() }}
                  </p>
                </div>
                <span class="bg-background-border text-muted-foreground mt-2 px-2 py-1 rounded-full text-xs">
                  Rank #{{ coinData.market_cap_rank }}
                </span>
              </div>
              <div class="flex items-center text-sm gap-2 mt-1">
                <a 
                  v-if="coinData.links?.homepage[0]" 
                  :href="coinData.links.homepage[0]" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="text-sm text-blue-500 hover:underline"
                >
                  Website
                </a>
                <a 
                  v-if="coinData.links?.blockchain_site[0]" 
                  :href="coinData.links.blockchain_site[0]" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="text-sm text-blue-500 hover:underline"
                >
                  Explorer
                </a>
                <a 
                  v-if="coinData.links?.repos_url?.github[0]" 
                  :href="coinData.links.repos_url.github[0]" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="text-sm text-blue-500 hover:underline"
                >
                  Github
                </a>
              </div>
            </div>
          </div>
          
          <div class="mt-6 grid grid-cols-2 nv:grid-cols-4 gap-4 ">
            <div class="p-4 bg-background-alt rounded-lg transition-transform duration-300 hover:scale-105">
              <div class="text-muted-foreground text-sm">Market Cap</div>
              <div class="text-sm font-semibold mt-1">{{ formatMarketCap(coinData.market_data?.market_cap[currency.toLowerCase()], currency) }}</div>
            </div>
            
            <div class="p-4 bg-background-alt rounded-lg transition-transform duration-300 hover:scale-105">
              <div class="text-muted-foreground text-sm">24h Volume</div>
              <div class="text-sm font-semibold mt-1">{{ formatMarketCap(coinData.market_data?.total_volume[currency.toLowerCase()], currency) }}</div>
            </div>
            
            <div class="p-4 bg-background-alt rounded-lg transition-transform duration-300 hover:scale-105">
              <div class="text-muted-foreground text-sm">Circulating Supply</div>
              <div class="text-sm font-semibold mt-1 truncate overflow-hidden text-ellipsis w-full">
                {{ formatNumber(coinData.market_data?.circulating_supply) }}
              </div>
            </div>
            
            <div class="p-4 bg-background-alt rounded-lg transition-transform duration-300 hover:scale-105">
              <div class="text-muted-foreground text-sm">Max Supply</div>
              <div class="text-sm font-semibold mt-1">{{ coinData.market_data?.max_supply ? formatNumber(coinData.market_data.max_supply) : 'Unlimited' }}</div>
            </div>
          </div>
        </div>
        
        <div class="w-full md:1/2 lg:w-1/4 bg-background border border-border rounded-lg p-6 transition-all duration-300 hover:shadow-md">
          <h2 class="font-bold text-xl mb-2">{{ coinData.name }} Price</h2>
          <div class="flex flex-wrap items-baseline gap-2">
            <div class="text-xl font-bold">
              {{ formatCurrencyValue(coinData.market_data?.current_price[currency.toLowerCase()], currency) }}
            </div>
            <div 
              :class="getPriceChangeClass(coinData.market_data?.price_change_percentage_24h)"
              class="flex items-center"
            >
              <svg 
                v-if="coinData.market_data?.price_change_percentage_24h >= 0" 
                xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              >
                <path d="m18 15-6-6-6 6"></path>
              </svg>
              <svg 
                v-else
                xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
              {{ coinData.market_data?.price_change_percentage_24h?.toFixed(2) }}%
            </div>
          </div>
          
          <div class="mt-6">
            <div class="flex justify-between mb-2">
              <div class="text-muted-foreground text-xs">24h Low</div>
              <div class="font-medium text-sm">{{ formatCurrencyValue(coinData.market_data?.low_24h[currency.toLowerCase()], currency) }}</div>
            </div>
            <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-2 relative">
              <div 
                class="absolute inset-y-0 bg-blue-600 rounded-full" 
                :style="getPriceRangeStyle()"
              ></div>
              <div 
                class="absolute w-3 h-3 bg-white border-2 border-blue-600 rounded-full -mt-0.5 -ml-1"
                :style="getCurrentPricePosition()"
              ></div>
            </div>
            <div class="flex justify-between">
              <div class="text-muted-foreground text-xs">24h High</div>
              <div class="font-medium text-sm">{{ formatCurrencyValue(coinData.market_data?.high_24h[currency.toLowerCase()], currency) }}</div>
            </div>
          </div>
          
          <div class="mt-6 space-y-2 border-t border-border pt-4">
            <div class="flex justify-between">
              <div class="text-muted-foreground text-xs">7d Change</div>
              <div :class="getPriceChangeClass(coinData.market_data?.price_change_percentage_7d)">
                {{ coinData.market_data?.price_change_percentage_7d?.toFixed(2) }}%
              </div>
            </div>
            <div class="flex justify-between">
              <div class="text-muted-foreground text-xs">30d Change</div>
              <div :class="getPriceChangeClass(coinData.market_data?.price_change_percentage_30d)">
                {{ coinData.market_data?.price_change_percentage_30d?.toFixed(2) }}%
              </div>
            </div>
            <div class="flex justify-between">
              <div class="text-muted-foreground text-xs">1y Change</div>
              <div :class="getPriceChangeClass(coinData.market_data?.price_change_percentage_1y)">
                {{ coinData.market_data?.price_change_percentage_1y?.toFixed(2) }}%
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Description and additional stats -->
      <div class="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 bg-background border border-border rounded-lg p-6 transition-all duration-300 hover:shadow-md">
          <h2 class="font-bold text-lg mb-4">About {{ coinData.name }}</h2>
          <div v-if="coinData.description?.en" class="prose prose-sm max-w-none" v-html="sanitizeHtml(coinData.description.en)"></div>
          <div v-else class="text-muted-foreground">No description available.</div>
        </div>
        
        <div class="bg-background border border-border rounded-lg p-6 transition-all duration-300 hover:shadow-md">
          <h2 class="font-bold text-lg mb-4">{{ coinData.name }} Stats</h2>
          
          <div class="space-y-4">
            <div class="flex justify-between">
              <div class="text-muted-foreground text-sm">ATH</div>
              <div class="font-medium">{{ formatCurrencyValue(coinData.market_data?.ath[currency.toLowerCase()], currency) }}</div>
            </div>
            <div class="flex justify-between">
              <div class="text-muted-foreground text-sm">ATH Change %</div>
              <div :class="getPriceChangeClass(coinData.market_data?.ath_change_percentage[currency.toLowerCase()])">
                {{ coinData.market_data?.ath_change_percentage[currency.toLowerCase()]?.toFixed(2) }}%
              </div>
            </div>
            <div class="flex justify-between">
              <div class="text-muted-foreground text-sm">ATH Date</div>
              <div class="font-medium">{{ formatDate(coinData.market_data?.ath_date[currency.toLowerCase()]) }}</div>
            </div>
            <div class="flex justify-between">
              <div class="text-muted-foreground text-sm">ATL</div>
              <div class="font-medium">{{ formatCurrencyValue(coinData.market_data?.atl[currency.toLowerCase()], currency) }}</div>
            </div>
            <div class="flex justify-between">
              <div class="text-muted-foreground text-sm">ATL Change %</div>
              <div :class="getPriceChangeClass(coinData.market_data?.atl_change_percentage[currency.toLowerCase()])">
                {{ coinData.market_data?.atl_change_percentage[currency.toLowerCase()]?.toFixed(2) }}%
              </div>
            </div>
            <div class="flex justify-between">
              <div class="text-muted-foreground text-sm">ATL Date</div>
              <div class="font-medium">{{ formatDate(coinData.market_data?.atl_date[currency.toLowerCase()]) }}</div>
            </div>
          </div>
          
          <div class="mt-6 pt-4 border-t border-border">
            <div class="flex justify-between mb-2">
              <div class="text-muted-foreground text-sm">Community Score</div>
              <div class="font-medium">{{ coinData.community_score?.toFixed(1) || 'N/A' }}</div>
            </div>
            <div class="flex justify-between mb-2">
              <div class="text-muted-foreground text-sm">Sentiment Up</div>
              <div class="font-medium text-green-500">{{ coinData.sentiment_votes_up_percentage?.toFixed(1) || 'N/A' }}%</div>
            </div>
            <div class="flex justify-between">
              <div class="text-muted-foreground text-sm">Sentiment Down</div>
              <div class="font-medium text-red-500">{{ coinData.sentiment_votes_down_percentage?.toFixed(1) || 'N/A' }}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CoinGeckoApi from "../services/CoinGeckoApi";
import DetailSkeleton from "../components/DetailSkeleton.vue"
import {
  formatCurrencyValue,
  formatMarketCap,
  getPriceChangeClass
} from '../composables/formatUtils';

const route = useRoute();
const router = useRouter();
const coinData = ref({});
const isLoading = ref(true);
const currency = ref('USD');

// Function to sanitize HTML
const sanitizeHtml = (html) => {
  // Basic sanitization to prevent XSS
  // In a real app, use a proper sanitizer like DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/onerror=/gi, '')
    .replace(/onload=/gi, '');
};

const formatNumber = (num) => {
  if (!num) return 'N/A';
  return new Intl.NumberFormat().format(num);
};
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

const getPriceRangeStyle = () => {
  if (!coinData.value.market_data) return { width: '0%' };
  
  const low = coinData.value.market_data.low_24h[currency.value.toLowerCase()];
  const high = coinData.value.market_data.high_24h[currency.value.toLowerCase()];
  
  return { width: '100%' };
};

// Calculate current price position on the range bar
const getCurrentPricePosition = () => {
  if (!coinData.value.market_data) return { left: '0%' };
  
  const low = coinData.value.market_data.low_24h[currency.value.toLowerCase()];
  const high = coinData.value.market_data.high_24h[currency.value.toLowerCase()];
  const current = coinData.value.market_data.current_price[currency.value.toLowerCase()];
  
  if (high === low) return { left: '50%' };
  const position = ((current - low) / (high - low)) * 100;
  return { left: `${position}%` };
};

// Go back to previous page
const goBack = () => {
  router.back();
};

// Fetch coin data
const fetchCoinData = async () => {
  isLoading.value = true;
  try {
    const coinId = route.params.id;
    const response = await CoinGeckoApi.getCoinDetails(coinId);
    coinData.value = response.data;
  } catch (error) {
    console.error('Error fetching coin details:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchCoinData();
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bg-background-alt {
  @apply bg-gray-100 dark:bg-gray-800;
}
</style>