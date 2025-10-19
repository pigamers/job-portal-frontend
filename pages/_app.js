import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import Header from '../components/Header';
import { JobProvider } from '../context/JobProvider';
import '../styles/globals.css'
import '@mantine/dates/styles.css';
import Head from 'next/head';


export default function App({ Component, pageProps }) {
  return (
    <>
     <Head>
        <title>CyberMinds Job Portal</title>
        <meta name="description" content="Find your dream job with CyberMinds" />
      </Head>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <ModalsProvider>
        <JobProvider>
          <Header />
          <Notifications />
          <Component {...pageProps} />
        </JobProvider>
      </ModalsProvider>
    </MantineProvider>
    </>
  );
}