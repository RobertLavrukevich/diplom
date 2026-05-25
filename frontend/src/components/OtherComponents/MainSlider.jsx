import { useState, useEffect } from 'react';
import '/src/styles/MainSlider.css';

const slides = [
    {
        id: 1,
        title: "Лучшие релизы 2026",
        desc: "Подборка самых знаковых альбомов этого года",
        img: "https://images.unsplash.com/photo-1514525253361-bee8718a7439?q=80&w=1600&auto=format&fit=crop", 
    },
    {
        id: 2,
        title: "МИР КИНО СЕГОДНЯ",
        desc: "Главные кинопремьеры и честные рецензии",
        img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1600&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "Стань критиком",
        desc: "Делись своими впечатлениями с сообществом",
        img: "https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=1600&auto=format&fit=crop",
    }
];

export default function MainSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    return (
        <div className="slider-container">
            <button className="slider-btn prev" onClick={prevSlide}>
                <svg viewBox="0 0 100 100" className="icon-arrow">
                    <path d="M70,90 L30,50 L70,10" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            
            <button className="slider-btn next" onClick={nextSlide}>
                <svg viewBox="0 0 100 100" className="icon-arrow">
                    <path d="M30,90 L70,50 L30,10" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>

            <div className="slider-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {slides.map((slide) => (
                    <div className="slide" key={slide.id} style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${slide.img})` }}>
                        <div className="slide-content">
                            <div className="title-strip">
                                <h1>{slide.title}</h1>
                                <p>{slide.desc}</p>
                            </div>
                            <button className="slide-more-btn">ЧИТАТЬ ДАЛЕЕ</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="slider-dots">
                {slides.map((_, index) => (
                    <span 
                        key={index} 
                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
}