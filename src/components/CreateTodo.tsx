import { type Todo, todoInput } from '@/types';
import { api } from '@/utils/api';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function CreateTodo() {
  //estado para o input
  const [newTodo, setNewTodo] = useState('');

  //uso do contexto para acesso a funcao invalidade
  const trpc = api.useContext();

  //chamada da api para criar o todo | | como se fosse um axios post
  const { mutate } = api.todo.create.useMutation({
    onMutate: async (newTodo) => {
      //cancela todas as buscas de dados para nao sobrescrever as atuais
      await trpc.todo.all.cancel();
      // Snapshot the previous value
      const previousTodos = trpc.todo.all.getData();

      // Optimistically update to the new value
      trpc.todo.all.setData(undefined, (prev) => {
        const optimisticTodo: Todo = {
          id: 'optimistic-todo-id',
          text: newTodo, // 'placeholder'
          done: false,
        };
        if (!prev) return [optimisticTodo];
        return [...prev, optimisticTodo];
      });

      // Clear input
      setNewTodo('');

      // Return a context object with the snapshotted value
      return { previousTodos };
      //metodo para atualizar a consulta ao criar um novo todo e atualizar o estado
      //para aparecer o novo TODO
    },
    onSettled: async () => {
      await trpc.todo.all.invalidate();
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const result = todoInput.safeParse(newTodo);

          if (!result.success) {
            toast.error(result.error.format()._errors.join('\n'));
            return;
          }

          //criacao da mutacao do todo ou criando todo
          mutate(newTodo);
        }}
        className="flex gap-2"
      >
        <input
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="New Todo..."
          type="text"
          name="new-todo"
          id="new-todo"
          value={newTodo}
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
        />
        <button className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto">
          Create
        </button>
      </form>
    </div>
  );
}
