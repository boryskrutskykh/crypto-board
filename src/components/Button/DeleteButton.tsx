import React from "react";
import {Button} from "antd";
import {DeleteOutlined} from '@ant-design/icons';

interface DeleteButtonProps {
    keyToDelete: number;
    onDeleteConfirm: (key: number) => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({keyToDelete, onDeleteConfirm}) => {
    return (
        <Button
            icon={<DeleteOutlined/>}
            onClick={() => onDeleteConfirm(keyToDelete)}
            type="primary"
            danger
        />
    );
};

export default DeleteButton;