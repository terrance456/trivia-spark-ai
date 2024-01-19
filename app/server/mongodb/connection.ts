import { MongoClient, ServerApiVersion } from "mongodb";

export const getMongoClient = async () => {
  if ((global as any).mongoClient) {
    console.log("Cached connection");
    return (global as any).mongoClient;
  }
  (global as any).mongoClient = new MongoClient(process.env.MONGODB_AUTH as string, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    await (global as any).mongoClient.connect();
    console.log("DB connected");
    return (global as any).mongoClient as MongoClient;
  } catch {
    (global as any).mongoClient = null;
    console.log("DB Connection failed");
    throw {};
  }
};

export class ResponseError extends Error {
  readonly status?: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
