import sys
from ftplib import FTP_TLS

def upload(host, user, passwd, local_path, remote_path):
    ftps = FTP_TLS(host, timeout=30)
    ftps.set_debuglevel(0)
    ftps.login(user, passwd)
    ftps.prot_p()
    # ensure remote directory exists by trying to cwd; create if necessary
    import os
    rdir = os.path.dirname(remote_path) or '.'
    try:
        ftps.cwd(rdir)
    except Exception:
        # try to create path parts
        parts = [p for p in rdir.split('/') if p]
        cur = ''
        for p in parts:
            cur = cur + '/' + p if cur else p
            try:
                ftps.cwd(cur)
            except Exception:
                try:
                    ftps.mkd(cur)
                    ftps.cwd(cur)
                except Exception as e:
                    print('ERR MKD', cur, e)
                    raise
    # upload
    with open(local_path, 'rb') as f:
        basename = os.path.basename(remote_path)
        try:
            ftps.storbinary('STOR ' + basename, f)
            print('OK UP', remote_path)
        except Exception as e:
            print('ERR UP', remote_path, e)
    # list remote dir
    try:
        print('\nRemote listing:')
        for line in ftps.mlsd():
            print(line)
    except Exception:
        try:
            for line in ftps.nlst():
                print(line)
        except Exception as e:
            print('ERR LIST', e)
    ftps.quit()

if __name__ == '__main__':
    if len(sys.argv) < 6:
        print('Usage: upload_zip_ftps.py <host> <user> <pass> <local_path> <remote_path>')
        sys.exit(1)
    upload(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5])
