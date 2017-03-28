import { connect } from 'react-redux';

import LaborLecture from '../components/LaborLectureMenu';

const mapStateToProps = () => ({
  items: [
    {
      title: '勞工保險',
      cover: 'cover',
    },
    {
      title: '權益受損時的救濟方式',
      cover: 'cover',
    },
    {
      title: '變形工時條款',
      cover: 'cover',
    },
    {
      title: '勞工保險',
      cover: 'cover',
    },
    {
      title: '勞工休假制度',
      cover: 'cover',
    },
    {
      title: '勞基法84-1條責任制',
      cover: 'cover',
    },
    {
      title: '正常及延長工時',
      cover: 'cover',
    },
  ],
});

export default connect(mapStateToProps)(LaborLecture);
