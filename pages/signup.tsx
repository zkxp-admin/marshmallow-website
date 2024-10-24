import Head from 'next/head';
import styles from '../styles/SignUp.module.css';
import SignupForm from '../components/SignupForm';
import FAQ from '../components/FAQ';

export default function SignupPage() {
  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/background-desktop.png"
          as="image"
          media="(min-width: 769px)"
        />
        <link
          rel="preload"
          href="/background-mobile.png"
          as="image"
          media="(max-width: 768px)"
        />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <SignupForm />
          <div className={styles.faqWrapper}>
            <FAQ />
          </div>
        </main>
      </div>
    </>
  );
}