import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ArrowRight, CheckCircle2 } from 'lucide-react';
import './Quote.css';

const Quote = () => {
  const [formState, setFormState] = useState('idle'); // idle, loading, success

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
      <div className="quote-container">
        <div className="quote-grid">
          {/* Left Side: Info */}
          <motion.div 
            className="quote-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
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
                  <span>Global HQ</span>
                  <p>Ahmedabad, Gujarat, India</p>
                </div>
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
                    <select name="category" required>
                      <option value="">Select a Category</option>
                      <option value="masks">Face Masks & Protection</option>
                      <option value="caps">Head Caps & Bouffant</option>
                      <option value="gloves">Shoe Covers & Gloves</option>
                      <option value="aprons">Disposable Aprons</option>
                      <option value="sheets">Bed Sheets & Linens</option>
                    </select>
                  </div>
                  <div className="input-group full-width">
                    <label>Requirements Brief</label>
                    <textarea name="message" placeholder="Tell us about the quantity and specific standards you require..." rows="4" required></textarea>
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
