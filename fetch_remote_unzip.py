import urllib.request
try:
    r=urllib.request.urlopen('http://korkmazfar.com/remote_unzip.php', timeout=120)
    print(r.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print('HTTPERR', e.code)
    try:
        print(e.read().decode('utf-8'))
    except:
        pass
except Exception as e:
    print('ERR', e)
