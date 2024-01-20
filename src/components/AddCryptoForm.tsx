import React, {useState} from 'react';
import {Modal, Input, Form, Button} from 'antd';
import {CryptoData} from "../types";

interface AddCryptoFormProps {
    onAdd: (newData: Omit<CryptoData, 'key'>) => void;
    isVisible: boolean;
    onCancel: () => void;
}

const AddCryptoForm = ({onAdd, isVisible, onCancel}: AddCryptoFormProps) => {
    const [formData, setFormData] = useState({
        coin: '',
        volume: '',
        amount: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prevState => ({...prevState, [name]: value}));
    };

    const handleSubmit = () => {
        onAdd(formData);
        setFormData({coin: '', volume: '', amount: ''});
    };

    return (
        <Modal
            title="Добавить новую монету"
            open={isVisible}
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Отмена
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Добавить
                </Button>,
            ]}
        >
            <Form layout="vertical">
                <Form.Item label="Монета">
                    <Input
                        name="coin"
                        value={formData.coin}
                        onChange={handleInputChange}
                    />
                </Form.Item>
                <Form.Item label="Объем">
                    <Input
                        name="volume"
                        value={formData.volume}
                        onChange={handleInputChange}
                    />
                </Form.Item>
                <Form.Item label="Количество монет">
                    <Input
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddCryptoForm;
