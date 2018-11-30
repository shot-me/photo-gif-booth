#!/usr/bin/env bash
# This scripts generates a gif from all the files in folder: camera_output
# First argument is the id of gif
# Second argument is the telephone number
# Third argument is the path where gif should be saved
# Fourth argument is the source path of photos
if test "$#" -lt 4; then
    echo "[BASH] ERROR Illegal number of parameters: <gif_id> <telephone_number> <dest_path> <source_photo_path>"
    exit
fi

shopt -s nullglob

echo "[GENERATE_GIF BASH] Generating gif for files in folder $4"

frames=($(ls -t $4/*  | head -8))

gif_output_folder=$3
gif_file_name=$2_$1.gif
gif_path=$gif_output_folder$gif_file_name

echo "[GENERATE_GIF BASH] Generating gif for number of frames: ${#frames[@]}"

convert ramka.png -resize 960x640  ramka_small.png

rm -Rf tmp
mkdir tmp
mkdir tmp/phase1
mkdir tmp/phase2
mkdir tmp/phase3

phase1_folder=tmp/phase1
phase2_folder=tmp/phase2
phase3_folder=tmp/phase3

frames_with_branding=""
for frame in ${frames[*]}; do
    frame_with_branding_nr=`echo $frame | sed 's:.*/::'`
    # echo $frame_with_branding_nr
    # echo $frame
    # echo $phase1_folder/$frame_with_branding_nr
    # convert $frame -crop 1728x1728+472+0 $phase1_folder/$frame_with_branding_nr
    cp $frame $phase1_folder/$frame_with_branding_nr
    convert $phase1_folder/$frame_with_branding_nr  -resize 960x640  $phase2_folder/$frame_with_branding_nr
    composite -geometry +0+0 ramka_small.png $phase2_folder/$frame_with_branding_nr $phase3_folder/$frame_with_branding_nr
    frames_with_branding="$frames_with_branding $phase3_folder/$frame_with_branding_nr"
    composite -geometry +0+0 ramka.png $frame $frame
done
convert -delay 15 $frames_with_branding $gif_path
echo $frames_with_branding./
rm -Rf tmp
rm ramka_small.png
if [ -e "$gif_path" ]; then
    echo "[GENERATE_GIF BASH] Gif generated successfully $gif_path"
    exit 0
else
    echo "[GENERATE_GIF BASH] Error in generating gif. $gif_path"
    exit 1
fi