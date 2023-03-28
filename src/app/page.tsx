'use client';
import { Button, MultiSelect, Select } from '@mantine/core';
import { Inter } from 'next/font/google';
import { useState } from 'react';
import { toast } from 'react-toastify';
import styles from './page.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const converterOptions = [
    {
      value: 'S3',
      label: 'S3',
    },
    {
      value: 'S5',
      label: 'S5',
    },
    {
      value: 'S8',
      label: 'S8',
    },
    {
      value: 'S9',
      label: 'S9',
    },
  ];
  const meterOptions = [
    {
      value: '19 MW TG',
      label: '19 MW TG',
    },
    {
      label: 'HT-Panel-3',
      value: 'HT-Panel-3',
    },
  ];
  const parameterOptions = [
    {
      label: 'V-R',
      value: 'V-R',
    },
    {
      label: 'V-Y',
      value: 'V-Y',
    },
    {
      label: 'V-B',
      value: 'V-B',
    },
    {
      label: 'F',
      value: 'F',
    },
    {
      label: 'V-RY',
      value: 'V-RY',
    },
    {
      label: 'V-YB',
      value: 'V-YB',
    },
    {
      label: 'V-BR',
      value: 'V-BR',
    },
    {
      label: 'I-R',
      value: 'I-R',
    },
    {
      label: 'I-Y',
      value: 'I-Y',
    },
    {
      label: 'I-B',
      value: 'I-B',
    },
    {
      label: 'KW-R',
      value: 'KW-R',
    },
    {
      label: 'KW-Y',
      value: 'KW-Y',
    },
    {
      label: 'KW-B',
      value: 'KW-B',
    },
  ];
  const [selectedConverter, setSelectedConverter] = useState<string | null>(
    null
  );
  const [selectedMeters, setSelectedMeters] = useState<string[] | null>(null);
  const [selectedParameters, setSelectedParameters] = useState<string[] | null>(
    null
  );

  const handleReportCreation = () => {
    if (
      !selectedConverter ||
      !selectedMeters ||
      !selectedParameters ||
      (selectedMeters && selectedMeters.length === 0) ||
      (selectedParameters && selectedParameters.length === 0)
    ) {
      toast.error('Please choose all the options');
      return;
    } else {
      toast.promise(
        new Promise(resolve => {
          setTimeout(() => {
            resolve('asd');
          }, 2000);
        }),
        {
          // loading: 'Creating report...',
          success: 'Report created successfully',
        }
      );
    }
  };

  return (
    <main className={styles.main}>
      <div className="flex flex-col md:flex-row items-end md:gap-x-5">
        <Select
          mt="md"
          withinPortal
          data={converterOptions.map(i => i.label)}
          placeholder="Select a converter"
          label="Converter :"
          nothingFound="No converter found"
          classNames={{}}
          onChange={setSelectedConverter}
        />
        <MultiSelect
          mt="md"
          withinPortal
          data={meterOptions.map(i => i.label)}
          placeholder="Select a meter"
          label="Meters :"
          classNames={{}}
          nothingFound="No meters found"
          onChange={setSelectedMeters}
        />
        <MultiSelect
          mt="md"
          withinPortal
          multiple
          data={parameterOptions.map(i => i.label)}
          placeholder="Select parameters"
          label="Parameters :"
          classNames={{}}
          nothingFound="No parameters found"
          onChange={setSelectedParameters}
        />
        <div className="ml-10">
          <Button
            color="green"
            className="text-black bg-green-600 hover:shadow-lime-700 hover:shadow-xl hover:scale-125 transform transition duration-500 ease-in-out"
            onClick={handleReportCreation}
          >
            Create report
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-y-3">
        <p>
          Converter - <span className="text-lime-500">{selectedConverter}</span>
        </p>
        <p>
          Meters -{' '}
          {selectedMeters &&
            selectedMeters.length > 0 &&
            selectedMeters.map((meter, index) => (
              <span className="text-lime-500">
                {meter}
                <span
                  className={`${
                    index + 1 !== selectedMeters.length ? 'inline' : 'hidden'
                  }`}
                >
                  ,{' '}
                </span>
              </span>
            ))}
        </p>
        <p>
          Parameters -{' '}
          {selectedParameters &&
            selectedParameters.length > 0 &&
            selectedParameters.map((parameter, index) => (
              <span className="text-lime-500">
                {parameter}
                <span
                  className={`${
                    index + 1 !== selectedParameters.length
                      ? 'inline'
                      : 'hidden'
                  }`}
                >
                  ,{' '}
                </span>
              </span>
            ))}
        </p>
      </div>
      {/* <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <div className={styles.thirteen}>
          <Image src="/thirteen.svg" alt="13" width={40} height={31} priority />
        </div>
      </div>

      <div className={styles.grid}>
        <a
          href="https://beta.nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Docs <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Templates <span>-&gt;</span>
          </h2>
          <p className={inter.className}>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Deploy <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div> */}
    </main>
  );
}
