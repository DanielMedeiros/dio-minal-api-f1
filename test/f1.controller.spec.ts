import { F1Controller } from "../src/presentation/controllers/f1.controller";
import { FastifyRequest, FastifyReply } from "fastify";

describe("F1Controller", () => {
  let mockRequest: Partial<FastifyRequest>;
  let mockReply: Partial<FastifyReply>;

  beforeEach(() => {
    mockRequest = {};
    mockReply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
  });

  it("should return teams with status 200", async () => {
    await F1Controller.getTeams(
      mockRequest as FastifyRequest,
      mockReply as FastifyReply,
    );

    expect(mockReply.status).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.any(Array) }),
    );
  });

  it("should return drivers with status 200", async () => {
    await F1Controller.getDrivers(
      mockRequest as FastifyRequest,
      mockReply as FastifyReply,
    );

    expect(mockReply.status).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.any(Array) }),
    );
  });
});
