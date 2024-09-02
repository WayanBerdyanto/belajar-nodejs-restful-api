import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import {
  createManyTestContacts,
  createTestContact,
  createTestUser,
  getTestContact,
  removeAllTestContacts,
  removeTestUser,
} from "./test-util.js";
describe("POST /api/contacts", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });
  it("should can create new contacts", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        first_name: "John",
        last_name: "Doe",
        phone: "06281234567890",
        email: "johndoe@example.com",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe("John");
    expect(result.body.data.last_name).toBe("Doe");
    expect(result.body.data.phone).toBe("06281234567890");
    expect(result.body.data.email).toBe("johndoe@example.com");
  });

  it("should reject if request is not valid", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        first_name: "",
        last_name: "Doe",
        phone: "062812345678902382323829382232323",
        email: "johndoe@example.com",
      });
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});
