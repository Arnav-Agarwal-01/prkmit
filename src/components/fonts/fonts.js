import localFont from 'next/font/local';

// Define Helvetica fonts using the local font files
export const helvetica = localFont({
  src: [
    {
      path: '../../../public/fonts/helvetica-255/helvetica-light-587ebe5a59211.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/helvetica-255/Helvetica.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/helvetica-255/Helvetica-Oblique.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/helvetica-255/Helvetica-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/helvetica-255/Helvetica-BoldOblique.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-helvetica',
  display: 'swap',
});

export const helveticaCompressed = localFont({
  src: '../../../public/fonts/helvetica-255/helvetica-compressed-5871d14b6903a.otf',
  variable: '--font-helvetica-compressed',
  weight: '400',
  style: 'normal',
  display: 'swap',
});

export const helveticaRounded = localFont({
  src: '../../../public/fonts/helvetica-255/helvetica-rounded-bold-5871d05ead8de.otf',
  variable: '--font-helvetica-rounded',
  weight: '700',
  style: 'normal',
  display: 'swap',
});