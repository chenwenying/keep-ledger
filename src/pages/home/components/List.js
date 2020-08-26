import React, { useState, Component } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Space } from 'antd';
import { connect } from 'react-redux';
import { actionCreators } from '../store';

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `请输入 ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                    children
                )}
        </td>
    );
};

const EditableTable = (props) => {
    const { list, updateData } = props;
    const [form] = Form.useForm();
    const data = [...list];
    const [editingKey, setEditingKey] = useState('');

    const isEditing = record => record.key === editingKey;

    const edit = record => {
        form.setFieldsValue({
            category: '',
            amount: '',
            creationDate: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async key => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex(item => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                updateData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                updateData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const del = key => {
        const newData = [...data].filter(item => item.key !== key);
        updateData(newData);
    }

    const columns = [
        {
            title: '类别',
            dataIndex: 'category',
            width: '25%',
            editable: true,
        },
        {
            title: '金额',
            dataIndex: 'amount',
            width: '15%',
            editable: true,
        },
        {
            title: '日期',
            dataIndex: 'creationDate',
            width: '40%',
            editable: false,
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <a
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                    </a>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                        <Space direction="horizontal" size={10}>
                            <a disabled={editingKey !== ''} onClick={() => edit(record)}>
                                Edit
                </a>
                            <Popconfirm title="Sure to delete?" onConfirm={() => del(record.key)}>
                                <a disabled={editingKey !== ''}>Delete</a>
                            </Popconfirm>
                        </Space>

                    );
            },
        },
    ];
    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: record => ({
                record,
                inputType: col.dataIndex === 'amount' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
};

class List extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { list, updateData } = this.props;
        return (
            <EditableTable list={list} updateData={updateData} />
        )
    }

}

const mapState = (state) => ({
    list: state.getIn(['home', 'list'])
})

const mapDispatch = (dispatch) => ({
    updateData: (newData) => {
        dispatch(actionCreators.updateListData(newData));
    }
})

export default connect(mapState, mapDispatch)(List);