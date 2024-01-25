import React from 'react';
import {Input, Form} from 'antd';
import {CryptoData} from '../../types';

interface EditableCellProps {
    editing: boolean;
    dataIndex: keyof CryptoData;
    title: string;
    record: CryptoData;
    index: number;
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
                                                       editing,
                                                       dataIndex,
                                                       title,
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
                        // {
                        //     pattern: new RegExp(/^\d+(\.\d+)?$/),
                        //     message: 'Допускаются десятичные числа)',
                        // }
                    ]}
                >
                    <Input/>
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export default EditableCell;
