#!/usr/bin/env bash
# First argument is the id of gif
# Second argument is the telephone number
# Third and next are frames to be generated
a=${@}
for var in "$@"; do
    (( count++ )) # count - number of frames
done

# bash scripts/create_gif.sh 123 34 1.jpg 2.jpg 3.jpg  ->
# Should create gif from frames: 1.jpg 2.jpg 3.jpg 1.pg

camera_upload="camera_output/"
echo "Creating gifs from photos in folder: ${camera_upload}"
frames=""
incrementFrames=`seq -s ' ' 3 $count`
for frame in $incrementFrames; do
  frames="$frames $camera_upload${!frame}"
done

let "count = count - 1"
decrementFrames=`seq -s ' ' $count -1 4`
for frame in $decrementFrames; do
  frames="$frames $camera_upload${!frame}"
done

gif_output_folder='./gifs/'
gif_file_name=$2_$1.gif
gif_path=$gif_output_folder$gif_file_name


#
# Cropping frames
# $1  $2 - frame number that we acre creating
#

rm -Rf tmp
mkdir tmp
mkdir tmp/phase1
mkdir tmp/phase2
mkdir tmp/phase3

phase1_folder=tmp/phase1
phase2_folder=tmp/phase2
phase3_folder=tmp/phase3

frames_with_branding=""
for frame in $frames; do
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
rm -Rf tmp
if [ -e "$gif_path" ]; then
    echo "[create_gif.sh] Gif generated successfully $gif_path"
    exit 0
else 
    echo "[create_gif.sh] Error in generating gif. $gif_path"
    exit 1
fi 