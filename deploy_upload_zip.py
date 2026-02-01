import sys
import os
import zipfile
import tempfile
from ftplib import FTP_TLS

if len(sys.argv) < 6:
    print('Usage: python deploy_upload_zip.py <zipfile> <host> <user> <pass> <remote_base>')
    sys.exit(1)

zip_path = sys.argv[1]
host = sys.argv[2]
user = sys.argv[3]
passwd = sys.argv[4]
remote_base = sys.argv[5].rstrip('/')

print('Unpacking', zip_path)
if not os.path.isfile(zip_path):
    print('Zip not found:', zip_path)
    sys.exit(2)

tmp = tempfile.mkdtemp(prefix='deploy_unzip_')
with zipfile.ZipFile(zip_path, 'r') as z:
    z.extractall(tmp)
print('Extracted to', tmp)

ftps = FTP_TLS()
ftps.connect(host, 21, timeout=30)
ftps.login(user, passwd)
ftps.prot_p()
ftps.set_pasv(True)

# Ensure remote_base exists; create path components
parts = [p for p in remote_base.split('/') if p]
cur = ''
for p in parts:
    cur = cur + '/' + p if cur else p
    try:
        ftps.mkd(cur)
        print('MKD', cur)
    except Exception:
        pass

# Walk extracted files and upload
for root, dirs, files in os.walk(tmp):
    rel = os.path.relpath(root, tmp)
    if rel == '.':
        remote_dir = remote_base
    else:
        remote_dir = remote_base + '/' + rel.replace('\\','/')
    # create remote dir
    try:
        ftps.mkd(remote_dir)
    except Exception:
        pass
    for fname in files:
        local_path = os.path.join(root, fname)
        remote_path = remote_dir + '/' + fname
        with open(local_path, 'rb') as f:
            try:
                ftps.storbinary('STOR ' + remote_path, f)
                print('UP', remote_path)
            except Exception as e:
                print('ERR', remote_path, e)

print('Done. Closing FTP')
try:
    ftps.quit()
except Exception:
    try:
        ftps.close()
    except Exception:
        pass
print('Upload complete')
