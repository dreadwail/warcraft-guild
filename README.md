# Warcraft Guild

Gather guild member data from a variety of sources and expose the data in a public URL that can be consumed.

_WARNING: This app has no tests and was written haphazardly for fun. Use at your own risk._

## Usage

Obtain a warcraftlogs API V2 client id and secret and specify environment variables.

`WARCRAFT_LOGS_CLIENT_ID={YOUR_CLIENT_ID} WARCRAFT_LOGS_CLIENT_SECRET={YOUR_CLIENT_SECRET} yarn start`

If you need to regenerate the Typescript types for the warcraftlogs graphql schema you'll need to set the environment variable for an access token and call the script:

`WARCRAFT_LOGS_ACCESS_TOKEN={YOUR_ACCESS_TOKEN} yarn run graphql:warcraftlogs`
