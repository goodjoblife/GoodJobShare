import React from 'react';
import QuestionnaireLabel from '../QuestionnaireLabel';
import NetPromoterContent from './NetPromoterContent';

const NetPromoter = () => {
  return <QuestionnaireLabel contentComponent={<NetPromoterContent />} />;
};

export default NetPromoter;
