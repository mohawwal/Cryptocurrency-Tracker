<template>
  <div ref="themeDropdownRef" class="relative inline-block text-left">
    <button @click="isOpen = !isOpen" class="p-1.5 rounded-lg bg-background-border border hover:border-primary">
      <component :is="selectedIcon" class="w-5 h-5"/>
    </button>

    <div v-if="isOpen" class="absolute z-50 text-sm bg-background right-0 w-32 mt-2 border shadow-lg rounded-lg py-2 px-1">
      <button
        v-for="(theme, index) in themes"
        :key="index"
        @click="selectTheme(theme)"
        class="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-background-border"
      >
        <component :is="theme.icon" class="w-4 h-4" />
        <span>{{ theme.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useThemeStore } from "../store/themeStore";
import { LucideSun, LucideMoon, LucideMonitor } from "lucide-vue-next"; 
import { useClickOutside } from "../composables/usesClickOutside"

const themeStore = useThemeStore();
const isOpen = ref(false);
const themeDropdownRef = ref(null);

const themes = [
  { name: "Light", value: "light", icon: LucideSun },
  { name: "Dark", value: "dark", icon: LucideMoon },
  { name: "System", value: "system", icon: LucideMonitor }
];

const selectedTheme = ref(themes[0]);
const selectedIcon = ref(selectedTheme.value.icon);

const selectTheme = (theme) => {
  selectedTheme.value = theme;
  selectedIcon.value = theme.icon;
  themeStore.setTheme(theme.value);
  isOpen.value = false;
};

useClickOutside(themeDropdownRef, () => {
  isOpen.value = false;
});
</script>
