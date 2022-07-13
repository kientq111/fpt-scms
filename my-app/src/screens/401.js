import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';

const AuthorizedFailScreen = () => (
    <Result
        status="401"
        title="401"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Button type="primary"><Link to={'/'}>Back Home</Link></Button>}
    />
);

export default AuthorizedFailScreen;