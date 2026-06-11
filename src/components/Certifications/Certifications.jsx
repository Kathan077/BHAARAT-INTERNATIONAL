import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FileText, Globe, Award, ShieldCheck, Anchor } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './Certifications.css';

const certs = [
  {
    id: 1,
    name: 'GST Registration',
    sub: 'Goods and Services Tax Certificate',
    color: '#008080',
    file: '/certificates/BHAARAT INTERNATIONAL GST.pdf',
    fileName: 'Bhaarat_International_GST_Registration.pdf',
    logo: <FileText size={48} strokeWidth={1.5} />,
  },
  {
    id: 2,
    name: 'Import Export Code (IEC)',
    sub: 'DGFT, Ministry of Commerce & Industry',
    color: '#0A2540',
    file: '/certificates/BHARAAT INTERNATIONAL IEC.pdf',
    fileName: 'Bhaarat_International_IEC_Certificate.pdf',
    logo: <Globe size={48} strokeWidth={1.5} />,
  },
  {
    id: 3,
    name: 'RCMC Certificate',
    sub: 'Registration Cum Membership Certificate',
    color: '#D4AF37',
    file: '/certificates/RCMC.pdf',
    fileName: 'Bhaarat_International_RCMC_Certificate.pdf',
    logo: <Award size={48} strokeWidth={1.5} />,
  },
  {
    id: 4,
    name: 'Udyam Registration',
    sub: 'MSME Registration Certificate',
    color: '#FF9933',
    file: '/certificates/UDYAM CERTIFICATE BHAARAT INTERNATIONAL.pdf',
    fileName: 'Bhaarat_International_Udyam_Certificate.pdf',
    logo: <img src="https://msmedinagpur.gov.in/assets/emblem-dark-CWvnlyPE.png" alt="MSME Logo" style={{ height: '85%', width: '90%', objectFit: 'contain' }} />,
  },
  {
    id: 5,
    name: 'Drug License (20B)',
    sub: 'Wholesale License for General Drugs',
    color: '#10B981',
    file: '/certificates/BHAARAT INTERNATIONAL 20B DRUG LICENCE.pdf',
    fileName: 'Bhaarat_International_Drug_License_20B.pdf',
    logo: <ShieldCheck size={48} strokeWidth={1.5} />,
  },
  {
    id: 6,
    name: 'Drug License (21B)',
    sub: 'Wholesale License for Specified Drugs',
    color: '#059669',
    file: '/certificates/BHAARAT INTERNATIONAL 21B DRUG LICENCE.pdf',
    fileName: 'Bhaarat_International_Drug_License_21B.pdf',
    logo: <ShieldCheck size={48} strokeWidth={1.5} />,
  },
  {
    id: 7,
    name: 'Drug License (FL)',
    sub: 'Form FL Drug & Food License',
    color: '#84CC16',
    file: '/certificates/BHAARAT INTERNATIONAL FL DRUG LICENCE.pdf',
    fileName: 'Bhaarat_International_Drug_License_FL.pdf',
    logo: <ShieldCheck size={48} strokeWidth={1.5} />,
  },
  {
    id: 8,
    name: 'AD Code Registration',
    sub: 'Authorized Dealer Code (Customs)',
    color: '#3B82F6',
    file: '/certificates/AD CODE BHAARAT INTERNATIONAL.pdf',
    fileName: 'Bhaarat_International_AD_Code.pdf',
    logo: <Anchor size={48} strokeWidth={1.5} />,
  }
];

// Global dynamic script loader for PDF.js to avoid multiple loadings
let pdfjsPromise = null;
const loadPdfJs = () => {
  if (pdfjsPromise) return pdfjsPromise;
  pdfjsPromise = new Promise((resolve, reject) => {
    if (window.pdfjsLib) {
      resolve(window.pdfjsLib);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
    script.async = true;
    script.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
      resolve(window.pdfjsLib);
    };
    script.onerror = (e) => reject(new Error('Failed to load PDF.js script'));
    document.head.appendChild(script);
  });
  return pdfjsPromise;
};

