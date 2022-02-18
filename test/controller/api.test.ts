import { createApp, close, createHttpRequest } from "@midwayjs/mock";
import { Framework } from "@midwayjs/web";
import { Application } from "egg";

describe("test/controller/api.test.ts", () => {
  let app: Application;

  let todoTest = {
    title: "todo test",
  }

  let todoData: any;

  beforeAll(async () => {
    // create app
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    await close(app);
  });

  it("should POST /api/todo", async () => {
    // make request
    const result = await createHttpRequest(app)
      .post("/api/todo")
      .send({
        title: todoTest.title,
      });
    
    todoData = result.body.data

    console.log('todoData', todoData)

    // todo expect by jest
    expect(result.status).toBe(200);
    expect(result.body.data.title).toBe(todoTest.title);
  });

  it("should Get /api/todos", async () => {
    // make request
    const result = await createHttpRequest(app)
      .get("/api/todos")
      .send();

    console.log(result.body)

    // todo expect by jest
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBeGreaterThan(0);
    // expect(result.body.data).toEqual(expect.arrayContaining(todoData));
  });

  it("should Put /api/todo/:id", async () => {
    // make request
    const newTitle = "todo test update"
    const result = await createHttpRequest(app)
      .put(`/api/todo/${todoData.id}`)
      .send({
        title: newTitle,
      });

    console.log(result.body)
    // todo expect by jest
    expect(result.status).toBe(200);
    expect(result.body.data.title).toEqual(newTitle);
  });

  it("should Put /api/todo/:id/hasDone", async () => {
    // make request

    const result = await createHttpRequest(app)
      .put(`/api/todo/${todoData.id}/hasDone`)
      .send({
        hasDone: true,
      });

    console.log(result.body)
    // todo expect by jest
    expect(result.status).toBe(200);
    expect(result.body.data.hasDone).toEqual(true);
  });

  it("should Del /api/todo/:id", async () => {
    // make request

    const result = await createHttpRequest(app)
      .del(`/api/todo/${todoData.id}`)
      .send();

    console.log(result.body)
    // todo expect by jest
    expect(result.status).toBe(200);

  });
});
