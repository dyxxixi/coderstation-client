import { Card, Carousel } from "antd";
import styles from '../css/Recommend.module.css'
import RecommendItem from '../components/RecommendItem'

function Recommend() {
  return (
    <Card title="推荐内容">
      <div style={{ marginBottom: 20 }}>
        <Carousel autoplay>
          <div>
            <a style={{
              background: 'url(https://image-static.segmentfault.com/137/222/1372220753-6503f2c5bd87e_cover) center/cover no-repeat',
            }} className={styles.contentStyle} href="https://segmentfault.com/reco/1640000044221367?utm_source=sf-homepage-headline" target="_blank" rel="noreferrer">
            </a>
          </div>
          <div>
            <a style={{
              background: 'url(https://image-static.segmentfault.com/248/470/2484709773-635632347923b) center/cover no-repeat',
            }} className={styles.contentStyle} href="https://chinaevent.microsoft.com/Events/details/0decfcda-1959-4098-891d-690825a58f9e/?channel_id%3d50%26channel_name%3dPaid-SF" target="_blank" rel="noreferrer"></a>
          </div>
          <div>
            <a style={{
              background: 'url(https://image-static.segmentfault.com/364/971/3649718341-6355fab16df40) center/cover no-repeat',
            }} className={styles.contentStyle} href="https://segmentfault.com/a/1190000042666738?utm_source=sf-homepage-headline" target="_blank" rel="noreferrer"></a>
          </div>
          <div>
            <a style={{
              background: 'url(https://image-static.segmentfault.com/422/352/422352298-6355600c6676b) center/cover no-repeat',
            }} className={styles.contentStyle} href="https://segmentfault.com/reco/1640000042672710?utm_source=sf-homepage-headline" target="_blank" rel="noreferrer"></a>
          </div>
        </Carousel>
      </div>
      <RecommendItem recommendInfo={{ num: 1, title: "代码层面探索前端性能 | 京东云技术团队", href: "https://segmentfault.com/a/1190000044261722" }} />
      <RecommendItem recommendInfo={{ num: 2, title: "实现一个响应式的瀑布流组件", href: "https://segmentfault.com/a/1190000044254053" }} />
      <RecommendItem recommendInfo={{ num: 3, title: "CSS mask 与 切图艺术", href: "https://segmentfault.com/a/1190000044257117" }} />
      <RecommendItem recommendInfo={{ num: 4, title: "和 Node.js 说拜拜，Deno零配置解决方案", href: "https://segmentfault.com/a/1190000044256552" }} />
    </Card>
  );
}

export default Recommend;
