import { api } from '@/utils/api';
import React from 'react';
import Todo from './Todo';

export default function Todos() {
  const { data: todos, isLoading, isError } = api.todo.all.useQuery();

  if (isError) {
    return <h1>Ocorreu um error</h1>;
  }

  if (isLoading) {
    return <h1>carregando...</h1>;
  }

  return (
    <div>
      {todos.length
        ? todos?.map((todo) => {
            return <Todo key={todo.id} todo={todo} />;
          })
        : 'Crie sua primeira todo...'}
    </div>
  );
}
