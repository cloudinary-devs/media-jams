import { buildImageUrl } from 'cloudinary-build-url';

const ogImage1 = buildImageUrl('mediajams/og-image-base-1.jpg', {
  cloud: { cloudName: 'mediadevs' },
});

const ogImage2 = buildImageUrl('mediajams/og-image-base-2.jpg', {
  cloud: { cloudName: 'mediadevs' },
});

const ogImage3 = buildImageUrl('mediajams/og-image-base-3.jpg', {
  cloud: { cloudName: 'mediadevs' },
});

const ogImage4 = buildImageUrl('mediajams/og-image-base-4.jpg', {
  cloud: { cloudName: 'mediadevs' },
});

const ogImage5 = buildImageUrl('mediajams/og-image-base-5.jpg', {
  cloud: { cloudName: 'mediadevs' },
});

const urls = [ogImage1, ogImage2, ogImage3, ogImage4, ogImage5];

const randomOgImage = urls[Math.floor(Math.random() * urls.length)];

const baseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return `https://mediajams.dev`;
  } else if (process.env.VERCEL_ENV === 'production') {
    return `https://v2.mediajams.dev`;
  } else {
    return `http://localhost:3000`;
  }
};

export default {
  title: 'Front End Developer Companion to Rich Media',
  description:
    'Media Jams offer numerous useful examples through which developers can sharpen their expertise in leveraging media for apps and tech stacks',
  url: baseUrl(),
  canonical: baseUrl(),
  openGraph: {
    url: baseUrl(),
    title: 'Putting Media to work is hard',
    description: '',
    images: [
      {
        url: randomOgImage,
        width: 1200,
        height: 630,
        alt:
          'Discover Top practices and tools applying media technology with Media Jams',
      },
    ],
    siteName: 'MediaJams',
  },
};
