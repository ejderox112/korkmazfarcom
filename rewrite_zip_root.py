import zipfile
from pathlib import Path

src = Path('korkmazfar-static.zip')
dst = Path('korkmazfar-static-rooted.zip')

with zipfile.ZipFile(src, 'r') as zin:
    with zipfile.ZipFile(dst, 'w', compression=zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            name = item.filename
            # skip directories
            if name.endswith('/'):
                continue
            # remove leading 'out/' or './out/' if present
            if name.startswith('out/'):
                new_name = name[len('out/'):]
            elif name.startswith('./out/'):
                new_name = name[len('./out/'):]
            else:
                new_name = name
            data = zin.read(item.filename)
            zout.writestr(new_name, data)
print('Wrote', dst)
