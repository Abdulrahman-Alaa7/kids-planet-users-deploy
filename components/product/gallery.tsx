"use client";

import { GridTileImage } from "./tile";
import { useProduct } from "./product-context";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";

interface ImageItem {
  src: string;
  altText: string;
}

interface GalleryProps {
  mainImage: ImageItem;
  images?: ImageItem[];
}

export function Gallery({ mainImage, images = [] }: GalleryProps) {
  const { state, updateImage } = useProduct();
  const lang = useLocale();

  const validMainImage =
    mainImage?.src && mainImage?.altText ? mainImage : null;
  const validImages = Array.isArray(images)
    ? images.filter((img) => img?.src && img?.altText)
    : [];
  const allImages = [validMainImage, ...validImages].filter(
    (img): img is ImageItem => img !== null
  );

  const imageIndex =
    state.image && allImages.length > 0 ? parseInt(state.image, 10) : 0;
  const nextImageIndex =
    allImages.length > 1 ? (imageIndex + 1) % allImages.length : 0;
  const previousImageIndex =
    allImages.length > 1
      ? imageIndex === 0
        ? allImages.length - 1
        : imageIndex - 1
      : 0;

  const buttonClassName =
    "h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center";

  return (
    <form>
      <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden mx-auto">
        {allImages.length > 0 && allImages[imageIndex]?.src ? (
          <Image
            className="h-full w-full object-contain"
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            alt={allImages[imageIndex].altText}
            src={allImages[imageIndex].src}
            priority
          />
        ) : (
          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">No image available</p>
          </div>
        )}

        {allImages.length > 1 && (
          <div className="absolute bottom-[15%] flex w-full justify-center">
            <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur dark:border-black dark:bg-neutral-900/80">
              <button
                type="button"
                aria-label="Previous product image"
                className={buttonClassName}
                onClick={() => updateImage(previousImageIndex.toString())}
              >
                <ArrowLeft className={`h-5 ${lang === "ar" && "rotate-180"}`} />
              </button>
              <div className="mx-1 h-6 w-px bg-neutral-500"></div>
              <button
                type="button"
                aria-label="Next product image"
                className={buttonClassName}
                onClick={() => updateImage(nextImageIndex.toString())}
              >
                <ArrowRight
                  className={`h-5 ${lang === "ar" && "rotate-180"}`}
                />
              </button>
            </div>
          </div>
        )}
      </div>

      {allImages.length > 1 && (
        <ul className="mt-12 mb-2 flex items-center flex-wrap justify-center gap-2 overflow-hidden py-1 lg:mb-0 mx-auto">
          {allImages.map((image, index) => {
            const isActive = index === imageIndex;
            return (
              <li key={image.src} className="h-20 w-20">
                <button
                  type="button"
                  aria-label={`Select product image ${index + 1}`}
                  className="h-full w-full"
                  onClick={() => updateImage(index.toString())}
                >
                  <GridTileImage
                    alt={image.altText}
                    src={image.src}
                    width={80}
                    height={80}
                    active={isActive}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </form>
  );
}
