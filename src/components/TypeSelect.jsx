import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTypesList, setIssueTypeId } from '../redux/typeSlice';
import { Tag } from 'antd';

// 类型选择组件
function TypeSelect() {
  const { typesList } = useSelector(state => state.type)
  const dispatch = useDispatch()
  const [tagContainer, setTagContainer] = useState([])
  const colorArr = ["#108ee9", "#2db7f5", "#f50", "green", "#87d068", "blue", "red", "purple"]

  useEffect(() => {
    // 开始仓库若未存储类型信息
    if (!typesList.length) {
      dispatch(getTypesList())
    } else {
      let arr = []
      arr.push(
        <Tag
          color='magenta'
          value='all'
          key='all'
          style={{ cursor: 'pointer' }}
          onClick={() => dispatch(setIssueTypeId('all'))}
        >
          全部
        </Tag>)
      typesList.forEach((e, i) => {
        arr.push(
          <Tag
            color={colorArr[i % colorArr.length]}
            value={e._id}
            key={e._id}
            style={{ cursor: 'pointer' }}
            onClick={() => dispatch(setIssueTypeId(e._id))}
          >
            {e.typeName}
          </Tag>
        )
      })
      setTagContainer(arr)
    }
  }, [typesList])

  return (
    <div>
      {tagContainer}
    </div>
  );
}

export default TypeSelect;
