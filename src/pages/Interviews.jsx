import { useState, useEffect } from 'react';
import styles from '../css/Interview.module.css'
import PageHeader from '../components/PageHeader'
import { useSelector, useDispatch } from 'react-redux';
import { getInterviewTitleList } from '../redux/interviewSlice';
import { getTypesList } from '../redux/typeSlice';
import { Tree, BackTop } from 'antd';
import { getInterviewByIdApi } from '../api/interview';

function Interviews() {
  const { interviewTitleList } = useSelector(state => state.interview)
  const { typesList } = useSelector(state => state.type)
  const dispatch = useDispatch()
  const [treeData, setTreeData] = useState([])
  const [interviewInfo, setInterviewInfo] = useState(null)

  useEffect(() => {
    if (!interviewTitleList.length) {
      dispatch(getInterviewTitleList())
    }
    if (!typesList.length) {
      dispatch(getTypesList())
    }
    if (interviewTitleList.length && typesList.length) {
      // 开始组装tree组件的treeData
      let arr = []
      typesList.forEach((e, i) => {
        arr.push({
          title: (<h3 style={{ fontWeight: '200' }}>{e.typeName}</h3>),
          key: i
        })
      })
      interviewTitleList.forEach((e, i) => {
        let childrenArr = []
        e.forEach((e1, j) => {
          childrenArr.push({
            title: (<h4 style={{ fontWeight: '200' }} onClick={() => handleClick(e1._id)}>{e1.interviewTitle}</h4>),
            key: `${i}-${j}`
          })
        })
        arr[i].children = childrenArr
      })
      setTreeData(arr)
    }
  }, [typesList, interviewTitleList, dispatch])

  async function handleClick(interviewId) {
    const { data } = await getInterviewByIdApi(interviewId)
    setInterviewInfo(data)
  }

  let interviewRightSide = null
  if (interviewInfo) {
    interviewRightSide = (
      <div className={styles.content}>
        <h1 className={styles.interviewRightTitle}>{interviewInfo?.interviewTitle}</h1>
        <div className={styles.contentContainer}>
          <div dangerouslySetInnerHTML={{ __html: interviewInfo?.interviewContent }}></div>
        </div>
      </div>
    )
  } else {
    interviewRightSide = (
      <div style={{
        textAlign: "center",
        fontSize: "40px",
        fontWeight: "100",
        marginTop: "150px"
      }}>
        请在左侧选择面试题
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <PageHeader title='面试题大全' />
      <div className={styles.interviewContainer}>
        <div className={styles.leftSide}>
          <Tree
            treeData={treeData}
          />
        </div>
        <div className={styles.rightSide}>
          {interviewRightSide}
        </div>
      </div>
      <BackTop />
    </div>
  )
}

export default Interviews;
