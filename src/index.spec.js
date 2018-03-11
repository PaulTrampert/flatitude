import flatitude from './flatitude.js';
import {
  Modal,
  Nav
} from './flatitude.js';
import * as fl from './flatitude.js';

describe('flatitude', () => {
  it("exposes Nav", () => {
    expect(flatitude.Nav).toBeDefined();
    expect(Nav).toBeDefined();
    expect(fl.Nav).toBeDefined();
  });

  it('exposes Modal', () => {
    expect(flatitude.Modal).toBeDefined();
    expect(Modal).toBeDefined();
    expect(fl.Modal).toBeDefined();
  });
});