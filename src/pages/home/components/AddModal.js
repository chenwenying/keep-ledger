import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker, Select } from 'antd';
import moment from 'moment';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
};

const dateFormat = 'YYYY-MM-DD';

const PriceInput = ({ value = {}, onChange }) => {
  const [number, setNumber] = useState(0);
  const [currency, setCurrency] = useState('rmb');

  const triggerChange = changedValue => {
    if (onChange) {
      onChange({
        number,
        currency,
        ...value,
        ...changedValue,
      });
    }
  };

  const onNumberChange = e => {
    const newNumber = parseInt(e.target.value || 0, 10);

    if (Number.isNaN(number)) {
      return;
    }

    if (!('number' in value)) {
      setNumber(newNumber);
    }

    triggerChange({
      number: newNumber,
    });
  };

  const onCurrencyChange = newCurrency => {
    if (!('currency' in value)) {
      setCurrency(newCurrency);
    }

    triggerChange({
      currency: newCurrency,
    });
  };

  return (
    <span>
      <Input
        type="text"
        value={value.number || number}
        onChange={onNumberChange}
        style={{
          width: 100,
        }}
      />
      <Select
        value={value.currency || currency}
        style={{
          width: 90,
          margin: '0 8px',
        }}
        onChange={onCurrencyChange}
      >
        <Option value="rmb">人民币</Option>
        <Option value="dollar">美元</Option>
      </Select>
    </span>
  );
};

const AddModal = ({ visible, handleOk, handleCancel }) => {
  const [form] = Form.useForm();
  // render() {
  //   const { visible, handleOk, handleCancel } = this.props;
  const checkPrice = (rule, value) => {
    if (value.number >= 0) {
      return Promise.resolve();
    }

    return Promise.reject('Price must be greater than zero!');
  };

  return (
    <Modal
      title="创建新的记账记录"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="确认"
      cancelText="取消"
    >
      <Form
        {...layout}
        form={form}
        name="basic"
        initialValues={{
          creationDate: moment(new Date(), dateFormat),
        }}
      >
        <Form.Item
          label="标题"
          name="category"
          rules={[
            {
              required: true,
              message: '请输入标题',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="金额"
          name="amount"
          rules={[
            {
              required: true,
              validator: checkPrice,
            },
          ]}
        >
          <PriceInput />
        </Form.Item>

        <Form.Item
          label="日期"
          name="creationDate"
          rules={[
            {
              required: true,
              message: '请输入日期',
            },
          ]}
        >
          <DatePicker format={dateFormat} />
        </Form.Item>

      </Form>
    </Modal>
  );
  // }
}

export default AddModal;