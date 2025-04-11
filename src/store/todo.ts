import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { Todo } from "../types/todo";
import { computed, ref } from "vue";
import { FilterType } from "../enum/filter";

export const useTodoStore = defineStore("todo", () => {
  const todos = useLocalStorage<Todo[]>("todos", []);
  const filters = ref<FilterType>(FilterType.All);

  const filteredTodos = computed(() => {
    switch (filters.value) {
      case FilterType.All:
        return todos.value.filter((todo) => !todo.completed);
      case FilterType.Completed:
        return todos.value.filter((todo) => todo.completed);
      default:
        return todos.value;
    }
  });

  function addTodo(value: string) {
    const todo: Todo = {
      id: crypto.randomUUID(),
      value,
      completed: false,
      createdAt: new Date(),
    };

    todos.value.unshift(todo);
  }

  return {
    todos,
    filters,
    filteredTodos,
    addTodo,
  };
});
