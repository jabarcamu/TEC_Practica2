const parse = require("pg-connection-string").parse;
const { Client } = require("pg");
const prompt = require("prompt");

(async () => {

  prompt.start()
  const URI = await prompt.get("connectionString");
  var connectionString;
  // Expand $env:appdata environment variable in Windows connection string
  console.log(URI, "la uri")
//   if (URI.connectionString.includes("env:appdata")) {
//     connectionString = await URI.connectionString.replace(
//       "$env:appdata",
//       process.env.APPDATA
//     );
//   }
//   // Expand $HOME environment variable in UNIX connection string
//   else if (URI.connectionString.includes("HOME")) {
//     connectionString = await URI.connectionString.replace(
//       "$HOME",
//       process.env.HOME
//     );
//   }

  connectionString = 'postgresql://jabarcamu:9uJUsT09p0VHWlUVpyvz1g@free-tier10.gcp-southamerica-east1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Djp-cstec-unsa-41'

  var config = parse(connectionString);
  config.port = 26257;
  config.database = 'defaultdb';
  const client = new Client(config);

  try {
    await client.connect();
    const result = await client.query('SELECT message FROM messages')
    console.log(result.rows[0].message)
    await client.end()
  } catch (err) {
    console.log(`error connecting: ${err}`)
  }

  // Exit program
  process.exit();
})().catch((err) => console.log(err.stack));