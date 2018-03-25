import flatitude from './flatitude.js';
import {
  ActionDropdown,
  Button,
  DropdownArea,
  Modal,
  Nav,
  Spinner,
  Th,
  Tile
} from './flatitude.js';
import * as fl from './flatitude.js';

describe('flatitude', () => {
  it('exposes ActionDropdown', () => {
    expect(flatitude.ActionDropdown).toBeDefined();
    expect(ActionDropdown).toBeDefined();
    expect(fl.ActionDropdown).toBeDefined();
  });

  it('exposes Button', () => {
    expect(flatitude.Button).toBeDefined();
    expect(Button).toBeDefined();
    expect(fl.Button).toBeDefined();
  });

  it('exposes DropdownArea', () => {
    expect(flatitude.DropdownArea).toBeDefined();
    expect(DropdownArea).toBeDefined();
    expect(fl.DropdownArea).toBeDefined();
  });

  it('exposes Modal', () => {
    expect(flatitude.Modal).toBeDefined();
    expect(Modal).toBeDefined();
    expect(fl.Modal).toBeDefined();
  });

  it("exposes Nav", () => {
    expect(flatitude.Nav).toBeDefined();
    expect(Nav).toBeDefined();
    expect(fl.Nav).toBeDefined();
  });

  it("exposes Spinner", () => {
    expect(flatitude.Spinner).toBeDefined();
    expect(Spinner).toBeDefined();
    expect(fl.Spinner).toBeDefined();
  });

  it("exposes Th", () => {
    expect(flatitude.Th).toBeDefined();
    expect(Th).toBeDefined();
    expect(fl.Th).toBeDefined();
  });

  it("exposes Tile", () => {
    expect(flatitude.Tile).toBeDefined();
    expect(Tile).toBeDefined();
    expect(fl.Tile).toBeDefined();
  });
});