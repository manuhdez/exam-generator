import Head from 'next/head';
import styles from '../public/styles/Home.module.css';
import { useState } from 'react';

export default function Home() {
  const [formValue, setFormValue] = useState({
    title: '',
    uri: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [exam, setExam] = useState(null);

  const handleFetchData = async () => {
    setExam(null);
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        'Content-Type': 'application/json',
        body: JSON.stringify(formValue),
      });
      const data = await response.json();
      setExam(data[0]);
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    await handleFetchData();
  };

  const handleValueChange = ({ target }) => {
    setFormValue({
      ...formValue,
      [target.name]: target.value,
    });
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(exam.content);
    } catch (e) {
      console.log('Could not copy to clipboard');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Generate exam reports</title>
        <link rel="icon" href="../public/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>Generate your exam report!</h1>
        <form className={styles.form} onSubmit={handleSubmit} hidden={exam}>
          <label htmlFor="title">Enter a title for your report</label>
          <input
            type="text"
            name="title"
            value={formValue.title}
            onChange={handleValueChange}
          />
          <label htmlFor="uri">Enter a test url</label>
          <input
            type="text"
            name="uri"
            value={formValue.uri}
            onChange={handleValueChange}
          />
          <button type="submit" disabled={isLoading}>
            Generate exam
          </button>
        </form>
        {isLoading && <p>Generating exam...</p>}
        {isError && <p>There was an error.</p>}
        {exam && (
          <>
            <button onClick={handleCopyToClipboard}>
              Copy exam to clipboard
            </button>
            <h2>Exam preview: </h2>
            <div className={styles.report} hidden={isLoading || isError}>
              <pre>{exam.content}</pre>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
