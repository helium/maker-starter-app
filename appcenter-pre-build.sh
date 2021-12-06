#!/usr/bin/env bash

# add required app center environment variables into a .env file for use with react-native-config
echo MAPBOX_ACCESS_TOKEN=$MAPBOX_ACCESS_TOKEN >> .env
echo MAPBOX_STYLE_URL=$MAPBOX_STYLE_URL >> .env
echo GOOGLE_MAPS_API_KEY=$GOOGLE_MAPS_API_KEY >> .env
echo MAPBOX_DOWNLOAD_TOKEN=$MAPBOX_DOWNLOAD_TOKEN >> .env
