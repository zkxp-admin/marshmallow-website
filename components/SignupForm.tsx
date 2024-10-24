import { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/SignUp.module.css';

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ message: '', isError: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    return EMAIL_REGEX.test(email.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();

    // Client-side validation
    if (!validateEmail(trimmedEmail)) {
      setStatus({ 
        message: 'Please enter a valid email address', 
        isError: true 
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ message: '', isError: false });

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ message: "You're on the early access list!", isError: false });
        setEmail('');
      } else if (response.status === 429) {
        setStatus({ 
          message: 'Too many attempts. Please try again later.', 
          isError: true 
        });
      } else {
        setStatus({ 
          message: data.error || 'Signup failed', 
          isError: true 
        });
      }
    } catch (error) {
      setStatus({ 
        message: 'Service temporarily unavailable', 
        isError: true 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className={styles.mainSection}>
        <div className={styles.contentWrapper}>
          <div className={styles.imageContainer}>
            <Image
              src="/full_logo.png"
              alt="Marshmallow Kids Logo"
              width={400}
              height={400}
              priority
              className={styles.logo}
            />
            <a 
              href="https://x.com/marshmallow_xyz"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.twitterButton} ${styles.desktopTwitter}`}
            >
              Follow us on Twitter
            </a>
          </div>
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.grid}>
              <div className={styles.card}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  required
                  pattern={EMAIL_REGEX.source}
                  className={styles.input}
                  aria-label="Email address"
                />
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={styles.button}
                  aria-label="Sign up button"
                >
                  {isSubmitting ? 'Signing up...' : 'Sign Up for Early Access'}
                </button>
                {status.message && (
                  <p 
                    className={`${styles.status} ${status.isError ? styles.error : styles.success}`}
                    role="alert"
                  >
                    {status.message}
                  </p>
                )}
              </div>
            </form>
          </div>
          <a 
            href="https://x.com/marshmallow_xyz"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.twitterButton} ${styles.mobileTwitter}`}
          >
            Follow us on Twitter
          </a>
        </div>
      </div>
    );
  }