import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { Todo } from "../types/todo";
import { computed, ref } from "vue";
import { FilterType } from "../enum/filter";

export const useTodoStore = defineStore("todo", () => {
  const todos = useLocalStorage<Todo[]>("todos", []);
  const filter = ref<FilterType>(FilterType.All);

  const filteredTodos = computed(() => {
    switch (filter.value) {
      case FilterType.Active:
        return todos.value.filter((todo) => !todo.completed);
      case FilterType.Completed:
        return todos.value.filter((todo) => todo.completed);
      default:
        return todos.value;
    }
  });

  function add(value: string) {
    const todo: Todo = {
      id: crypto.randomUUID(),
      value,
      completed: false,
      createdAt: new Date(),
    };

    todos.value.unshift(todo);
  }

  function remove(id: string) {
    const index = todos.value.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      todos.value.splice(index, 1);
    }
  }

  function completed(id: string) {
    const todo = todos.value.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  function update(id: string, value: string) {
    const todo = todos.value.find((todo) => todo.id === id);
    if (todo) {
      todo.value = value;
    }
  }

  return {
    todos,
    filter,
    filteredTodos,
    add,
    remove,
    completed,
    update,
  };
});
