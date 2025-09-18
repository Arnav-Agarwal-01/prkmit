import localFont from 'next/font/local';

// Define Roboto fonts using the local font files
export const roboto = localFont({
  src: [
    {
      path: '../../../public/fonts/Bangers,Comic_Relief,Inconsolata,Montserrat,Roboto,etc/Roboto/static/Roboto-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Bangers,Comic_Relief,Inconsolata,Montserrat,Roboto,etc/Roboto/static/Roboto-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/Bangers,Comic_Relief,Inconsolata,Montserrat,Roboto,etc/Roboto/static/Roboto-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Bangers,Comic_Relief,Inconsolata,Montserrat,Roboto,etc/Roboto/static/Roboto-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/Bangers,Comic_Relief,Inconsolata,Montserrat,Roboto,etc/Roboto/static/Roboto-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Bangers,Comic_Relief,Inconsolata,Montserrat,Roboto,etc/Roboto/static/Roboto-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/Bangers,Comic_Relief,Inconsolata,Montserrat,Roboto,etc/Roboto/static/Roboto-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Bangers,Comic_Relief,Inconsolata,Montserrat,Roboto,etc/Roboto/static/Roboto-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/Bangers,Comic_Relief,Inconsolata,Montserrat,Roboto,etc/Roboto/static/Roboto-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Bangers,Comic_Relief,Inconsolata,Montserrat,Roboto,etc/Roboto/static/Roboto-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-roboto',
  display: 'swap',
});

export const robotoCondensed = localFont({
  src: [
    {
      path: '../../../public/fonts/Bangers,Comic_Relief,Inconsolata,Montserrat,Roboto,etc/Roboto/static/Roboto_Condensed-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Bangers,Comic_Relief,Inconsolata,Montserrat,Roboto,etc/Roboto/static/Roboto_Condensed-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Bangers,Comic_Relief,Inconsolata,Montserrat,Roboto,etc/Roboto/static/Roboto_Condensed-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Bangers,Comic_Relief,Inconsolata,Montserrat,Roboto,etc/Roboto/static/Roboto_Condensed-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-roboto-condensed',
  display: 'swap',
});

export const robotoSemiCondensed = localFont({
  src: [
    {
      path: '../../../public/fonts/Bangers,Comic_Relief,Inconsolata,Montserrat,Roboto,etc/Roboto/static/Roboto_SemiCondensed-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Bangers,Comic_Relief,Inconsolata,Montserrat,Roboto,etc/Roboto/static/Roboto_SemiCondensed-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Bangers,Comic_Relief,Inconsolata,Montserrat,Roboto,etc/Roboto/static/Roboto_SemiCondensed-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Bangers,Comic_Relief,Inconsolata,Montserrat,Roboto,etc/Roboto/static/Roboto_SemiCondensed-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-roboto-semi-condensed',
  display: 'swap',
});

// For backward compatibility, create aliases
export const helvetica = roboto;
export const helveticaCompressed = robotoCondensed;
export const helveticaRounded = robotoSemiCondensed;