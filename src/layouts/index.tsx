import React from 'react';
import HeadTop from '../components/headTop'
import styles from './index.css';

const BasicLayout: React.FC = props => {
  return (
    <div className={styles.normal}>
      <HeadTop></HeadTop>
      {props.children}
    </div>
  );
};

export default BasicLayout;
