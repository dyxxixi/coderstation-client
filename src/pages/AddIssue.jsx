import { useState, useRef, useEffect } from 'react';
import styles from '../css/AddIssue.module.css'
import { Form, Input, Select, Button, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux';
import { typeOptionCreator } from '../utils';
import { getTypesList } from '../redux/typeSlice';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { addIssueApi } from '../api/issue';
import { useNavigate } from 'react-router-dom';

// 添加问答页面
function AddIssue() {
  const [issueInfo, setIssueInfo] = useState({
    issueTitle: '',
    issueContent: '',
    userId: '',
    typeId: ''
  })   // 表单数据

  // 从仓库获取数据
  const { typesList } = useSelector(state => state.type)
  const { userInfo } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formRef = useRef()
  const editorRef = useRef()

  useEffect(() => {
    if (!typesList.length) {
      dispatch(getTypesList())
    }
  }, [])

  // 提交问答的回调函数
  function handleAdd() {
    const content = editorRef.current.getInstance().getHTML()
    // 重新构建要提交给服务器的issueInfo
    addIssueApi({
      ...issueInfo,
      userId: userInfo._id,
      issueContent: content
    })
    navigate('/')
    message.success("你的问题已经提交，审核通过后将会进行展示")
  }

  // 处理分类下拉列表选项改变时触发的回调
  function handleChange(value) {
    setIssueInfo({ ...issueInfo, typeId: value })
  }

  return (
    <div className={styles.container}>
      <Form
        // name="basic"
        initialValues={issueInfo}
        autoComplete="off"
        ref={formRef}
        onFinish={handleAdd}
      >
        {/* 问答标题 */}
        <Form.Item
          label="标题"
          // name="issueTitle"
          rules={[{ required: true, message: '请输入标题' }]}
        >
          <Input
            placeholder="请输入标题"
            size="large"
            value={issueInfo.issueTitle}
            onChange={(e) => setIssueInfo({ ...issueInfo, issueTitle: e.target.value })}
          />
        </Form.Item>

        {/* 问题类型 */}
        <Form.Item
          label="问题分类"
          // name="typeId"
          rules={[{ required: true, message: '请选择问题所属分类' }]}
        >
          <Select
            style={{ width: 200 }}
            onChange={handleChange}>
            {typeOptionCreator(Select, typesList)}
          </Select>
        </Form.Item>


        {/* 问答内容 */}
        <Form.Item
          label="问题描述"
          // name="issueContent"
          rules={[{ required: true, message: '请输入问题描述' }]}
        >
          <Editor
            initialValue=""
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            language='zh-CN'
            ref={editorRef}
          />
        </Form.Item>


        {/* 确认按钮 */}
        <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
          <Button type="primary" htmlType="submit">
            确认新增
          </Button>

          <Button type="link" htmlType="submit" className="resetBtn">
            重置
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddIssue;
