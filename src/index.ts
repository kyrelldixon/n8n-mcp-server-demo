import { FastMCP } from "fastmcp";
import { z } from "zod";

import { add } from "./add";

const server = new FastMCP({
  name: "Addition",
  version: "1.0.0",
});

server.addTool({
  annotations: {
    openWorldHint: false, // This tool doesn't interact with external systems
    readOnlyHint: true, // This tool doesn't modify anything
    title: "Addition",
  },
  description: "Add two numbers",
  execute: async (args) => {
    return String(add(args.a, args.b));
  },
  name: "add",
  parameters: z.object({
    a: z.number().describe("The first number"),
    b: z.number().describe("The second number"),
  }),
});

server.start({
  transportType: "stdio",
});