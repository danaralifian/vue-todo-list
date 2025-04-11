<script setup lang="ts">
import { ref } from "vue";
import TodoItem from "./TodoItem.vue";

const newTodo = ref("");
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 py-8">
    <h1 class="text-3xl text-center font-bold text-gray-800 mb-8">Todo App</h1>
    <form class="mb-6">
      <input
        v-model="newTodo"
        type="text"
        placeholder="Add a new todo..."
        class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </form>

    <div class="flex justify-center gap-4 mb-6">
      <button
        v-for="filterType in ['all', 'active', 'completed']"
        :key="filterType"
        :class="[
          'px-4 py-2 rounded-lg capitalize',
          'all' === filterType
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
        ]"
      >
        {{ filterType }}
      </button>
    </div>

    <div class="space-y-4">
      <TodoItem />
    </div>
  </div>
</template>
