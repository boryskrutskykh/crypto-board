import React from 'react';
import { Button } from 'antd';

interface AddButtonProps {
    showModal: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ showModal }) => {
    return (
        <div style={{ textAlign: 'center', marginTop: '2%' }}>
            <Button type="primary" onClick={showModal}>
                Добавить монету
            </Button>
        </div>
    );
};

export default AddButton;
