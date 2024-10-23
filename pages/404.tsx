import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/404.module.css';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | Marshmallow</title>
        <meta name="description" content="Page not found" />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.content}>
            <Image
              src="/full_logo.png"
              alt="Marshmallow Kids Logo"
              width={300}
              height={300}
              priority
              className={styles.logo}
            />
            <h1 className={styles.title}>Oops! Page Not Found</h1>
            <p className={styles.description}>
              The page you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link href="/" className={styles.button}>
             Home
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}