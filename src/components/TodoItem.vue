<script setup lang="ts">
import { Pencil, Trash2 } from "lucide-vue-next";
import { ref } from "vue";
import { Todo } from "../types/todo";

const props = defineProps<{
  todo: Todo;
  onTogle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, value: string) => void;
}>();

const isEditing = ref(false);
const editItem = ref(props.todo.value);

function onClickEdit() {
  isEditing.value = true;
  editItem.value = props.todo.value;
}

function onSave() {
  if (editItem.value.trim()) {
    props.onUpdate(props.todo.id, editItem.value.trim());
  }
  isEditing.value = false;
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === "Enter") {
    onSave();
  } else if (event.key === "Escape") {
    isEditing.value = false;
    editItem.value = props.todo.value;
  }
}
</script>
<template>
  <div
    class="p-4 bg-white rounded-lg shadow-sm group hover:shadow-md transition-shadow"
  >
    <div v-if="!isEditing" class="flex items-center gap-4">
      <input
        :checked="todo.completed"
        @change="onTogle(todo.id)"
        type="checkbox"
        class="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <span class="text-base flex-1">todo item</span>
      <button
        @click="onClickEdit"
        class="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Pencil :size="24" class="text-blue-500" />
      </button>
      <button
        @click="onDelete(todo.id)"
        class="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 :size="24" class="text-red-500" />
      </button>
    </div>

    <input
      v-else
      v-model="editItem"
      @blur="onSave"
      @keydown="handleKeyDown"
      ref="input"
      v-focus
      class=""
    />
  </div>
</template>
