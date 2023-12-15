import { MongoClient, ServerApiVersion } from "mongodb";

interface ConnectMongoDBArgs<T> {
  onNext: () => Promise<T>;
  onError: (error: ResponseError) => void;
}

export const mongoClient = new MongoClient(process.env.MONGODB_AUTH as string, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connectDB<T>(args: ConnectMongoDBArgs<T>) {
  try {
    await mongoClient.connect();
    await mongoClient.db("admin").command({ ping: 1 });
  } catch (error) {
    mongoClient.close();
    return args.onError(new ResponseError("DB Connection failed", 500));
  }

  try {
    return await args.onNext();
  } catch (error: any) {
    return args.onError(new ResponseError(error.message, error.status));
  } finally {
    mongoClient.close();
  }
}

export class ResponseError extends Error {
  readonly status?: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
