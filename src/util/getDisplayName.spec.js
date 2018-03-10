import getDisplayName from './getDisplayName.js';

describe('getDisplayName', () => {
  it('gets the components displayName', () => {
    let component = {displayName: 'herp'};

    expect(getDisplayName(component)).toBe('herp');
  });

  it('gets the components name in the absense of a displayName', () => {
    let component = {name: 'herp'};

    expect(getDisplayName(component)).toBe('herp');
  });

  it('returns "Component" in the as a last resort', () => {
    let component = {};

    expect(getDisplayName(component)).toBe('Component');
  });
});