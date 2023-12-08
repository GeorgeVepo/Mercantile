cd C:\VepoIT\CoreaRoulette\Instalacao\dist

$Porcentagem = Read-Host -Prompt "Por favor informe o valor desejado para aposta"
$Martingale = Read-Host -Prompt "Por favor informe a quantidade de martin gale desejada"
$Usuario = Read-Host -Prompt "Por favor informe a usuario que sera utilizado"
$Senha = Read-Host -Prompt "Por favor informe a senha que sera utilizada"
$TelegramUrl = Read-Host -Prompt "Por favor insira a url do telegram"

$Porcentagem = '{"key":"ValorAposta","value":' + $Porcentagem + '}'
$Martingale = '{"key":"PorcentagemAposta","value":' + $Martingale + '}'
$Usuario = '{"key":"Usuario","value":' + $Usuario + '}'
$Senha = '{"key":"Senha","value":' + $Senha + '}'
$TelegramUrl = '{"key":"TelegramUrl","value":' + $TelegramUrl + '}'

(Get-Content app.bundle.js) -replace '{"key":"ValorAposta","value":[\d.]*}',$Porcentagem | Out-File -encoding ASCII app.bundle.js
(Get-Content app.bundle.js) -replace '{"key":"Martingale","value":[\d.]*}', $Martingale | Out-File -encoding ASCII app.bundle.js
(Get-Content app.bundle.js) -replace '{"key":"Usuario","value":"[^"]*"}',$Usuario | Out-File -encoding ASCII app.bundle.js
(Get-Content app.bundle.js) -replace '{"key":"Senha","value":"[^"]*"}', $Senha | Out-File -encoding ASCII app.bundle.js
(Get-Content app.bundle.js) -replace '{"key":"TelegramUrl","value":"[^"]*"}', $TelegramUrl | Out-File -encoding ASCII app.bundle.js