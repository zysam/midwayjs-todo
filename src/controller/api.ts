import {
  Inject,
  Controller,
  Post,
  Provide,
  Get,
  Put,
  Del,
  Body,
} from '@midwayjs/decorator';
import { Context } from 'egg';
// import { IGetUserResponse } from '../interface';
import { TodoService } from '../service/todo';

@Provide()
@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  todoService: TodoService;

  @Get('/todos')
  async getToDo() {
    const { ctx } = this;
    const todos = await this.todoService.findTodo();
    ctx.body = {
      success: true,
      message: '',
      data: todos,
    };
  }

  @Post('/todo')
  async createTodo(@Body() title: string) {
    const { ctx } = this;
    // const { title } = ctx.request.body;
    const todo = {
      title,
      hasDone: false,
    };

    console.log('todo:', todo);
    const result = await this.todoService.saveTodo(todo);
    ctx.body = {
      success: true,
      message: '',
      data: result,
    };
  }

  @Put('/todo/:id')
  async updateTodo() {
    const { ctx } = this;
    const { id } = ctx.params;
    const { title } = ctx.request.body;
    const todo = {
      title,
    };
    const result = await this.todoService.updateTodo(id, todo);
    ctx.body = {
      success: true,
      message: '',
      data: result,
    };
  }

  @Put('/todo/:id/hasDone')
  async updateTodoHasDone() {
    const { ctx } = this;
    const { id } = ctx.params;
    const { hasDone } = ctx.request.body;

    const result = await this.todoService.updateTodoHasDone(id, hasDone);
    ctx.body = {
      success: true,
      message: '',
      data: result,
    };
  }

  @Del('/todo/:id')
  async deleteTodo() {
    const { ctx } = this;
    const { id } = ctx.params;
    const result = await this.todoService.deleteTodo(id);
    ctx.body = {
      success: true,
      message: '',
      data: result,
    };
  }
}
