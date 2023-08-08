import type { Todo } from '@/types';

//tipando as props atravez do objeto criado no types
type TodoProps = {
  todo: Todo;
};

export default function Todo({ todo }: TodoProps) {
  //recebendo as props do todo
  const { id, text, done } = todo;

  return (
    <>
      <div className="flex items-center justify-between gap-2 py-2">
        <div className="flex items-center gap-2">
          <input
            className="focus:ring-3 h-4 w-4 cursor-pointer rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            type="checkbox"
            name="done"
            id={id}
            checked={done}
            /* onChange={(e) => {
              doneMutation({ id, done: e.target.checked });
            }} */
          />
          <label
            htmlFor={id}
            className={`cursor-pointer ${done ? 'line-through' : ''}`}
          >
            {text}
          </label>
        </div>
        <button
          className="w-full rounded-lg bg-blue-700 px-2 py-1 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
          /* onClick={() => {
            deleteMutation(id);
          }} */
        >
          Delete
        </button>
      </div>
    </>
  );
}
