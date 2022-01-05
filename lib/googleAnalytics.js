const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
export default {
  pageview: (url) => {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  },
  event: ({ action, category, label, value }) => {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  },
  searchBy: ({ searchValue = '', selectedTagFilters = [] }) => {
    if (window && window.gtag) {
      window.gtag('event', 'search', {
        searchValue,
        selectedTagFilters,
      });
    }
  },
  readJam: (post, time) => {
    const {
      author: { name },
      title,
      tags,
    } = post;
    window.gtag('event', 'read_jam', {
      title,
      tags,
      name,
      ...time,
    });
  },
};
