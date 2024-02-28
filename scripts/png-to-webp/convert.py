""" Source: https://github.com/hatamiarash7/Python-WebP """

"""Convert images to WebP format"""

from pathlib import Path
from PIL import Image
import os


def convert_to_webp(source, image):
    """Convert image to webp.

    Args:
        source (pathlib.Path): Path to source image
        image (PIL.Image): Base image with watermark
    """

    destination = source.with_suffix(".webp")
    image.save(destination, format="webp")


def get_image_paths(directory):
    """Get image file paths in the given directory

    Args:
        directory (str): Path to the directory containing images
        or folders containing images

    Returns:
        list: List of pathlib.Path objects representing image files
    """
    directory = Path(directory)
    # check if the given directory exists
    if not directory.exists():
        raise FileNotFoundError(f"Directory '{directory}' does not exist")
    image_paths = list(directory.glob("**/*.[jp][pn]g"))
    print("Found", len(image_paths), "images")
    return image_paths


def process_image(image_path):
    """Process the given image by adding watermark and converting to webp format
    and delete the original image
    Args:
        image_path (pathlib.Path): Base image file path
    """
    print("Convert ", image_path)
    with Image.open(image_path) as image:
        convert_to_webp(image_path, image)
    os.remove(image_path)


def main():
    """Search for PNG/JPG images then
    - Add watermark
    - Convert to WebP format
    """
    # ../../public/data/images
    image_paths = get_image_paths(os.path.join(os.getcwd(), "public/data/images"))
    for image_path in image_paths:
        process_image(image_path)


if __name__ == "__main__":
    main()
