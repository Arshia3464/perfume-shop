import { drizzle } from "drizzle-orm/postgres-js";
import { env } from "@/env";

import postgres from "postgres";
import * as schema from "./schema";

// Prepare configuration for a standard cloud instance, disabling prefetching
const queryClient = postgres(env.DATABASE_URL, { prepare: false });

export const db = drizzle(queryClient, { schema });
