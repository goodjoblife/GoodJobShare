import React, { Component } from 'react';
import ProgressBar from '../ProgressBar';
import {
  getExperiences as getExperiencesApi,
} from '../../../apis/experiencesApi';


export default class RaiseExperiencesProgressBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      total: 0,
    };
  }

  componentDidMount() {
    getExperiencesApi({ limit: 1 })
      .then(data => {
        this.setState({ total: data.total });
      })
      .catch(() => {
        this.setState({ total: 0 });
      });
  }

  render() {
    return (
      <ProgressBar totalData={this.state.total} {...this.props} />
    );
  }
}
