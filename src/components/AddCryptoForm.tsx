import React from 'react';
import {Modal, Input, Form, Button} from 'antd';
import {CryptoData} from "../types";

interface AddCryptoFormProps {
    onAdd: (newData: Omit<CryptoData, 'key'>) => void;
    isVisible: boolean;
    onCancel: () => void;
}

const AddCryptoForm = ({onAdd, isVisible, onCancel}: AddCryptoFormProps) => {

    const [form] = Form.useForm();

    const validateNumberInput = async (_: any, value: string) => {
        if (!value || /^\d+(\.\d+)?$/.test(value)) {
            return;
        }
        throw new Error('Пожалуйста, введите целое число или число с плавающей запятой');
    };

    const handleSubmit = (values: any) => {
        onAdd(values);
        form.resetFields();
    };

    return (
        <Modal
            title="Добавить новую монету"
            open={isVisible}
            onCancel={onCancel}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="coin"
                    label="Монета"
                    rules={[{required: true, message: 'Пожалуйста, введите название монеты'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="volume"
                    label="Объем"
                    rules={[{validator: validateNumberInput}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="amount"
                    label="Количество монет"
                    rules={[{validator: validateNumberInput}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item>
                    <Button key="back" onClick={onCancel}>
                        Отмена
                    </Button>
                    <Button style={{marginLeft: "3%"}} key="submit" type="primary" htmlType="submit">
                        Добавить
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddCryptoForm;
