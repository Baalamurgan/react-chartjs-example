'use client';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toast, setToast] = useState<typeof import('react-toastify') | null>(
    null
  );
  useEffect(() => {
    import('react-toastify').then(module => {
      setToast(module);
    });
  }, []);
  return (
    <html lang="en">
      <body>
        {toast && <toast.ToastContainer />}
        {children}
      </body>
    </html>
  );
}
