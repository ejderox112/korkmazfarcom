# Deploy script wrapper
# Usage: run in project root. Prompts for FTP host/user/pass and uploads the zip using existing Python script.
param()

$zip = "korkmazfar-full.zip"
# If zip not found but out/ exists, create zip from out/* so files are at archive root (no top-level 'out' folder)
if (-not (Test-Path $zip)) {
  if (Test-Path "./out") {
    Write-Host "Zip bulunamadı. 'out/' bulundu, içeriği kök seviyeye sıkıştırıyorum..." -ForegroundColor Cyan
    Remove-Item -Force -ErrorAction SilentlyContinue $zip
    Compress-Archive -Path "./out/*" -DestinationPath $zip -Force
    if (-not (Test-Path $zip)) {
      Write-Host "Zip oluşturulamadı." -ForegroundColor Red
      exit 1
    }
    Write-Host "Zip oluşturuldu: $zip" -ForegroundColor Green
  } else {
    Write-Host "Zip bulunamadı ve 'out/' klasörü yok. Önce 'npm run build' ve 'next export' çalıştırın." -ForegroundColor Yellow
    exit 1
  }
}
$host = Read-Host "FTP Host (ör. ftp.example.com)"
$user = Read-Host "FTP User"
$pass = Read-Host "FTP Password" -AsSecureString
$plain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($pass))
Write-Host "Uploading $zip to $host..."
# call the python deploy_upload_zip.py script: python deploy_upload_zip.py <zip> <host> <user> <pass> public_html
python deploy_upload_zip.py $zip $host $user $plain public_html
if ($LASTEXITCODE -ne 0) {
  Write-Host "Upload failed." -ForegroundColor Red
  exit 2
}
Write-Host "Upload finished. Now trigger remote_unzip.php via HTTP to extract and set perms..."
$unzipUrl = Read-Host "remote_unzip.php URL (ör. https://example.com/remote_unzip.php)"
try {
  Invoke-WebRequest -Uri $unzipUrl -UseBasicParsing -TimeoutSec 120 | Write-Host
  Write-Host "remote_unzip.php called. Check unzip_log.txt on server." -ForegroundColor Green
} catch {
  Write-Host "remote_unzip.php çağrısı başarısız: $_" -ForegroundColor Red
}
