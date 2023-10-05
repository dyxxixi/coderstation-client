import { useState, useEffect } from "react";
import { getPointsRankApi } from "../api/user";
import ScoreRankItem from "./ScoreRankItem";
import { Card } from "antd";

// 积分排行组件
function ScoreRank() {
  const [pointsRank, setPointsRank] = useState([])

  useEffect(() => {
    async function fetchData() {
      const { data } = await getPointsRankApi()
      setPointsRank(data)
    }
    fetchData()
  }, [])

  let rankList = []
  pointsRank.forEach((item, index) => {
    rankList.push(
      <ScoreRankItem
        key={item._id}
        rank={index + 1}
        avatar={item.avatar}
        nickname={item.nickname}
        points={item.points}
      />
    )
  });

  return (
    <Card title='积分排行'>
      {rankList}
    </Card>
  );
}

export default ScoreRank;
