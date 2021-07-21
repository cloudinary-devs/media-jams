export const types = ['post', 'release'];

export const states = [
  { id: 'draft', title: 'Draft' },
  {
    id: 'inReview',
    title: 'In review',
    color: 'warning',
    badgeColor: 'caution',
  },
  {
    id: 'updatedReview',
    title: 'Updated Review',
    color: 'warning',
    badgeColor: 'caution',
  },
  {
    id: 'approved',
    title: 'Approved',
    color: 'success',
    badgeColor: 'positive',
  },
  {
    id: 'changesRequested',
    title: 'Changes requested',
    color: 'warning',
    badgeColor: 'primary',
  },
  {
    id: 'published',
    title: 'Published',
    color: 'success',
    color: 'success',
    badgeColor: 'positive',
  },
];
