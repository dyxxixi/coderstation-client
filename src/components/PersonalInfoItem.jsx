import styles from "../css/PersonalInfoItem.module.css"

import PropTypes from 'prop-types'
PersonalInfoItem.propTypes = {
    info: PropTypes.object
}

// 个人信息单个元素
function PersonalInfoItem({ info }) {
    return (
        <div className={styles.infoContainer}>
            <div className={styles.left}>
                <div>{info.itemName}：</div>
                <div>{info.itemValue}</div>
            </div>
        </div>
    );
}

export default PersonalInfoItem;
