import React from 'react';
import {Button} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import styles from "./AddButton.module.css"

interface AddButtonProps {
    showModal: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({showModal}) => {
    return (
        <div style={{textAlign: 'center', marginTop: '2%'}}>
            <Button className={styles.bgButton} style={{height: "50px", width: "50px"}} type="primary" onClick={showModal} icon={<PlusOutlined/>}>

            </Button>
        </div>
    );
};

export default AddButton;
