import SlotsProvider from '@/providers/SlotsProvider'
import AppointmentsProvider from '@/providers/AppointmentsProvider'

import { ToastContainer } from 'react-toastify';

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import CandidatesProvider from '@/providers/CandidatesProvider'

import './globals.css'
import 'react-toastify/dist/ReactToastify.css';
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";
import StyledComponentsRegistry from './registry';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RhSystem',
  //description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='layout'>
          <SlotsProvider>
            <CandidatesProvider>
            <AppointmentsProvider>
                <StyledComponentsRegistry>
                  {children}
                </StyledComponentsRegistry>
                <ToastContainer/>
            </AppointmentsProvider>
            </CandidatesProvider>
          </SlotsProvider>
        </div>
      </body>
    </html>
  )
}
