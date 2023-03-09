#!/usr/bin/env bash

# add required app center environment variables into a .env file for use with react-native-config
echo ONBOARDING_BASE_URL=$ONBOARDING_BASE_URL >> .env
echo MAPBOX_ACCESS_TOKEN=$MAPBOX_ACCESS_TOKEN >> .env
echo MAPBOX_DOWNLOAD_TOKEN=$MAPBOX_DOWNLOAD_TOKEN >> .env
echo MAPBOX_STYLE_URL=$MAPBOX_STYLE_URL >> .env
echo MAKER_ADDRESS=$MAKER_ADDRESS >> .env
echo MAKER_NAME=$MAKER_NAME >> .env
echo MAKER_ID=$MAKER_ID >> .env
echo SOLANA_RPC_ENDPOINT=$SOLANA_RPC_ENDPOINT >> .env
echo GOOGLE_MAPS_API_KEY=$GOOGLE_MAPS_API_KEY >> .env

