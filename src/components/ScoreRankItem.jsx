import styles from '../css/ScoreRankItem.module.css';
import { Avatar } from 'antd';

import PropTypes from 'prop-types'
ScoreRankItem.propTypes = {
  rank: PropTypes.number, // 排名
  avatar: PropTypes.string,
  nickname: PropTypes.string,
  points: PropTypes.number // 积分值
}

// 积分排行里的单个每一行元素
function ScoreRankItem({ rank, avatar, nickname, points }) {
  let rankNum = []
  switch (rank) {
    case 1: rankNum.push(<i key={rank} className='i-emojione-1st-place-medal' />); break
    case 2: rankNum.push(<i key={rank} className='i-emojione-2nd-place-medal' />); break
    case 3: rankNum.push(<i key={rank} className='i-emojione-3rd-place-medal' />); break
    default: rankNum.push(rank)
  }

  return (
    <div className={styles.container}>
      {/* 排名、头像和昵称 */}
      <div className={styles.left}>
        <div className={styles.rank}>
          {rankNum}
        </div>
        <div className={styles.avatar}>
          <Avatar size='small' src={avatar} />
        </div>
        {nickname}
      </div>
      {/* 积分 */}
      <div className={styles.right}>
        {points}
      </div>
    </div>
  );
}

export default ScoreRankItem;
