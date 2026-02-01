import sys
from ftplib import FTP_TLS
import os

# Usage: python quick_upload.py <local_file> <remote_path>
# Credentials are hardcoded for simplicity

HOST = 'ftp.korkmazfar.com'
USER = 'korkmazf'
PASS = 'x@W~WL(,8TvL'  # from earlier context

def upload(local_path, remote_path):
    print(f'Connecting to {HOST}...')
    ftps = FTP_TLS(HOST, timeout=60)
    ftps.login(USER, PASS)
    ftps.prot_p()
    print(f'Uploading {local_path} -> {remote_path}')
    
    # Navigate to remote directory
    rdir = os.path.dirname(remote_path) or '.'
    try:
        ftps.cwd(rdir)
    except:
        pass
    
    # Upload file
    fname = os.path.basename(remote_path)
    with open(local_path, 'rb') as f:
        ftps.storbinary(f'STOR {fname}', f)
    
    print('Upload complete!')
    ftps.quit()

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print('Usage: python quick_upload.py <local_file> <remote_path>')
        sys.exit(1)
    upload(sys.argv[1], sys.argv[2])
