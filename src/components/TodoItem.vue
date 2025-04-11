<script setup lang="ts">
import { Pencil, Trash2 } from "lucide-vue-next";
</script>
<template>
  <div
    class="p-4 bg-white rounded-lg shadow-sm group hover:shadow-md transition-shadow"
  >
    <div class="flex items-center gap-4">
      <input
        type="checkbox"
        class="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <span class="text-base flex-1">todo item</span>
      <button class="opacity-0 group-hover:opacity-100 transition-opacity">
        <Pencil :size="24" class="text-blue-500" />
      </button>
      <button class="opacity-0 group-hover:opacity-100 transition-opacity">
        <Trash2 :size="24" class="text-red-500" />
      </button>
    </div>
  </div>
</template>

<style lang=""></style>
