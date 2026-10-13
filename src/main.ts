import { NodeHttpServer, NodeRuntime } from "@effect/platform-node";
import { Layer } from "effect";
import { HttpRouter, HttpServerResponse } from "effect/http";
import { createServer } from "http";
import { HttpConfig } from "./platform/config/app-config.js";

const HealthRoute = HttpRouter.add("GET", "/health", HttpServerResponse.text("ok"));

const HttpLive = HttpRouter.serve(HealthRoute).pipe(
  Layer.provide(NodeHttpServer.layerConfig(createServer, HttpConfig)),
);

const main = Layer.launch(HttpLive);

NodeRuntime.runMain(main);
