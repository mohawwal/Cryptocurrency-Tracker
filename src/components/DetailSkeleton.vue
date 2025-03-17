<template>
	<div>
		<div class="flex flex-col md:flex-row gap-6">
			<div
				class="w-full md:w-3/4 bg-background border border-border rounded-lg p-6 animate-pulse"
			>
				<div class="flex items-center gap-4">
					<div
						class="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700"
					></div>
					<div class="flex-1">
						<div
							class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"
						></div>
						<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
					</div>
				</div>
				<div class="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
					<div
						v-for="i in 4"
						:key="i"
						class="h-20 bg-gray-200 dark:bg-gray-700 rounded"
					></div>
				</div>
			</div>

			<div
				class="w-full md:w-1/4 bg-background border border-border rounded-lg p-6 animate-pulse"
			>
				<div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
				<div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full mb-6"></div>
				<div class="h-24 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
			</div>
		</div>

		<div class="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
			<div
				class="lg:col-span-2 bg-background border border-border rounded-lg p-6 animate-pulse"
			>
				<div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
				<div class="space-y-2">
					<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
					<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
					<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
				</div>
			</div>

			<div
				class="bg-background border border-border rounded-lg p-6 animate-pulse"
			>
				<div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
				<div class="space-y-4">
					<div
						v-for="i in 6"
						:key="`stat-${i}`"
						class="flex justify-between"
					>
						<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
						<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.animate-pulse {
	animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
	0%,
	100% {
		opacity: 1;
	}
	50% {
		opacity: 0.5;
	}
}
</style>
