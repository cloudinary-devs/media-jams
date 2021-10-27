import mockAuth0 from '@utils/__mocks__/auth0Mock';
import rewire from 'rewire';
// Get function w/o exporting
const appendUserRoles = rewire('../../lib/rules/appendUserRoles');

// Set Globals for Rules Environmetn
global.auth0 = {};
global.configuration = {};

// Set globals to specific module scope
appendUserRoles.__set__('auth0', {});
appendUserRoles.__set__('configuration', {});

// Now we can pluck the function right out of the file!
const userRoles = appendUserRoles.__get__('userRoles');

const mockCallback = jest.fn();
const { user, context } = mockAuth0;
it('userRoles makes callback with user and context', () => {
  userRoles(user, context, mockCallback);
  // The mock function was called at least once
  expect(mockCallback).toHaveBeenCalled();

  // The mock function was called at least once with the specified args
  expect(mockCallback).toHaveBeenCalledWith(null, user, context);

  // Return `null` as the first argument.
  expect(mockCallback.mock.calls[0][0]).toEqual(null);
  // User should be returned.
  expect(mockCallback.mock.calls[0][1]).toEqual(user);
  // Context should roles on idtoken and accessToken
  expect(
    mockCallback.mock.calls[0][2].idToken['https://mediajams-studio/roles'],
  ).toEqual(['Creator', 'Admin']);
  expect(
    mockCallback.mock.calls[0][2].accessToken['https://mediajams-studio/roles'],
  ).toEqual(['Creator', 'Admin']);
});
