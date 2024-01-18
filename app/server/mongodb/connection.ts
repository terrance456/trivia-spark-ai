import { MongoClient, ServerApiVersion } from "mongodb";

export let mongoClient: MongoClient | null;

export const getMongoClient = async () => {
  if (mongoClient) {
    console.log("Cached connection");
    return mongoClient;
  }
  mongoClient = new MongoClient(process.env.MONGODB_AUTH as string, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    await mongoClient.connect();
    console.log("DB connected");
    return mongoClient as MongoClient;
  } catch {
    mongoClient = null;
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
