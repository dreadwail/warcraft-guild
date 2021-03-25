# Warcraft Guild

Gather guild member data from a variety of sources and expose the data in a public URL that can be consumed from google sheets.

_WARNING: This app has no tests and was written haphazardly for fun. Use at your own risk._

## Usage

Obtain a warcraftlogs API V2 client id and secret.

`WARCRAFT_LOGS_CLIENT_ID={YOUR_CLIENT_ID} WARCRAFT_LOGS_CLIENT_SECRET={YOUR_CLIENT_SECRET} yarn start`

Make requests using the serverslug and guildname in question. For example:

`https://warcraft-guild.herokuapp.com/guild/old-blanchy/vile`
