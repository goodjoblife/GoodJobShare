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

describe('test getLaborRightsMenuProps', () => {
  let getLaborRightsMenuProps;

  beforeEach(() => {
    getLaborRightsMenuProps =
      require('../src/selectors/laborRights').getLaborRightsMenuProps;
  });

  it('get right props', done => {
    const actual = getLaborRightsMenuProps(state);
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
    const first = getLaborRightsMenuProps(state);
    const second = getLaborRightsMenuProps(state);
    assert.ok(first === second);
    done();
  });
});

describe('test getSingleLaborRightsProps', () => {
  let getSingleLaborRightsProps;
  beforeEach(() => {
    getSingleLaborRightsProps =
      require('../src/selectors/laborRights').getSingleLaborRightsProps;
  });

  it('get right props w/ the first id', done => {
    const actual = getSingleLaborRightsProps(state, props);
    const expected = {
      item: Map({ title: 'title1', content: 'content1' }),
      prev: undefined,
      next: Map({ title: 'title2', content: 'content2' }),
    };
    assert.deepEqual(actual, expected);
    done();
  });

  it('get right props w/ middle id', done => {
    const actual = getSingleLaborRightsProps(state, props2);
    const expected = {
      item: Map({ title: 'title2', content: 'content2' }),
      prev: Map({ title: 'title1', content: 'content1' }),
      next: Map({ title: 'title3', content: 'content3' }),
    };
    assert.deepEqual(actual, expected);
    done();
  });

  it('get right props w/ the last id', done => {
    const actual = getSingleLaborRightsProps(state, props3);
    const expected = {
      item: Map({ title: 'title3', content: 'content3' }),
      prev: Map({ title: 'title2', content: 'content2' }),
      next: undefined,
    };
    assert.deepEqual(actual, expected);
    done();
  });

  it('reuse the props after the first get', done => {
    const first = getSingleLaborRightsProps(state, props);
    const second = getSingleLaborRightsProps(state, props);
    assert.ok(first === second);
    done();
  });

  it('reuse the props with same id after interleavingly use other ids', done => {
    const first = getSingleLaborRightsProps(state, props);
    const second = getSingleLaborRightsProps(state, props2);
    const third = getSingleLaborRightsProps(state, props);
    assert.ok(first === third);
    done();
  });
});
