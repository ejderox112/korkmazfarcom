import ftplib, sys

if len(sys.argv) < 5:
    print('Usage: python ftps_chmod_recursive.py <host> <user> <pass> <remote_base>')
    sys.exit(1)

host, user, passwd, base = sys.argv[1:5]
ftps = ftplib.FTP_TLS()
ftps.connect(host, 21, timeout=30)
ftps.login(user, passwd)
ftps.prot_p()
ftps.set_pasv(True)

def chmod_file(path, mode):
    try:
        cmd = f'SITE CHMOD {mode} {path}'
        resp = ftps.sendcmd(cmd)
        print('CHMOD', mode, path, resp)
    except Exception as e:
        print('ERR chmod', path, e)

def recurse(dirpath):
    try:
        entries = ftps.nlst(dirpath)
    except Exception as e:
        print('ERR nlst', dirpath, e)
        return
    for name in entries:
        if name in ('.', '..'):
            continue
        # build full path
        if dirpath.endswith('/'):
            full = dirpath + name
        else:
            full = dirpath + '/' + name
        # try cwd to detect dir
        is_dir = False
        try:
            cur = ftps.pwd()
            ftps.cwd(full)
            is_dir = True
            ftps.cwd(cur)
        except Exception:
            is_dir = False
        if is_dir:
            chmod_file(full, '755')
            recurse(full)
        else:
            chmod_file(full, '644')

# ensure base exists and use cwd('.') listing
try:
    ftps.cwd(base)
    start = '.'
except Exception as e:
    print('Base not found or cannot cwd:', base, e)
    start = base

# chmod base dir (absolute path for SITE CHMOD)
try:
    abs_base = base if base.startswith('/') else '/' + base
    chmod_file(abs_base, '755')
except Exception:
    pass
recurse(start)

try:
    ftps.quit()
except Exception:
    ftps.close()
print('Done')
