<script setup lang="ts">
import { ref } from "vue";
import TodoItem from "./TodoItem.vue";
import { FilterType } from "../enum/filter";
import { useTodoStore } from "../store/todo";

const filterTypes = Object.values(FilterType);
const newTodo = ref("");
const todoStore = useTodoStore();

function handleSubmit(e: Event) {
  e.preventDefault();
  const value = newTodo.value.trim();

  if (value) {
    todoStore.add(value);
    newTodo.value = "";
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 py-8">
    <h1 class="text-3xl text-center font-bold text-gray-800 mb-8">Todo App</h1>
    <form class="mb-6" @submit="handleSubmit">
      <input
        v-model="newTodo"
        type="text"
        placeholder="Add a new todo..."
        class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </form>

    <div class="flex justify-center gap-4 mb-6">
      <button
        v-for="filterType in filterTypes"
        :key="filterType"
        @click="todoStore.filter = filterType"
        :class="[
          'px-4 py-2 rounded-lg capitalize',
          todoStore.filter === filterType.toLowerCase()
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
        ]"
      >
        {{ filterType }}
      </button>
    </div>

    <div class="space-y-4">
      <TransitionGroup name="list">
        <TodoItem
          v-for="todo in todoStore.filteredTodos"
          :todo="todo"
          :key="todo.id"
          :onTogle="todoStore.completed"
          :onDelete="todoStore.remove"
          :onUpdate="todoStore.update"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-enter-to {
  opacity: 1; /* Final opacity for entering items */
  transform: translateX(0); /* Final position for entering items */
}

.list-leave {
  opacity: 1; /* Start fully visible for leaving items */
  transform: translateX(0); /* Start at original position for leaving items */
}
</style>
