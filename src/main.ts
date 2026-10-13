import { NodeHttpServer, NodeRuntime } from "@effect/platform-node";
import { Config, Layer } from "effect";
import { HttpRouter, HttpServerResponse } from "effect/http";
import { createServer } from "http";

const HealthRoute = HttpRouter.add("GET", "/health", HttpServerResponse.text("ok"));

const HttpLive = HttpRouter.serve(HealthRoute).pipe(
  Layer.provide(
    NodeHttpServer.layerConfig(createServer, {
      port: Config.Port("PORT"),
    }),
  ),
);

const main = Layer.launch(HttpLive);

NodeRuntime.runMain(main);
