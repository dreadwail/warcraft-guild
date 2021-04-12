#!/usr/bin/env bash
if [[ -z "$WARCRAFT_LOGS_CLIENT_ID" ]]; then
  echo "WARCRAFT_LOGS_CLIENT_ID not set" 1>&2
  exit 1
fi

if [[ -z "$WARCRAFT_LOGS_CLIENT_SECRET" ]]; then
  echo "WARCRAFT_LOGS_CLIENT_SECRET not set" 1>&2
  exit 1
fi

if ! command -v jq &> /dev/null
then
    echo "jq not installed"
    exit 1
fi

WARCRAFT_LOGS_ACCESS_TOKEN=$(curl -u $WARCRAFT_LOGS_CLIENT_ID:$WARCRAFT_LOGS_CLIENT_SECRET -d grant_type=client_credentials https://www.warcraftlogs.com/oauth/token | jq -r '.access_token')

yarn run graphql-codegen --config codegen.yml