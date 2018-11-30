#!/usr/bin/env bash
# This scripts adds branding to a photo
# First argument is the photos folder
# Second argument is the photos file name
if test "$#" -lt 2; then
    echo "[BASH] ERROR Illegal number of parameters: <photo_source_folder> <photo_file_name>"
    exit
fi

echo "[GENERATE PHOTO BASH] Adding branding for file $2 in folder $1"

composite -geometry +0+0 ramka.png $1/$2 $1/$2
