const hostname = '127.0.0.1';
const port = 8080;
import * as http from "http";
import { Principal } from "./Principal/principal";
import { Utils } from "./utils/utils";
import FS from "fs";
import { UnhandledException } from "./utils/exceptions/UnhandledException";

let utils = new Utils();

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  Iniciar();
});

async function Iniciar() {

  process.on('unhandledRejection', error => {
    //utils.LogError(new UnhandledException(error));
  });
  
  if (!FS.existsSync(utils.config.get("PathProd"))) {
    FS.mkdir(utils.config.get("PathProd"), function (error: any) { });
  }

  try {
    await new Principal().IniciarProcesso();

  } catch (e: any) {
    if (e.name != "RestartarProcessoException") {      
      //await utils.LogError(e);
    }
  }
  await utils.Sleep(60000);
  await Iniciar();
}

