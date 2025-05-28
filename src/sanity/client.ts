import { createClient } from "next-sanity";
import { dataset, projectId } from "./env";

export const client = createClient({
  projectId: projectId,
  dataset: dataset,
  apiVersion: "2023-07-16",
  useCdn: false,
})