import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { F1Controller } from "../src/presentation/controllers/f1.controller";
import { FastifyRequest, FastifyReply } from "fastify";
import { GetDriversUseCase } from "../src/application/use-cases/get-drivers.usecase";

describe("F1Controller", () => {
  let mockRequest: Partial<FastifyRequest>;
  let mockReply: Partial<FastifyReply>;

  beforeEach(() => {
    mockRequest = {};
    mockReply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as unknown as FastifyReply;
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

  it("should return status 200 when searching for an existing driver", async () => {
    const drivers = new GetDriversUseCase().execute();
    const validName = drivers[0];
    mockRequest.params = { name: validName };

    await F1Controller.getDriverByName(
      mockRequest as FastifyRequest<{ Params: { name: string } }>,
      mockReply as FastifyReply,
    );

    expect(mockReply.status).toHaveBeenCalledWith(200);
    expect(mockReply.send).toHaveBeenCalledWith({ data: validName });
  });

  it("should return status 404 and error message for non-existent driver", async () => {
    const name = "Senna";
    mockRequest.params = { name };

    await F1Controller.getDriverByName(
      mockRequest as FastifyRequest<{ Params: { name: string } }>,
      mockReply as FastifyReply,
    );

    expect(mockReply.status).toHaveBeenCalledWith(404);
    expect(mockReply.send).toHaveBeenCalledWith({
      message: `O Piloto '${name}' não faz parte da F1 2026`,
    });
  });
});
