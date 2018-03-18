import flatitude from './flatitude.js';
import {
  Button,
  Modal,
  Nav
} from './flatitude.js';
import * as fl from './flatitude.js';

describe('flatitude', () => {
  it('exposes Button', () => {
    expect(flatitude.Button).toBeDefined();
    expect(Button).toBeDefined();
    expect(fl.Button).toBeDefined();
  });

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