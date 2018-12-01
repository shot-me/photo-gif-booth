#!/usr/bin/env bash
# This scripts adds branding to a photo
# First argument is the photos folder
# Second argument is the photos file name
if test "$#" -lt 2; then
    echo "[BASH] ERROR Illegal number of parameters: <photo_source_folder> <photo_file_name>"
    exit
fi

echo "[GENERATE PHOTO BASH] Adding branding for file $2 in folder $1"

convert ramka.png -resize 960x480  ramka_small.png
echo "[GENERATE PHOTO BASH] Frame succesfuly resized"
convert $1/$2  -resize 960x480  $1/resized.jpg
composite -geometry +0+0 ramka_small.png $1/resized.jpg $1/print.jpg
echo "[GENERATE PHOTO BASH] Added branding to frame that will be printed - print.JPG"
