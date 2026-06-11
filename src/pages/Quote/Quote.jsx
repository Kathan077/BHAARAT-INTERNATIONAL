import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ArrowRight, CheckCircle2 } from 'lucide-react';
import SEO from '../../components/SEO/SEO';
import './Quote.css';

const Quote = () => {
  const [formState, setFormState] = useState('idle'); // idle, loading, success
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const productParam = searchParams.get('product') ? decodeURIComponent(searchParams.get('product')) : '';

  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  const getMappedCategoryValue = (catId) => {
    switch (catId) {
      case 'disposable-3-ply-face-mask':
      case 'respiratory-disposable-face-mask':
        return 'masks';
      case 'disposable-head-cap':
        return 'caps';
      case 'disposable-shoe-cover':
      case 'disposable-hand-gloves-sleeve':
        return 'gloves';
      case 'disposable-apron-sterile':
      case 'disposable-apron-non-sterile':
      case 'disposable-apparel':
      case 'disposable-aprrel':
      case 'surgical-gowns':
        return 'aprons';
      case 'disposable-plain-sheet-bed-sheet':
      case 'health-hygiene-products':
      case 'health-hygine-products':
      case 'salon-and-spa-disposable-products':
      case 'orthopaedic':
      case 'cardiology':
      case 'gynecology':
      case 'urology':
      case 'ophthalmology':
      case 'accessories-and-other-protectives':
        return 'sheets';
      case 'diagnostic-kits':
        return 'diagnostic-kits';
      case 'elisa-kits':
        return 'elisa-kits';
      default:
        return '';
    }
  };

  useEffect(() => {
    if (categoryParam) {
      const mappedVal = getMappedCategoryValue(categoryParam);
      setCategory(mappedVal);
    }
    if (productParam) {
      const formattedCategory = categoryParam
        ? categoryParam.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
        : '';
      setMessage(`I would like to request a quote for the following product:\nProduct Name: ${productParam}\nCategory: ${formattedCategory}\n\nQuantity Required: \nAdditional Specifications: `);
    }
  }, [categoryParam, productParam]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('loading');

    const formData = new FormData(e.target);
    formData.append("access_key", "c5c86471-7818-4794-98e0-5183f58b37a0");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setFormState('success');
        e.target.reset();
      } else {
        console.error("Error", data);
        setFormState('idle');
        alert("Submission failed: " + data.message);
      }
    } catch (error) {
      console.error("Error", error);
      setFormState('idle');
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <section className="quote-section" id="quote">
      <SEO
        title="Request a Quote"
        description="Request a personalized quote or technical consultation for premium medical supplies and logistics from Bhaarat International."
        url="https://bhaaratinternational.org/quote"
      />
      <div className="quote-container">
        <div className="quote-grid">
          {/* Left Side: Info */}
          <motion.div
            className="quote-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="GETtouch">GET IN TOUCH</span>
            <h2>Ready to source <span className="highlight">Premium Medical</span> supplies?</h2>
            <p>Request a personalized quote or technical consultation for your healthcare facility or export needs.</p>

            <div className="contact-list">
              <div className="contact-item-pro">
                <div className="icon-box"><Phone size={24} /></div>
                <div className="item-text">
                  <span>Call or WhatsApp</span>
                  <a href="tel:+919825275668">+91 98252 75668</a>
                </div>
              </div>
              <div className="contact-item-pro">
                <div className="icon-box"><Mail size={24} /></div>
                <div className="item-text">
                  <span>Email Inquiries</span>
                  <a href="mailto:bhaaratinternational@zohomail.in">bhaaratinternational@zohomail.in</a>
                </div>
              </div>
              <div className="contact-item-pro">
                <div className="icon-box"><MapPin size={24} /></div>
                <div className="item-text">
                  <span>Our Address</span>
                  <a
                    href="https://www.google.com/maps/place/Suprabh+Apartment/@22.9982507,72.5150822,17z/data=!4m10!1m2!2m1!1sE-007,+Suprabh+Apartment,+Vejalpur,+Ahmedabad-380051+India!3m6!1s0x395e9acd792af75d:0x1f6c605f7688e8ae!8m2!3d22.9988057!4d72.5176412!15sCjpFLTAwNywgU3VwcmFiaCBBcGFydG1lbnQsIFZlamFscHVyLCBBaG1lZGFiYWQtMzgwMDUxIEluZGlhWjkiN2UgMDA3IHN1cHJhYmggYXBhcnRtZW50IHZlamFscHVyIGFobWVkYWJhZCAzODAwNTEgaW5kaWGSARBidWlsZGluZ19zb2NpZXR5mgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVVJhYkU4eWVVWlJFQUXgAQD6AQQIGRAT!16s%2Fg%2F11dxdd0c0h?entry=ttu&g_ep=EgoyMDI2MDQwNy4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    E-007, Suprabh Apartment,<br />Vejalpur, Ahmedabad - 380051, India
                  </a>
                </div>
              </div>
            </div>

            <div className="quote-trust">
              <div className="trust-badge">
                <CheckCircle2 size={16} /> Global Export Ready
              </div>

            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            className="quote-form-wrapper"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {formState === 'success' ? (
              <motion.div
                className="success-state"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="success-icon">
                  <CheckCircle2 size={64} />
                </div>
                <h3>Quote Request Sent!</h3>
                <p>Our team will review your requirements and get back to you within 24 hours.</p>
                <button
                  className="btn btn-primary"
                  onClick={() => setFormState('idle')}
                >
                  Send Another Request
                </button>
              </motion.div>
            ) : (
              <form className="quote-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="input-group">
                    <label>Full Name</label>
                    <input type="text" name="name" placeholder="John Doe" required />
                  </div>
                  <div className="input-group">
                    <label>Work Email</label>
                    <input type="email" name="email" placeholder="john@hospital.com" required />
                  </div>
                  <div className="input-group">
                    <label>Company/Institution</label>
                    <input type="text" name="company" placeholder="Global Health Care" required />
                  </div>
                  <div className="input-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" placeholder="+91 00000 00000" required />
                  </div>
                  <div className="input-group full-width">
                    <label>Product Category</label>
                    <select name="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
                      <option value="">Select a Category</option>
                      <option value="masks">Face Masks & Protection</option>
                      <option value="caps">Head Caps & Bouffant</option>
                      <option value="gloves">Shoe Covers & Gloves</option>
                      <option value="aprons">Disposable Aprons</option>
                      <option value="sheets">Bed Sheets & Linens</option>
                      <option value="diagnostic-kits">Diagnostic Kits</option>
                      <option value="elisa-kits">ELISA Kits</option>
                    </select>
                  </div>
                  <div className="input-group full-width">
                    <label>Requirements Brief</label>
                    <textarea name="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us about the quantity and specific standards you require..." rows="4" required></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className={`submit-btn ${formState === 'loading' ? 'loading' : ''}`}
                  disabled={formState === 'loading'}
                >
                  {formState === 'loading' ? 'Processing...' : (
                    <>
                      <span>Request Quote Now</span> <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Quote;
