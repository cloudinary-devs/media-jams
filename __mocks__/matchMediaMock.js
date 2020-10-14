// Copied over from example.
// https://github.com/HospitalRun/components/pull/117/commits/210d1b74e4c8c14e1ffd527042e3378bba064ed8
window.matchMedia = jest.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // deprecated
  removeListener: jest.fn(), // deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));
