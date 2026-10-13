#!/usr/bin/env python3
"""
scripts/build-hero-assets.py
Hero video pipeline for Aditya Suresh Nakhale's portfolio.
Processes uploaded introduction video into crisp, non-glitching hero clips (webm + mp4)
with whitened background, cropped person, plus portrait-bust.webp and og.jpg.
"""

import os
import sys
import glob
import subprocess

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PUBLIC_DIR = os.path.join(ROOT_DIR, "public")
HERO_DIR = os.path.join(PUBLIC_DIR, "hero")

def run_cmd(cmd):
    print(f"[RUN] {cmd}")
    res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"[ERROR] {res.stderr[:400]}")
        return False
    return True

def process_video_file(input_path):
    print(f"=== Processing uploaded video: {input_path} ===")
    os.makedirs(HERO_DIR, exist_ok=True)

    mp4_out = os.path.join(HERO_DIR, "hero.mp4")
    webm_out = os.path.join(HERO_DIR, "hero.webm")
    bust_out = os.path.join(PUBLIC_DIR, "portrait-bust.webp")
    og_out = os.path.join(PUBLIC_DIR, "og.jpg")

    # 1. Video crop & whiten filter
    # Aspect ratio 768:960 = 4:5. From 1920x1080 source, crop width = 864, x = 528, y = 0
    vf_crop = "crop=864:1080:528:0,scale=768:960,colorlevels=rimax=0.98:gimax=0.98:bimax=0.98"

    # Extract 480x600 portrait still from clearest frame (at 2s when looking straight at camera)
    print("-> Extracting portrait bust still (480x600)...")
    run_cmd(f'ffmpeg -y -ss 00:00:02.00 -i "{input_path}" -vframes 1 -vf "crop=680:850:620:50,scale=480:600" -c:v libwebp -quality 92 "{bust_out}"')

    # Extract 1200x630 OG image
    print("-> Generating og.jpg (1200x630)...")
    run_cmd(f'ffmpeg -y -ss 00:00:02.00 -i "{input_path}" -vframes 1 -vf "scale=1200:630:force_original_aspect_ratio=increase,crop=1200:630" -q:v 2 "{og_out}"')

    # 2. Export clean MP4: H.264 yuv420p (CRF 22, -preset medium) with AAC audio at 128 kbps and +faststart
    # No artificial ghosting/xfade that causes character double-image glitching
    print("-> Exporting clean hero.mp4...")
    run_cmd(
        f'ffmpeg -y -i "{input_path}" '
        f'-vf "{vf_crop}" '
        f'-c:v libx264 -crf 22 -preset medium -pix_fmt yuv420p '
        f'-c:a aac -b:a 128k '
        f'-movflags +faststart "{mp4_out}"'
    )

    # 3. Export clean WebM: VP9 video (CRF 32) with Opus audio at 96 kbps
    print("-> Exporting clean hero.webm...")
    run_cmd(
        f'ffmpeg -y -i "{input_path}" '
        f'-vf "{vf_crop}" '
        f'-c:v libvpx-vp9 -crf 32 -b:v 0 '
        f'-c:a libopus -b:a 96k '
        f'"{webm_out}"'
    )

    print("=== Hero video pipeline successfully finished! ===")
    print(f"Generated: {mp4_out}")
    print(f"Generated: {webm_out}")
    print(f"Generated: {bust_out}")

def main():
    candidates = []
    if len(sys.argv) > 1 and os.path.exists(sys.argv[1]):
        candidates.append(sys.argv[1])
    
    candidates.extend(glob.glob(os.path.join(HERO_DIR, "*.mp4")))
    candidates.extend(glob.glob(os.path.join(HERO_DIR, "*.mov")))
    candidates.extend(glob.glob(os.path.join(ROOT_DIR, "*.mp4")))
    candidates.extend(glob.glob(os.path.join(ROOT_DIR, "*.mov")))

    candidates = [c for c in candidates if not c.endswith("hero.mp4")]

    if not candidates:
        print("No source video found to process.")
        sys.exit(1)

    target_video = candidates[0]
    process_video_file(target_video)

if __name__ == "__main__":
    main()
