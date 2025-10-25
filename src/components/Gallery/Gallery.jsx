import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Filter } from 'lucide-react';
import './Gallery.css';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");

  // Sample gallery images with different aspect ratios for masonry effect
  const galleryImages = [
    {
      id: 1,
      src: "/images/church1.jpg",
      alt: "San Jose Manggagawa Parish Church Exterior",
      category: "architecture",
      aspect: "vertical"
    },
    {
      id: 2,
      src: "/images/church2.jpg",
      alt: "Main Altar and Sanctuary",
      category: "interior",
      aspect: "horizontal"
    },
    {
      id: 3,
      src: "/images/church3.jpg",
      alt: "Sunday Mass Celebration with Community",
      category: "events",
      aspect: "horizontal"
    },
    {
      id: 4,
      src: "/images/simbahan.jpg",
      alt: "Church Facade during Golden Hour",
      category: "architecture",
      aspect: "vertical"
    },
    {
      id: 5,
      src: "/images/church1.jpg",
      alt: "Children's Ministry Activities",
      category: "ministry",
      aspect: "square"
    },
    {
      id: 6,
      src: "/images/church2.jpg",
      alt: "Church Volunteers in Community Service",
      category: "community",
      aspect: "vertical"
    },
    {
      id: 7,
      src: "/images/church3.jpg",
      alt: "Church Choir during Worship",
      category: "ministry",
      aspect: "horizontal"
    },
    {
      id: 8,
      src: "/images/simbahan.jpg",
      alt: "Baptism Ceremony at the Church",
      category: "sacraments",
      aspect: "square"
    },
    {
      id: 9,
      src: "/images/church1.jpg",
      alt: "Wedding Celebration",
      category: "sacraments",
      aspect: "horizontal"
    },
    {
      id: 10,
      src: "/images/church2.jpg",
      alt: "Christmas Decorations",
      category: "events",
      aspect: "vertical"
    },
    {
      id: 11,
      src: "/images/church3.jpg",
      alt: "Prayer Gathering",
      category: "community",
      aspect: "square"
    },
    {
      id: 12,
      src: "/images/simbahan.jpg",
      alt: "Church Garden and Grounds",
      category: "architecture",
      aspect: "horizontal"
    }
  ];

  const categories = [
    { id: "all", name: "All Photos", count: galleryImages.length },
    { id: "architecture", name: "Architecture", count: galleryImages.filter(img => img.category === "architecture").length },
    { id: "interior", name: "Interior", count: galleryImages.filter(img => img.category === "interior").length },
    { id: "events", name: "Events", count: galleryImages.filter(img => img.category === "events").length },
    { id: "ministry", name: "Ministries", count: galleryImages.filter(img => img.category === "ministry").length },
    { id: "community", name: "Community", count: galleryImages.filter(img => img.category === "community").length },
    { id: "sacraments", name: "Sacraments", count: galleryImages.filter(img => img.category === "sacraments").length }
  ];

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
      <div className="gallery-container">
        {/* Section Header */}
        <div className="gallery-header">
          <div className="header-content">
            <h2 className="gallery-title">Church Gallery</h2>
          
        
            <div className="header-decoration">
         
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="gallery-filters-container">
          <div className="filters-header">
            <Filter size={20} />
            <span>Filter by Category</span>
          </div>
          <div className="gallery-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="filter-text">{category.name}</span>
                <span className="filter-count">{category.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid - Masonry Style */}
        <div className="gallery-grid">
          {filteredImages.map((image, index) => (
            <div 
              key={image.id} 
              className={`gallery-item ${image.aspect}`}
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
                    placeholder.style.display = 'flex';
                    e.target.parentNode.appendChild(placeholder);
                  }}
                />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <ZoomIn size={24} className="zoom-icon" />
                    <span className="view-text">Click to View</span>
                  </div>
                  <div className="image-category">{image.category}</div>
                </div>
              </div>
              <div className="image-info">
                <p className="image-description">{image.alt}</p>
                <span className="image-category-tag">{image.category}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📷</div>
            <h3>No photos found</h3>
            <p>Try selecting a different category</p>
          </div>
        )}

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

                <div className="lightbox-zoom-hint">
                  <ZoomIn size={16} />
                  <span>Scroll to zoom • Click outside to close</span>
                </div>
              </div>

              <div className="lightbox-info">
                <div className="lightbox-header">
                  <h3>{selectedImage.alt}</h3>
                  <div className="lightbox-meta">
                    <span className="image-category-badge">{selectedImage.category}</span>
                    <span className="lightbox-counter">
                      {currentIndex + 1} of {filteredImages.length}
                    </span>
                  </div>
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