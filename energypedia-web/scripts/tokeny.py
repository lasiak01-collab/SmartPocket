# Generuje src/app/tokeny.css z docs/energypedia/design-system/tokens.json.
# Użycie (z katalogu energypedia-web): python3 scripts/tokeny.py
import json, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
t = json.load(open(os.path.join(ROOT, '..', 'docs', 'energypedia', 'design-system', 'tokens.json')))
L = [f"  --{x['name']}: {x['value']['light']};" for x in t['color']['tokens']]
D = [f"  --{x['name']}: {x['value']['dark']};" for x in t['color']['tokens']]
E = [f"  --{x['name']}: {x['value']};" for g in ('spacing', 'radius', 'shadow', 'size') for x in t[g]['tokens']]
css = "/* Wygenerowane z docs/energypedia/design-system/tokens.json (scripts/tokeny.py). Nie edytuj ręcznie. */\n:root {\n" + "\n".join(L + E) + "\n  color-scheme: light;\n}\n"
css += "@media (prefers-color-scheme: dark) {\n  :root:not([data-theme=\"light\"]) {\n" + "\n".join('  ' + d for d in D) + "\n    color-scheme: dark;\n  }\n}\n:root[data-theme=\"dark\"] {\n" + "\n".join(D) + "\n  color-scheme: dark;\n}\n"
open(os.path.join(ROOT, 'src', 'app', 'tokeny.css'), 'w').write(css)
print('zapisano src/app/tokeny.css')
