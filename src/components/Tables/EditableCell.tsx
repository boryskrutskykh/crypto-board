import React from 'react';
import {Input, Form} from 'antd';
import {CryptoData} from '../../types';

interface EditableCellProps {
    editing: boolean;
    dataIndex: keyof CryptoData;
    title: string;
    inputType: 'number' | 'text';
    record: CryptoData;
    index: number;
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
                                                       editing,
                                                       dataIndex,
                                                       title,
                                                       inputType,
                                                       record,
                                                       index,
                                                       children,
                                                       ...restProps
                                                   }) => {
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{margin: 0}}
                    rules={[
                        {
                            required: true,
                            message: `Введите ${title}!`,
                        },
                    ]}
                >
                    <Input type={inputType}/>
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export default EditableCell;
