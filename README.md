# Warcraft Attendance

Gather guild member attendance data from warcraftlogs and expose it in a public URL that can be consumed.

_WARNING: This app has no tests and was written haphazardly in an afternoon. Use at your own risk._

## Usage

Obtain a warcraftlogs API V2 client id and secret.

`CLIENT_ID={YOUR_CLIENT_ID} CLIENT_SECRET={YOUR_CLIENT_SECRET} yarn start`

Make requests using the serverslug and guildname in question. For example:

`https://warcraft-attendance.herokuapp.com/guild/old-blanchy/vile`
