# Warcraft Guild

Gather a Classic WoW guild's data from a variety of sources and expose the data in a public URL that can be consumed.

_WARNING: This app has no tests and was written haphazardly for fun. Use at your own risk._

## Usage

Obtain a warcraftlogs API V2 client id and secret and specify environment variables.

`WARCRAFT_LOGS_CLIENT_ID={YOUR_CLIENT_ID} WARCRAFT_LOGS_CLIENT_SECRET={YOUR_CLIENT_SECRET} yarn start`

This is not an exhaustive list of the scripts available, just the important ones. For a full list look in `package.json`.

| Script            | Description                                        |
| ----------------- | -------------------------------------------------- |
| yarn run generate | Regenerate codegen'd artifacts from their sources. |
| yarn run build    | Build the app.                                     |
| yarn run start    | Launch the development server.                     |

## Deployment

TBD
