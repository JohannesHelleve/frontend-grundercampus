import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "oa0xw1sx",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});