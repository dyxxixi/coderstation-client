import RouteConfig from "./index";
import RouteBeforeConfig from "./RouteBeforeConfig";
import { Alert } from "antd";

// 导航守卫
function RouteBefore() {
  const currentPath = RouteBeforeConfig.filter(item => item.path === location.pathname)[0]

  if (currentPath.needLogin && !localStorage.getItem('userToken')) {
    return (
      <Alert
        message="请先登录！登录后才能访问此页面"
        type="warning"
        showIcon
        closable
        onClose={handleClose}
      />
    )
  }

  function handleClose() {
    location.pathname = "/issues"
  }

  return (
    <RouteConfig />
  )
}

export default RouteBefore;
