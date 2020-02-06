import { Drawer, Button } from 'antd';
import { useState } from 'react';
const DrawerComponent = () => {
    const [visible, setVisible] = useState(false)

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <div
            style={{
                height: 200,
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid #ebedf0',
                borderRadius: 2,
                padding: 48,
                textAlign: 'center',
                background: '#fafafa',
            }}
        >
            Render in this
        <div style={{ marginTop: 16 }}>
                <Button type="primary" onClick={()=>showDrawer()}>
                    Open
          </Button>
            </div>
            <Drawer
                title="Basic Drawer"
                placement="right"
                closable={false}
                onClose={()=>onClose()}
                visible={visible}
                getContainer={false}
                style={{ position: 'absolute' }}
            >
                <p>Some contents...</p>
            </Drawer>
        </div>
    );
}

export default DrawerComponent