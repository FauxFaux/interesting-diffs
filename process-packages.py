import yaml
import json
y=yaml.safe_load(open('packages.yml'))
json.dump({
    p: [d.get('issues', []), 'comments' in d]
    for p,d in y.items()
}, open('notes.json', 'w'))

