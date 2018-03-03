import flatitude from '../index.js';
import {Nav} from '../index.js';
import * as fl from '../index.js';

describe('flatitude', () => {
  it("exposes Nav", () => {
    expect(flatitude.Nav).toBeDefined();
    expect(Nav).toBeDefined();
    expect(fl.Nav).toBeDefined();
  });
});