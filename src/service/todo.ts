import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Todo } from '../entity/todo';
import { Repository } from 'typeorm';
import { ITodoOptions } from '../interface';

@Provide()
export class TodoService {
  @InjectEntityModel(Todo)
  TodoModel: Repository<Todo>;

  // find
  async findTodo() {
    const todos = await this.TodoModel.find();
    return todos;
  }

  // save
  async saveTodo(todo: ITodoOptions) {
    const result = await this.TodoModel.save(todo);
    return result;
  }

  // update
  async updateTodo(id: number, todo: ITodoOptions) {
    const result = await this.TodoModel.update(id, todo);
    if (result.affected === 1) {
      const newResult = await this.TodoModel.findOne(id);
      return newResult;
    }

    return null;
  }

  // updateHasDone
  async updateTodoHasDone(id: number, hasDone: boolean) {
    const result = await this.TodoModel.update(id, { hasDone });
    if (result.affected === 1) {
      const newResult = await this.TodoModel.findOne(id);
      return newResult;
    }

    return null;
  }

  // delete
  async deleteTodo(id: number) {
    const result = await this.TodoModel.delete(id);
    return result;
  }
}
