"""Minimal generated Lottie: a check mark that draws on inside a circle, then rests. Run: python example_icon.py
Shows the pattern used for all generated assets: build shapes with lot.py, animate with Tracks, add named markers,
dump JSON, then review with scripts/lottie-render.mjs and validate with scripts/lottie-inspect.mjs."""
from lot import Track, comp, dump, shape_layer, shape_group, ellipse, path, stroke, fill, trim

OUT = ((0.16, 1.0), (0.3, 1.0))
L = 60
ring = shape_group("ring", [ellipse(44, 44, 32, 32)], [fill("#E4F0FB"), stroke("#1A81D2", 2.25, cap="round")])
draw = Track().key(0, 0, OUT).key(4, 0, OUT).key(34, 100, OUT)
check = shape_group("check", [path([(22, 32.5), (29, 39.5), (42, 25)]), trim(0, draw)], [stroke("#1E1D1D", 2.5, cap="round", join="round")])
c = comp("check", 64, 64, L, [shape_layer("icon", [ring, check], L, 0)], markers=[("play", 0, L)])
dump(c, "check.json")
print("wrote check.json")