// PDF Preview component using HTML5 Canvas rendering
const PdfPreview = ({ fileUrl }) => {
  const canvasRef = useRef(null);
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
  const renderTaskRef = useRef(null);

  useEffect(() => {
    let isCancelled = false;

    const renderPdf = async () => {
      try {
        setStatus('loading');
        const pdfjsLib = await loadPdfJs();
        if (isCancelled) return;

        const loadingTask = pdfjsLib.getDocument(fileUrl);
        const pdf = await loadingTask.promise;
        if (isCancelled) return;

        const page = await pdf.getPage(1);
        if (isCancelled) return;

        // Render page 1 at high resolution (2.0 scale) for ultra-sharp previews in larger frames
        const viewport = page.getViewport({ scale: 2.0 });
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        // Cancel running render task if any
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }

        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;

        await renderTask.promise;
        if (!isCancelled) {
          setStatus('success');
        }
      } catch (err) {
        if (err.name === 'RenderingCancelledException' || err.message?.includes('cancelled')) {
          return;
        }
        console.error('Error rendering PDF preview:', err);
        if (!isCancelled) {
          setStatus('error');
        }
      }
    };

    renderPdf();

    return () => {
      isCancelled = true;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
    };
  }, [fileUrl]);

  return (
    <div className="cf__preview-container">
      {status === 'loading' && (
        <div className="cf__preview-loader">
          <div className="cf__spinner"></div>
          <span>Loading Certificate Preview...</span>
        </div>
      )}
      {status === 'error' && (
        <div className="cf__preview-error">
          <div className="cf__preview-error-icon">⚠️</div>
          <span>Failed to load preview</span>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="cf__preview-error-btn">
            Open PDF
          </a>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={`cf__preview-canvas ${status === 'success' ? 'cf__preview-canvas--loaded' : ''}`}
        style={{ display: status === 'success' ? 'block' : 'none' }}
      />
    </div>
  );
};

const Certifications = () => {
  return (
    <section className="cf" id="certifications">
      <div className="cf__watermark" aria-hidden="true">Certificates</div>

      <div className="container cf__inner">
        {/* Header */}
        <div className="cf__hdr">
          <span className="cf__eyebrow">
            <span className="cf__eyebrow-line" />Our Credentials
          </span>
          <h2 className="cf__heading">
            Official <span className="cf__accent">Certifications</span> &amp; Previews
          </h2>
        </div>

        {/* 3D Coverflow Slider Wrapper */}
        <div className="cf__swiper-outer">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 100,
              modifier: 1.15,
              slideShadows: true,
            }}
            pagination={{
              el: '.cf__swiper-pagination',
              clickable: true,
            }}
            navigation={{
              nextEl: '.cf__swiper-button-next',
              prevEl: '.cf__swiper-button-prev',
            }}
            modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
            className="cf__swiper"
            breakpoints={{
              320: {
                coverflowEffect: {
                  rotate: 10,
                  stretch: 0,
                  depth: 50,
                  modifier: 1,
                }
              },
              768: {
                coverflowEffect: {
                  rotate: 15,
                  stretch: 0,
                  depth: 80,
                  modifier: 1.1,
                }
              },
              1024: {
                coverflowEffect: {
                  rotate: 20,
                  stretch: 0,
                  depth: 100,
                  modifier: 1.15,
                }
              }
            }}
          >
            {certs.map((c) => (
              <SwiperSlide className="cf__slide" key={c.id}>
                <div 
                  className="cf__card-preview" 
                  style={{ 
                    '--cf-color': c.color, 
                    '--cf-color-light': `${c.color}15` 
                  }}
                >
                  {/* Glass Card Header */}
                  <div className="cf__card-hdr">
                    <div className="cf__card-badge" style={{ backgroundColor: c.color }}>
                      {c.id}
                    </div>
                    <div className="cf__card-title-group">
                      <h3 className="cf__card-name">{c.name}</h3>
                      <p className="cf__card-sub">{c.sub}</p>
                    </div>
                  </div>

                  {/* Document Body containing the Live PDF Canvas Preview */}
                  <div className="cf__card-body">
                    <PdfPreview fileUrl={c.file} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Controls */}
          <div className="cf__swiper-button-prev cf__arrow">‹</div>
          <div className="cf__swiper-button-next cf__arrow">›</div>
        </div>

        {/* Pagination Dots */}
        <div className="cf__swiper-pagination cf__dots"></div>
      </div>
    </section>
  );
};

export default Certifications;
