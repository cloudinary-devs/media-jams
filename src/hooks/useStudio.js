import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';

export default function useStudio() {
  const { user, loading } = useUser();
  const [studioURL, setStudioURL] = React.useState(null);
  const [refreshStudioURL, triggerRefresh] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      if (user['https://mediajams-studio']?.roles) {
        async function fetchSanitySession() {
          const results = await fetch('/api/auth/studio').then((res) =>
            res.json(),
          );
          const { sanitySession } = results;
          setStudioURL(sanitySession);
        }
        fetchSanitySession();
      }
    }
  }, [user, refreshStudioURL, loading]);

  const openStudio = () => {
    window.open(studioURL, '_blank');
    triggerRefresh(!refreshStudioURL);
  };
  return openStudio;
}
