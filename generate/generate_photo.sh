#!/usr/bin/env bash
# This scripts adds branding to a photo
# First argument is the photos folder
# Second argument is the photos file name
if test "$#" -lt 2; then
    echo "[BASH] ERROR Illegal number of parameters: <photo_source_folder> <photo_file_name>"
    exit
fi

echo "[GENERATE PHOTO BASH] Adding branding for file $2 in folder $1"

# convert ramka.png -resize 720x480  ramka_small.png
# echo "[GENERATE PHOTO BASH] Frame succesfuly resized"
# convert $1/$2  -resize 720x480  $1/resized.jpg
cp $1/$2 resized.jpg
composite -geometry +0+0 ramka.png resized.jpg print.jpg
echo "[GENERATE PHOTO BASH] Added branding to frame that will be printed - print.JPG"
convert -density 300 -units pixelsperinch print.jpg converted.jpg
cp converted.jpg $1/converted.jpg
cp print.jpg $1/print.jpg