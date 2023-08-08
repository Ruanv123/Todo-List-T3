import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { todoInput } from '@/types';

export const todoRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    // chamando o contexto onde tem o prisma e o session do usuario
    const todos = await ctx.prisma.todo.findMany({
      // selecionando apenas tasks q sejam do usuario logado!
      where: {
        userId: ctx.session.user.id,
      },
    });

    //desestruturando o map e retornando o todo no get
    return todos.map(({ id, text, done }) => ({ id, text, done }));
  }),
  //funcao de criar task
  create: protectedProcedure
    //tipando a entrada do input com todoInput
    .input(todoInput)
    //criacao de usuario com mutation
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.todo.create({
        data: {
          text: input,
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),

  //funcao de deletar
  delete: protectedProcedure
    //tipando a entrada do id
    .input(z.string())
    //deletar todo por id
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.todo.delete({
        where: {
          id: input,
        },
      });
    }),

  //mudar estado do check
  toggle: protectedProcedure
    //entrada de dados
    .input(
      //tipagem com z object
      z.object({
        id: z.string(),
        done: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input: { id, done } }) => {
      return ctx.prisma.todo.update({
        where: {
          id,
        },
        data: {
          done,
        },
      });
    }),
});
