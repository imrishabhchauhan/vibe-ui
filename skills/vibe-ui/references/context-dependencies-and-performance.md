# Context, Dependencies, and Experience Performance

## Map the UI blast radius

Before changing a route or component, trace enough of its dependency graph to explain the rendered behaviour:

1. route, layout, navigation shell, and error/loading boundaries;
2. imported page sections and conditionally rendered panels;
3. shared primitives, tokens, global styles, fonts, and icons;
4. hooks, context providers, stores, URL state, and form state;
5. server components, loaders, actions, API routes, queries, and caches;
6. consumers of any shared file that may be edited;
7. tests, stories, fixtures, analytics, and permissions affecting the state.

Use repository search to follow imports and consumers. Do not stop at the file named in the request when a parent, primitive, data source, or sibling controls the experience. Keep the map proportional: inspect the paths that can cause the finding or be affected by its fix, not the entire repository by habit.

Classify the likely root as `route`, `layout`, `primitive`, `token`, `content`, `state`, `data`, `permission`, or `runtime`. Report the root once and list affected consumers.

## Audit experience performance

Performance findings need evidence from runtime behaviour, source, or both. Check:

- client boundaries that pull static or server-capable content into the browser bundle;
- inactive tabs, accordions, dialogs, or routes that eagerly mount expensive children;
- hidden charts, editors, media, observers, or subscriptions still doing work;
- request waterfalls, duplicate fetching, stale-response races, and refetch blanking;
- effects that fetch repeatedly or recreate listeners without need;
- oversized or unoptimised images, fonts, icons, and animation assets;
- costly render loops, unstable keys, and broad state subscriptions;
- API or query fan-out, N+1 access, missing pagination, and excessive payloads;
- loading states that shift layout or block unrelated controls;
- navigation, filtering, and input latency visible to the user.

Do not prescribe Suspense, memoisation, dynamic imports, or caching automatically. Verify installed versions and existing architecture, identify the actual cost, then choose the smallest compatible intervention. Route deep profiling and infrastructure work to Vibe Performance when installed, but keep page-level perceived performance within Vibe UI's audit.

## Verify the dependency change

After editing a shared file, inspect its consumers and run proportional tests for them. After changing data or loading behaviour, verify success, slow, empty, error, retry, interruption, and stale-response states. Record what remained outside the inspected blast radius.
