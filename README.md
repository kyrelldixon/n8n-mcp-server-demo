# fastmcp-boilerplate

A boilerplate project for building MCP servers using [FastMCP](https://github.com/punkpeye/fastmcp), a TypeScript framework for building Model Context Protocol (MCP) servers.

## Prerequisites

This project uses [Bun](https://bun.sh), a fast all-in-one JavaScript runtime, package manager, and bundler. You can install it following the [official documentation](https://bun.sh/docs/installation).

## Getting Started

To install dependencies:

```bash
bun install
```

To run the project:

```bash
bun run index.ts
```

To run tests:

```bash
bun test
```

Another way to run the server is to use the official MCP Inspector to inspect your server with a Web UI:

```bash
bun run inspect
```

## Project Structure

- `src/index.ts`: Main entry point for the MCP server
- `src/add.ts`: Example module with an add function
- `src/add.test.ts`: Example test for the add function

## About

This project is a boilerplate inspired by the [fastmcp-boilerplate](https://github.com/punkpeye/fastmcp-boilerplate).
