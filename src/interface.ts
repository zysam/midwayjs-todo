/**
 * @description todo interface
 */
export interface ITodoOptions {
  id?: number;
  title: string;
  hasDone?: boolean;
}

export interface IGetTodoResponse {
  success: boolean;
  message: string;
  data: ITodoOptions;
}
