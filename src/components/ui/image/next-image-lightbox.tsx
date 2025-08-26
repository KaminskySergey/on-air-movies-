import Image from "next/image";
import {
  SlideImage,
  isImageSlide,
  useLightboxProps,
  useLightboxState,
} from "yet-another-react-lightbox";

function isNextJsImageBox(slide: SlideImage) {
  return (
    isImageSlide(slide) &&
    typeof slide.width === "number" &&
    typeof slide.height === "number"
  );
}

export default function NextJsImageBox({ slide }: { slide: SlideImage }) {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps();

  const { currentIndex } = useLightboxState();

  const cover = imageFit === "cover";

  if (!isNextJsImageBox(slide)) return null;

  const { width, height } = slide;
  
  const widthVW = typeof window !== "undefined"
    ? Math.ceil((Number(width) / window.innerWidth) * 100)
    : 100;

    return (
  <div style={{ position: "relative", width, height }}>
    <Image
      fill
      alt=""
      src={slide.src}
      loading="eager"
      draggable={false}
      style={{
        objectFit: cover ? "cover" : "contain",
        cursor: click ? "pointer" : undefined,
      }}
      sizes={`${widthVW}vw`}
      onClick={() => click?.({ index: currentIndex })}
    />
  </div>
  );
}