import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import './Gallery.css';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample gallery images - palitan mo to ng actual images mo
  const galleryImages = [
    {
      id: 1,
      src: "/images/church1.jpg",
      alt: "San Jose Manggagawa Parish Church Building",
      category: "church"
    },
    {
      id: 2,
      src: "/images/church2.jpg",
      alt: "Church Interior and Altar",
      category: "interior"
    },
    {
      id: 3,
      src: "/images/church3.jpg",
      alt: "Church Community Gathering",
      category: "events"
    },
    {
      id: 4,
      src: "/images/simbahan.jpg",
      alt: "Sunday Mass Celebration",
      category: "mass"
    },
    {
      id: 5,
      src: "/images/church1.jpg",
      alt: "Church Activities",
      category: "events"
    },
    {
      id: 6,
      src: "/images/church2.jpg",
      alt: "Church Volunteers",
      category: "community"
    },
    {
      id: 7,
      src: "/images/church3.jpg",
      alt: "Church Choir",
      category: "ministry"
    },
    {
      id: 8,
      src: "/images/simbahan.jpg",
      alt: "Baptism Ceremony",
      category: "sacraments"
    }
  ];

  const categories = ["all", "church", "interior", "events", "mass", "community", "ministry", "sacraments"];
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredImages = activeCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(image => image.category === activeCategory);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % filteredImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex]);

  return (
    <section className="gallery-section" id="gallery">
      <div className="section-content">
        <div className="section-header">
          <h2>Church Gallery</h2>
          <p>Explore moments from our church community and activities</p>
        </div>

        {/* Category Filters */}
        <div className="gallery-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredImages.map((image, index) => (
            <div 
              key={image.id} 
              className="gallery-item"
              onClick={() => openLightbox(image, index)}
            >
              <div className="image-container">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="gallery-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const placeholder = document.createElement('div');
                    placeholder.className = 'gallery-placeholder';
                    placeholder.innerHTML = '🏛️';
                    e.target.parentNode.appendChild(placeholder);
                  }}
                />
                <div className="image-overlay">
                  <ZoomIn size={24} />
                  <span>View</span>
                </div>
              </div>
              <div className="image-caption">
                <p>{image.alt}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="lightbox-overlay" onClick={closeLightbox}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button className="lightbox-close" onClick={closeLightbox}>
                <X size={24} />
              </button>
              
              <div className="lightbox-image-container">
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.alt}
                  className="lightbox-image"
                />
                
                <button className="lightbox-nav prev" onClick={prevImage}>
                  <ChevronLeft size={32} />
                </button>
                
                <button className="lightbox-nav next" onClick={nextImage}>
                  <ChevronRight size={32} />
                </button>
              </div>

              <div className="lightbox-info">
                <h3>{selectedImage.alt}</h3>
                <div className="lightbox-counter">
                  {currentIndex + 1} / {filteredImages.length}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;