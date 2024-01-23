import React from 'react';
import {Button, Modal} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';

interface DeleteButtonProps {
    onConfirmDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({onConfirmDelete}) => {
    const handleDelete = () => {
        Modal.confirm({
            title: 'Вы уверены, что хотите удалить эту монету?',
            onOk: onConfirmDelete,
        });
    };

    return (
        <Button
            icon={<DeleteOutlined/>}
            onClick={handleDelete}
            type="primary"
            danger
        />
    );
};

export default DeleteButton;
