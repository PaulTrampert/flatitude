import flatitude from './flatitude.js';
import {
  ActionDropdown,
  Alert,
  Button,
  DropdownArea,
  DropdownButton,
  GrowlArea,
  LoadingField,
  Modal,
  Nav,
  PagingControls,
  ProgressBar,
  SearchBox,
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

  it('exposes Alert', () => {
    expect(flatitude.Alert).toBeDefined();
    expect(Alert).toBeDefined();
    expect(fl.Alert).toBeDefined();
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

  it('exposes DropdownButton', () => {
    expect(flatitude.DropdownButton).toBeDefined();
    expect(DropdownButton).toBeDefined();
    expect(fl.DropdownButton).toBeDefined();
  });

  it('exposes GrowlArea', () => {
    expect(flatitude.GrowlArea).toBeDefined();
    expect(GrowlArea).toBeDefined();
    expect(fl.GrowlArea).toBeDefined();
  });

  it('exposes LoadingField', () => {
    expect(flatitude.LoadingField).toBeDefined();
    expect(LoadingField).toBeDefined();
    expect(fl.LoadingField).toBeDefined();
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

  it("exposes PagingControls", () => {
    expect(flatitude.PagingControls).toBeDefined();
    expect(PagingControls).toBeDefined();
    expect(fl.PagingControls).toBeDefined();
  });

  it("exposes ProgressBar", () => {
    expect(flatitude.ProgressBar).toBeDefined();
    expect(ProgressBar).toBeDefined();
    expect(fl.ProgressBar).toBeDefined();
  });

  it('exposes SearchBox', () => {
    expect(flatitude.SearchBox).toBeDefined();
    expect(SearchBox).toBeDefined();
    expect(fl.SearchBox).toBeDefined();
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