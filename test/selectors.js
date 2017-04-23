import assert from 'assert';
import { Map, List } from 'immutable';

const state = {
  laborRights: Map({
    idList: List(['peteranny', 'annypeter', 'deanpeter']),
    dataMapById: Map({
      peteranny: Map({ title: 'title1', content: 'content1' }),
      annypeter: Map({ title: 'title2', content: 'content2' }),
      deanpeter: Map({ title: 'title3', content: 'content3' }),
    }),
  }),
};
const props = { params: { id: 'peteranny' } };
const props2 = { params: { id: 'annypeter' } };
const props3 = { params: { id: 'deanpeter' } };

describe('test makeLaborRightsMenuProps', () => {
  let makeLaborRightsMenuProps;
  let laborRightsMenuProps;

  before(() => {
    makeLaborRightsMenuProps =
      require('../src/selectors/laborRights').makeLaborRightsMenuProps;
  });

  beforeEach(() => {
    laborRightsMenuProps = makeLaborRightsMenuProps();
  });

  it('get right props', done => {
    const actual = laborRightsMenuProps(state);
    const expected = {
      items: List([
        Map({ title: 'title1', content: 'content1' }),
        Map({ title: 'title2', content: 'content2' }),
        Map({ title: 'title3', content: 'content3' }),
      ]),
    };
    assert.deepEqual(actual, expected);
    done();
  });

  it('reuse the props after the first get', done => {
    const first = laborRightsMenuProps(state);
    const second = laborRightsMenuProps(state);
    assert.ok(first === second);
    done();
  });
});

describe('test makeSingleLaborRightsProps', () => {
  let makeSingleLaborRightsProps;
  let singleLaborRightsProps1;
  let singleLaborRightsProps2;

  before(() => {
    makeSingleLaborRightsProps =
      require('../src/selectors/laborRights').makeSingleLaborRightsProps;
  });

  beforeEach(() => {
    singleLaborRightsProps1 = makeSingleLaborRightsProps();
    singleLaborRightsProps2 = makeSingleLaborRightsProps();
  });

  it('get right props w/ the first id', done => {
    const actual = singleLaborRightsProps1(state, props);
    const expected = {
      item: Map({ title: 'title1', content: 'content1' }),
      prev: undefined,
      next: Map({ title: 'title2', content: 'content2' }),
    };
    assert.deepEqual(actual, expected);
    done();
  });

  it('get right props w/ middle id', done => {
    const actual = singleLaborRightsProps1(state, props2);
    const expected = {
      item: Map({ title: 'title2', content: 'content2' }),
      prev: Map({ title: 'title1', content: 'content1' }),
      next: Map({ title: 'title3', content: 'content3' }),
    };
    assert.deepEqual(actual, expected);
    done();
  });

  it('get right props w/ the last id', done => {
    const actual = singleLaborRightsProps1(state, props3);
    const expected = {
      item: Map({ title: 'title3', content: 'content3' }),
      prev: Map({ title: 'title2', content: 'content2' }),
      next: undefined,
    };
    assert.deepEqual(actual, expected);
    done();
  });

  it('reuse the props after the first get', done => {
    const first = singleLaborRightsProps1(state, props);
    const second = singleLaborRightsProps1(state, props);
    assert.ok(first === second);
    done();
  });

  it('reuse the props with same id after interleavingly use other ids', done => {
    const first = singleLaborRightsProps1(state, props);
    const second = singleLaborRightsProps2(state, props2);
    const third = singleLaborRightsProps1(state, props);
    assert.ok(first === third);
    done();
  });
});
