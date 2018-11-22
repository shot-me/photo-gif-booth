#!/usr/bin/env bash
# This scripts generates a gif from all the files in folder: camera_output
# First argument is the id of gif
# Second argument is the telephone number

a=${@}
shopt -s nullglob
frames=(camera_output/*)

gif_output_folder='./gifs/'
gif_file_name=$2_$1.gif
gif_path=$gif_output_folder$gif_file_name

echo "[BASH] Generating gif for number of frames ${#frames[@]}"
echo "${frames[*]}"
if test "$#" -lt 2; then
    echo "[BASH] ERROR Illegal number of parameters"
    exit
fi
# bash scripts/create_gif.sh 123 34 1.jpg 2.jpg 3.jpg  ->
# Should create gif from frames: 1.jpg 2.jpg 3.jpg 1.pg

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
    convert $frame -crop 1728x1728+472+0 $phase1_folder/$frame_with_branding_nr
    convert $phase1_folder/$frame_with_branding_nr  -resize 500x500  $phase2_folder/$frame_with_branding_nr
    composite -geometry +0+0 ramka.png $phase2_folder/$frame_with_branding_nr $phase3_folder/$frame_with_branding_nr
    frames_with_branding="$frames_with_branding $phase3_folder/$frame_with_branding_nr"
done
convert -delay 15 $frames_with_branding $gif_path
echo $frames_with_branding
rm -Rf tmp
if [ -e "$gif_path" ]; then
    echo "[create_gif.sh] Gif generated successfully $gif_path"
    exit 0
else
    echo "[create_gif.sh] Error in generating gif. $gif_path"
    exit 1
fi