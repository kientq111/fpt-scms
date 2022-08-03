import { useSelector } from "react-redux";
import { Menu } from 'antd';

const HeaderBar = () => {
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const items1 = [
    {
        key: '',
        label: `Hello ${userInfo && userInfo.username}`,
    }]
    return (
        < Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
    )

}


export default HeaderBar;