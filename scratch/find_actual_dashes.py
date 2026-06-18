import os
import re

# Match em-dash (—), en-dash (–), or space-hyphen-space ( - )
pattern = re.compile(r'[\u2014\u2013]|(?<=\s)-(?=\s)')

src_dirs = ['app', 'components']
for src_dir in src_dirs:
    for root, dirs, files in os.walk(src_dir):
        if 'node_modules' in root or '.next' in root:
            continue
        for file in files:
            if file.endswith('.tsx'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    lines = f.readlines()
                
                for idx, line in enumerate(lines):
                    # ignore imports
                    if line.strip().startswith('import') or line.strip().startswith('//'):
                        continue
                    matches = pattern.findall(line)
                    if matches:
                        print(f"{path}:{idx+1}: {line.strip()}")
