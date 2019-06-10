var cmd = require('node-cmd'); 

module.exports = {
    format: function () {
        var args = [].slice.call(arguments);
        return this.replace(/(\{\d+\})/g, function (a) {
            return args[+(a.substr(1, a.length - 2)) || 0];
        });
    },
    sleep: async function (milliseconds) {
        await new Promise(resolve => setTimeout(resolve, milliseconds));
    },
    getDate: function () {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var hh = today.getHours();
        var MM = today.getMinutes();
        var ss = today.getSeconds();
        var mmm = today.getMilliseconds();

        today = dd + '/' + mm + '/' + yyyy + ' ' + hh + ':' + MM + ':' + ss + '.' + mmm
        return today;
    },
    tryConnection: async function(page, url, selector){
        var tentativas = 5;
        while(tentativas > 0) {
            await new Promise(resolve => setTimeout(resolve, 10000)); 
            cmd.run('"C:\\Program Files (x86)\\HMA! Pro VPN\\bin\\HMA! Pro VPN.exe" -connect');
            try {
                await page.goto(url, {
                    timeout: 10000
                });
    
                await page.waitForSelector(selector, {
                    timeout: 10000
                })
            } catch (e) {
                tentativas = tentativas - 1;
                cmd.run('"C:\\Program Files (x86)\\HMA! Pro VPN\\bin\\HMA! Pro VPN.exe" -changeip');
                await new Promise(resolve => setTimeout(resolve, 30000)); 
                await page.goto(url, {
                    timeout: 10000
                });
    
                await page.waitForSelector(selector, {
                    timeout: 10000
                })
                continue;
            }
            break;
        }
       
    }

}
