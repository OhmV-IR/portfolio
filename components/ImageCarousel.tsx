import { randomUUID } from "crypto";

type ImageCarouselProps = {
    images: string[];
}

export function ImageCarousel({images} : ImageCarouselProps){
    const carouselId = randomUUID();
    return (
    <div id={carouselId} className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
            {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            data-bs-target={`#${carouselId}`}
            data-bs-slide-to={idx}
            className={idx === 0 ? "active" : ""}
            aria-current={idx === 0 ? "true" : undefined}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
        </div>
        <div className="carousel-inner">
            {images.map((src, idx) => (
          <div
            key={src}
            className={`carousel-item ${idx === 0 ? "active" : ""}`}
          >
            <img src={src} className="d-block w-100" alt={`Slide ${idx + 1}`} />
          </div>
        ))}
        </div>
        <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={`#${carouselId}`}
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target={`#${carouselId}`}
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
    )
}