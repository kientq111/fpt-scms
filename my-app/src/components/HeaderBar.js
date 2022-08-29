import { useSelector } from "react-redux";
import { Menu, Dropdown, Row, Col } from 'antd';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
const HeaderBar = () => {
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const dispatch = useDispatch()
    const items1 = [
        {
            key: '1',
            label: `Hello ${userInfo && userInfo.username}`,

        }]

    const menu = (
        <Menu
            items={[
                // {
                //     key: '1',
                //     label: (
                //         <Link to={"admin/personalize"}>
                //             Change Profile
                //         </Link>
                //     ),
                // },
                {
                    key: '2',
                    label: (
                        <Link to={'admin/changepassword'}>
                            Change Password
                        </Link>
                    ),
                },
                {
                    key: '3',
                    label: (
                        <a href="" onClick={() => dispatch(logout())}>
                            Logout
                        </a>
                    ),
                },
            ]}
            style={{ width: 200 }}
        />
    );
    return (
        <Row>
            <Col span={3}></Col>
            <Col span={9}></Col>
            <Col span={9}></Col>
            <Col span={3}>
                <Dropdown overlay={menu} >
                    < Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} selectedKeys={'1'} />
                </Dropdown ></Col>
        </Row>


    )

}


export default HeaderBar;