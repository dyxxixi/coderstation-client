import { Button, message } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// 添加问答
function AddIssueBtn() {
  const { isLogin } = useSelector(state => state.user)
  const navigate = useNavigate()

  function handleClick() {
    // 检查是否登录
    if (isLogin) {
      // 跳转到问答页面
      navigate('/addIssue')
    } else {
      message.warning('请先登录')
    }

  }

  return (
    <Button
      type='primary'
      size='large'
      style={{
        width: '100%',
        marginBottom: '30px'
      }}
      onClick={handleClick}
    >
      我要发问
    </Button>
  );
}

export default AddIssueBtn;
